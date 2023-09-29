"use client";
import React, { useEffect, useState } from "react";

// other imports
import { useRecoilState } from "recoil";
import { useSession } from "next-auth/react";

// local imports
import { cartState } from "@/atoms/cartState";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpinner";
// import { checkout } from "@/app/checkout";

const Cart = () => {
  const { data: session } = useSession();
  const [cartItem, setCartItem] = useRecoilState(cartState);
  const [cartData, setCartData] = useState([]);
  const [productQuantities, setProductQuantities] = useState([]);

  // getting user email
  const email = session && session.user && session.user.email;

  const handleProductQuantity = (e, index) => {
    const newValue = parseInt(e.target.value, 10);

    if (newValue >= 1) {
      setProductQuantities((prevQuantities) => {
        const updatedQuantities = [...prevQuantities];
        updatedQuantities[index] = newValue;
        return updatedQuantities;
      });
    }
  };

  const handleUpdateQuantity = async (id, currentQuantity, index) => {
    try {
      let newQuantity = productQuantities[index]
        ? productQuantities[index]
        : currentQuantity + 1; // Use the updated quantity

      // if (newQuantity > currentQuantity) {
      //   newQuantity++;
      // } else {
      //   newQuantity--;
      // }

      let data = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          quantity: newQuantity, // Use the updated quantity
        }),
      });

      data = await data.json();
      if (data.result) {
        console.log("success");
      }
    } catch (error) {
      console.log("Error in Quantity");
    }
  };

  // getting cart data from DB

  const getProductData = async () => {
    try {
      const response = await fetch(
        // `http://localhost:3000/api/products/web08574@gmail.com`
        `http://localhost:3000/api/products/${email}`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const productData = await response.json();

      if (productData.success === true) {
        const results = productData.result;
        setCartData(results);
        // console.table(results);
      } else {
        console.log("No Data Found From DB!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getProductData();
  }, [session]);

  // console.table("Cart Data : ", cartData);

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    if (cartData) {
      cartData.map((item) => {
        totalPrice += item.price;
      });
    }
    return totalPrice.toFixed(2);
  };

  const TotalSum = calculateTotalPrice();

  // delete record
  const deleteRecord = async (id) => {
    try {
      let response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "delete",
      });
      response = await response.json();
      if (response.success) {
        toast(`Deleted `, {
          duration: 1000,
          position: "center-top",

          // Change colors of success/error/loading icon
          iconTheme: {
            primary: "#000",
            secondary: "#fff",
          },

          // Aria
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
        window.location.reload();
      }
    } catch (error) {
      toast(`Something went wrong. `, {
        duration: 1000,
        position: "center-top",

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },

        // Aria
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
    }
  };

  return (
    <div className="w-full min-h-screen h-auto">
      {cartItem.length >= 0 && (
        <h1 className="text-center lg:text-3xl text-xl font-semibold text-yellow-500">
          Cart Items
        </h1>
      )}
      <div className="overflow-x-auto border p-4 rounded-lg mt-10">
        {cartData.length <= 0 ? (
          <h1 className="text-center">Your Cart Is Empty</h1>
        ) : (
          <>
            <table className="table mb-6 px-4">
              <thead>
                <tr className="w-1/6 px-4 py-2 text-center">
                  <th>ID</th>
                  <th>Names</th>
                  <th>Numbers</th>
                  <th>Prices</th>
                  <th>Quantity</th>
                  <th>Action</th> {/* New column for action */}
                </tr>
              </thead>
              <tbody>
                {cartData ? (
                  cartData.map((item, index) => {
                    let id = item._id;
                    return (
                      <tr
                        key={index}
                        className="w-1/6 px-4 py-2 text-center hover hover:scale-[103%] duration-200"
                      >
                        <td>{index + 1}</td>
                        <td>{item.productName}</td>
                        <td>{item.number}</td>
                        <td>{`$ ${item.price}`}</td>
                        {/* <td>{item.quantity}</td> */}
                        <td>
                          <input
                            type="input"
                            // value={productQuantities[index] || item.quantity}
                            value={item.quantity}
                            // onChange={(e) => {
                            //   handleProductQuantity(e, index, item.index);
                            //   handleUpdateQuantity(
                            //     item._id,
                            //     item.quantity,
                            //     index
                            //   );
                            // }}
                            // Pass the index to identify the row
                            className="input w-14 text-center bg-transparent"
                          />
                        </td>
                        <td>
                          <button
                            // onClick={() => removeItemFromCart(index)}
                            onClick={() => deleteRecord(id)}
                            className="bg-red-500 text-white rounded-md p-1 hover:shadow-lg hover:scale-105 hover:duration-200"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <LoadingSpinner />
                )}
              </tbody>
            </table>
            <div className="mt-4 text-center lg:text-3xl md:text-2xl text-xl">
              <strong>
                <span className="text-yellow-500">Total</span> :{" "}
                <span className="text-yellow-500">$</span> {TotalSum}
              </strong>
            </div>
          </>
        )}
      </div>

      {cartData.length !== 0 && (
        <div className="w-full h-auto flex justify-center items-center my-10">
          <button
            className="bg-yellow-500 text-white lg:px-6 px-3 lg:py-3 py-2 rounded-lg hover:bg-yellow-600 hover:scale-110 hover:duration-300 "
            // onClick={() => handleCheckOut()}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
