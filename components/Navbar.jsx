import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { useStateContext } from '../context/StateContext';
import Cart from './Cart';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className='navbar-container'>
      <Link href='/' className='logo'>
        TOLUs <span>PARFUMS</span>
      </Link>

      <p className='nav-tagline'>Luxury Fragrances</p>

      <button
        onClick={() => setShowCart(true)}
        type='button'
        className='cart-icon'
        aria-label={`Open cart, ${totalQuantities} item${totalQuantities !== 1 ? 's' : ''}`}
      >
        <AiOutlineShopping />
        {totalQuantities > 0 && (
          <span className='cart-item-qty'>{totalQuantities}</span>
        )}
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
