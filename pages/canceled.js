import React from "react";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";

const Canceled = () => {
  return (
    <div className="cancel-wrapper">
      <div className="cancel">
        <p className="icon">
          <MdOutlineCancel />
        </p>
        <h2>Payment Canceled</h2>
        <p>
          Your order was not completed. Your cart has been saved — you can continue shopping
          and return to checkout whenever you&apos;re ready.
        </p>
        <Link href="/" className="btn">
          Return to Shop
        </Link>
      </div>
    </div>
  );
};

export default Canceled;
