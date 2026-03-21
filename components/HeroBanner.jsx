import Link from 'next/link';
import React from 'react';
import { urlFor } from '../lib/clients';

const HeroBanner = ({ heroBanner }) => {
  if (!heroBanner) return null;

  return (
    <div className='hero-banner-container'>
      <div className='hero-content'>
        <span className='beats-solo'>{heroBanner.smallText || 'New Collection'}</span>
        <h3>{heroBanner.midText || 'Introducing'}</h3>
        <h1>{heroBanner.largeText1 || 'Signature Scents'}</h1>

        <Link href={`/product/${heroBanner.product}`}>
          <button type='button'>{heroBanner.buttonText || 'Shop Now'}</button>
        </Link>
      </div>

      <img
        src={urlFor(heroBanner.image).url()}
        alt={heroBanner.largeText1 || 'Featured fragrance'}
        className='hero-banner-image'
      />

      <div className='desc'>
        <h5>Description</h5>
        <p>{heroBanner.desc}</p>
      </div>
    </div>
  );
};

export default HeroBanner;
