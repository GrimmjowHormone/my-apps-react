import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";
import type { Guitar, CartItem } from "../types";
const useCart = () => {
  const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  // useState

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);
  const MAX_ITEMS = 5;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item: Guitar) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);

    if (itemExists >= 0) {
      if (cart[itemExists].quantity >= MAX_ITEMS) return;
      //Existe en el carrito
      console.log("Ya existe");
      const upDatedCart = [...cart];

      upDatedCart[itemExists].quantity++;

      setCart(upDatedCart);
    } else {
      const newItem: CartItem = { ...item,quantity : 1 };
      setCart([...cart, newItem]);
    }
  }

  function removeFromCart(id:Guitar['id']) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  function increaseQuantity(id:Guitar['id']) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function clearCart() {
    setCart([]);
  }

  function decreaseQuantity(id:Guitar['id']) {
    const updatedCart = cart
      .map((item) => {
        if (item.id === id && item.quantity >= 1) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }

        return item;
      })
      .filter((item) => item.quantity != 0);
    setCart(updatedCart);
  }

  // State derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart]);

  const cartTotal = useMemo(
    () =>
      cart.reduce((total, item) => {
        return total + item.quantity * item.price;
      }, 0),
    [cart]
  );

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
  };
};

export default useCart;
