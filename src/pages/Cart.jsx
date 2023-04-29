import React, { useEffect, useState } from "react";
import { getCart } from "../reduxSlices/cartSlice";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { isLoading, cart, error } = useSelector(getCart);

  const navigate = useNavigate();
  return (
    <div className="max-w-8xl p-4 mx-auto ">
      <button
        onClick={() => navigate(-1)}
        className="block ml-auto font-semibold  px-10 py-4 bg-slate-900 text-white mb-0 m-2"
      >
        Back
      </button>
      {isLoading && (
        <p className="text-2xl text-gray-700 p-4 text-center animate-pulse">
          Loading...
        </p>
      )}
      <div>
       {!isLoading&&cart.length===0&& <p
          className={`text-center text-6xl text-slate-500 uppercase duration-[20s]`}
        >
          Cart is empty
        </p>}

{cart.length!==0 &&        <h1 className="pb-8 text-center text-4xl uppercase">My cart</h1>}
        <div className="max-h-[500px] overflow-y-scroll scrolled">
          {cart.map((el) => (
            <CartItem key={el.id} {...el} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
