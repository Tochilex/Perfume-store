import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const useStateContext = () => useContext(Context);

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  // Persist cart to localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("Tolus_cart");
    if (savedCart) {
      try {
        const { items, price, quantities } = JSON.parse(savedCart);
        setCartItems(items || []);
        setTotalPrice(price || 0);
        setTotalQuantities(quantities || 0);
      } catch {
        // ignore corrupted storage
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "Tolus_cart",
      JSON.stringify({ items: cartItems, price: totalPrice, quantities: totalQuantities })
    );
  }, [cartItems, totalPrice, totalQuantities]);

  const incQty = () => setQty((prev) => prev + 1);

  const decQty = () =>
    setQty((prev) => {
      if (prev - 1 < 1) return 1;
      return prev - 1;
    });

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);

    setTotalPrice((prev) => prev + product.price * quantity);
    setTotalQuantities((prev) => prev + quantity);

    if (checkProductInCart) {
      // BUG FIX: must return cartProduct for non-matching items too
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return { ...cartProduct, quantity: cartProduct.quantity + quantity };
        }
        return cartProduct;
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${quantity} × ${product.name} added to cart`, {
      style: {
        background: "#1A1209",
        color: "#C6963A",
        border: "1px solid #C6963A",
        fontFamily: "Inter, sans-serif",
        fontSize: "14px",
      },
      iconTheme: { primary: "#C6963A", secondary: "#1A1209" },
    });
  };

  const onRemove = (product) => {
    const foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);
    setTotalPrice((prev) => prev - foundProduct.price * foundProduct.quantity);
    setTotalQuantities((prev) => prev - foundProduct.quantity);
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    const foundProduct = cartItems.find((item) => item._id === id);
    if (!foundProduct) return;

    if (value === "inc") {
      setCartItems(cartItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      ));
      setTotalPrice((prev) => prev + foundProduct.price);
      setTotalQuantities((prev) => prev + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems(cartItems.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        ));
        setTotalPrice((prev) => prev - foundProduct.price);
        setTotalQuantities((prev) => prev - 1);
      }
    }
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        setTotalPrice,
        totalPrice,
        totalQuantities,
        setTotalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};
