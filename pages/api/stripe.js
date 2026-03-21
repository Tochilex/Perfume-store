import Stripe from 'stripe';

// IMPORTANT: Use STRIPE_SECRET_KEY (no NEXT_PUBLIC_ prefix) — never expose secret keys client-side
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ch26rjz1';
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

    const line_items = req.body.map((item) => {
      const imgRef = item.image[0].asset._ref;
      // Sanity ref format: "image-{assetId}-{WxH}-{format}"
      const refParts = imgRef.split('-');
      const format = refParts[refParts.length - 1];
      const dimensions = refParts[refParts.length - 2];
      const assetId = refParts.slice(1, -2).join('-');
      const imageUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}-${dimensions}.${format}`;

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [imageUrl],
          },
          unit_amount: Math.round(item.price * 100),
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: item.quantity,
      };
    });

    const params = {
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'NG', 'GH', 'ZA', 'FR', 'DE', 'AE'],
      },
      // Create a customer record — this is what triggers Stripe to send receipt emails
      customer_creation: 'always',
      line_items,
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/canceled`,
    };

    const session = await stripe.checkout.sessions.create(params);
    res.status(200).json(session);
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
}
