import React, { useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.removeItem('Tolus_cart');
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className='success-wrapper'>
      <div className='success'>
        <p className='icon'>
          <BsBagCheckFill />
        </p>
        <h2>Thank You for Your Order!</h2>
        <p className='email-msg'>A confirmation has been sent to your email inbox.</p>
        <p className='description'>
          Questions? Reach us at{' '}
          <a className='email' href='mailto:hello@Tolusparfums.com'>
            hello@Tolusparfums.com
          </a>
        </p>
        <Link href='/' className='btn'>
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Success;
