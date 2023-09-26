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

  // getting user email
  const email = session && session.user && session.user.email;


  const handleCheckOut = async () => {
    try {
      let data = await fetch(`http://localhost:3000/api/products/${email}`, {
        method: "PUT",
        body: JSON.stringify({
          orderStatus: true,
        }),
      });
      data = await data.json();
      if (data.result) {
        toast(`Paid !!!`, {
          duration: 1000,
          position: "center-top",

          // Custom Icon
          icon: "😌",

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
    } catch (error) {
      console.log("Error in Checkout");
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
                  <th>Prices</th> {/* New column for action */}
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
                        <td>
                          <button
                            // onClick={() => removeItemFromCart(index)}
                            onClick={() => deleteRecord(id)}
                            className="bg-red-500 text-white rounded-md p-1 hover:shadow-lg hover:scale-105 hover:duration-200"
                          >
                            Remove
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
            onClick={() => handleCheckOut()}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
