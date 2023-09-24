"use client";

import React, { useMemo } from "react";

// other imports
import { useRecoilState } from "recoil";

// local imports
import { cartState } from "@/atoms/cartState";
// import axios from "axios";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const Cart = () => {
  const [cartItem, setCartItem] = useRecoilState(cartState);

  const removeItemFromCart = (index) => {
    const updatedCart = [...cartItem];
    updatedCart.splice(index, 1);
    setCartItem(updatedCart);
  };

  // Function to calculate 20% of a value
  const calculateTwentyPercent = (value) => {
    const floatValue = parseFloat(value.replace(/,/g, ""));
    if (isNaN(floatValue)) {
      return {
        original: value,
        twentyPercent: value,
        sum: value,
      };
    } else {
      const twentyPercent = floatValue * 0.2;
      const sum = floatValue + twentyPercent;
      return {
        original: value,
        twentyPercent: `$ ${twentyPercent.toFixed(2)}`,
        sum: `$ ${sum.toFixed(2)}`,
      };
    }
  };

  // Calculate the total sum of all items in the cart
  const totalSum = useMemo(() => {
    return cartItem.reduce((sum, item) => {
      const { sum: itemSum } = calculateTwentyPercent(item[2]);
      return sum + parseFloat(itemSum.replace(/[$,]/g, ""));
    }, 0);
  }, [cartItem]);

  // Console log the total sum value
  console.log(`Total Sum Value: ${totalSum}`);

  // stripe checkout function

  return (
    <div className="w-full min-h-screen h-auto">
      {cartItem.length >= 0 && (
        <h1 className="text-center lg:text-3xl text-xl font-semibold text-yellow-500">
          Cart Items
        </h1>
      )}
      <div className="overflow-x-auto border p-4 rounded-lg mt-10">
        {cartItem.length <= 0 ? (
          <h1 className="text-center">Your Cart Is Empty</h1>
        ) : (
          <>
            <table className="table mb-6 px-4">
              <thead>
                <tr className="w-1/6 px-4 py-2 text-center">
                  <th>ID</th>
                  <th>Names</th>
                  <th>Prices</th>
                  <th>Action</th> {/* New column for action */}
                </tr>
              </thead>
              <tbody>
                {cartItem.map((item, index) => (
                  <tr
                    key={index}
                    className="w-1/6 px-4 py-2 text-center hover hover:scale-[103%] duration-200"
                  >
                    <td>{index + 1}</td>
                    {item.map((data, dataIndex) => {
                      if (dataIndex === 2) {
                        const { original, twentyPercent, sum } =
                          calculateTwentyPercent(data);
                        // Console log the values
                        console.log(`Original Value: ${original}`);
                        console.log(`20% Value: ${twentyPercent}`);
                        console.log(`Sum Value: ${sum}`);
                        return <td key={dataIndex}>{`${sum}`}</td>;
                      } else {
                        return <td key={dataIndex}>{data}</td>;
                      }
                    })}
                    <td>
                      <button
                        onClick={() => removeItemFromCart(index)}
                        className="bg-red-500 text-white rounded-md p-1 hover:shadow-lg hover:scale-105 hover:duration-200"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 text-center lg:text-3xl md:text-2xl text-xl">
              <strong>
                <span className="text-yellow-500">Total</span> :{" "}
                <span className="text-yellow-500">$</span> {totalSum.toFixed(2)}
              </strong>
            </div>
          </>
        )}
      </div>

      {totalSum !== 0 && (
        <div className="w-full h-auto flex justify-center items-center my-10">
          <button
            className="bg-yellow-500 text-white lg:px-6 px-  lg:py-3 py-2 rounded-lg hover:bg-yellow-600 hover:scale-110 hover:duration-300 "

            // onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
