import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/clients';

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <Link href={`/product/${slug.current}`} style={{ display: 'block', flexShrink: 0 }}>
      <div className='product-card'>
        <div className='product-image-wrapper'>
          <img
            src={urlFor(image && image[0]).width(400).url()}
            alt={name}
            className='product-image'
          />
        </div>
        <div className='product-info'>
          <p className='product-name'>{name}</p>
          <p className='product-price'>₦{price}</p>
        </div>
      </div>
    </Link>
  );
};

export default Product;
