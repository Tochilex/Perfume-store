import React from 'react';
import Link from 'next/link';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { FaTiktok, FaPinterestP } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className='footer-container'>
      <div className='footer-top'>
        <div className='footer-brand'>
          <Link href='/' className='logo'>
            TOLUs<span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 300 }}>PARFUMS</span>
          </Link>
          <p>
            Crafted for those who believe a fragrance is more than a scent — it is a
            memory, an identity, a statement.
          </p>
        </div>

        <div className='footer-links'>
          <h4>Shop</h4>
          <ul>
            <li><Link href='/'>All Fragrances</Link></li>
            <li><Link href='/'>New Arrivals</Link></li>
            <li><Link href='/'>Best Sellers</Link></li>
            <li><Link href='/'>Gift Sets</Link></li>
          </ul>
        </div>

        <div className='footer-links'>
          <h4>Help</h4>
          <ul>
            <li><Link href='/'>Shipping & Returns</Link></li>
            <li><Link href='/'>FAQ</Link></li>
            <li><Link href='/'>Track Order</Link></li>
            <li><Link href='/'>Contact Us</Link></li>
          </ul>
        </div>

        <div className='footer-links'>
          <h4>Follow Us</h4>
          <div className='footer-social'>
            <a href='#' aria-label='Instagram' target='_blank' rel='noreferrer'>
              <AiFillInstagram />
            </a>
            <a href='#' aria-label='Twitter / X' target='_blank' rel='noreferrer'>
              <AiOutlineTwitter />
            </a>
            <a href='#' aria-label='TikTok' target='_blank' rel='noreferrer'>
              <FaTiktok />
            </a>
            <a href='#' aria-label='Pinterest' target='_blank' rel='noreferrer'>
              <FaPinterestP />
            </a>
          </div>
        </div>
      </div>

      <div className='footer-bottom'>
        <p>© {year} Tolus Parfums. All rights reserved.</p>
        <p>Crafted with passion for luxury.</p>
      </div>
    </div>
  );
};

export default Footer;
