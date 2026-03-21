import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/clients';

const FooterBanner = ({
  footerBanner: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    product,
    buttonText,
    image,
    desc,
  },
}) => {
  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        <div className='left'>
          <p>{discount || 'Exclusive Offer'}</p>
          <h3>{largeText1}</h3>
          {largeText2 && <h3>{largeText2}</h3>}
          {saleTime && <p style={{ marginTop: '10px', opacity: 0.6 }}>{saleTime}</p>}
        </div>

        <div className='right'>
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type='button'>{buttonText || 'Shop Now'}</button>
          </Link>
        </div>

        <img
          src={urlFor(image).width(400).url()}
          className='footer-banner-image'
          alt={largeText1 || 'Featured product'}
        />
      </div>
    </div>
  );
};

export default FooterBanner;
