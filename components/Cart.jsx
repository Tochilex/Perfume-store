import React, { useRef } from 'react';
import Link from 'next/link';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/clients';
import getStripe from '../lib/getStripe';

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartItems),
    });

    if (response.status === 500) {
      toast.error('Something went wrong. Please try again.');
      return;
    }

    const data = await response.json();

    if (data.message) {
      toast.error(data.message);
      return;
    }

    toast.loading('Redirecting to checkout…', {
      style: {
        background: '#1A1209',
        color: '#C6963A',
        border: '1px solid #C6963A',
      },
    });

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className='cart-wrapper' ref={cartRef} onClick={(e) => { if (e.target === cartRef.current) setShowCart(false); }}>
      <div className='cart-container'>

        {/* Header */}
        <div className='cart-header'>
          <button
            onClick={() => setShowCart(false)}
            type='button'
            className='cart-heading'
          >
            <AiOutlineLeft size={14} />
            <span>Back</span>
          </button>
          <h2 className='cart-title'>Your Cart</h2>
          <span className='cart-num-items'>{totalQuantities} item{totalQuantities !== 1 ? 's' : ''}</span>
        </div>

        {/* Empty state */}
        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping className='empty-cart-icon' />
            <h3>Your cart is empty</h3>
            <p>Explore our luxury fragrance collection and find your signature scent.</p>
            <Link href='/' className='btn' onClick={() => setShowCart(false)}>
              Explore Fragrances
            </Link>
          </div>
        )}

        {/* Cart items */}
        {cartItems.length >= 1 && (
          <>
            <div className='product-container'>
              {cartItems.map((item) => (
                <div className='product' key={item._id}>
                  <img
                    src={urlFor(item?.image[0]).width(200).url()}
                    className='cart-product-image'
                    alt={item.name}
                  />
                  <div className='item-desc'>
                    <p className='item-name'>{item.name}</p>
                    <p className='item-price'>${item.price}</p>
                    <div className='item-controls'>
                      <p className='quantity-desc'>
                        <span
                          className='minus'
                          onClick={() => toggleCartItemQuantity(item._id, 'dec')}
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className='num'>{item.quantity}</span>
                        <span
                          className='plus'
                          onClick={() => toggleCartItemQuantity(item._id, 'inc')}
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                      <button
                        type='button'
                        className='remove-item'
                        onClick={() => onRemove(item)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart footer */}
            <div className='cart-bottom'>
              <div className='total'>
                <h3>Subtotal</h3>
                <span className='total-price'>${totalPrice.toFixed(2)}</span>
              </div>
              <p className='checkout-note'>Shipping &amp; taxes calculated at checkout</p>
              <div className='btn-container'>
                <button type='button' className='btn' onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
