"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
// local imports
import LoadingSpinner from "@/components/LoadingSpinner";

const Customers = () => {
  const [cartData, setCartData] = useState([]);
  const [visibleRows, setVisibleRows] = useState(10);
  // getting cart data from DB
  const getProductData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/products`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const productData = await response.json();

      if (productData.success === true) {
        const results = productData.products;
        setCartData(results);
      } else {
        console.log("No Data Found From DB!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    console.table(cartData.length !== 0 ? cartData : "No Data");
  }, [cartData]);

  const getTotalPQ = (cartData) => {
    let totalSum = 0;
    let totalQuantity = 0;
    const totoalArray = cartData.map((item) => {
      totalSum += item.price;
      totalQuantity += item.quantity;
      // return totalSum;
    });
    console.log(totalSum);
    console.log(totalQuantity);
    return { totalSum, totalQuantity };
  };

  const { totalSum, totalQuantity } = getTotalPQ(cartData);

  const handleViewMoreClick = () => {
    setVisibleRows((prevVisibleRows) => prevVisibleRows + 10);
  };

  return (
    <>
      {cartData.length !== 0 ? (
        <>
          <div className="bg-black min-h-screen">
            <div className="flex justify-between p-6 text-yellow-500 font-bold border-b mb-4">
              <h2>Customer Orders</h2>
              <h2>Welcome Back, Admin</h2>
            </div>
            {/* total price and quantity */}
            <div className="w-full flex justify-between items-center p-6 border-black border-t mt-2">
              <h1 className="text-lg font-bold ">
                {" "}
                <span className="text-yellow-500"> Total Price</span> :{" "}
                <span className="text-yellow-500"> $</span> {totalSum}
              </h1>
              <h1 className="text-lg font-bold">
                {" "}
                <span className="text-yellow-500"> Total Quantity </span>:{" "}
                {totalQuantity}
              </h1>
            </div>

            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead className="text-yellow-500 text-lg">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Product Details</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Details</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.slice(0, visibleRows).map((item, index) => {
                    return (
                      <tr className="hover:scale-[101%] duration-300">
                        <th>
                          <label>{index + 1}</label>
                        </th>
                        <td>
                          <div className="flex items-center space-x-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img
                                  // src="/tailwind-css-component-profile-2@56w.png"
                                  src={item ? item.image : "/dp.jpg"}
                                  alt="dp"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{item.name}</div>
                              <div className="text-sm opacity-90 ">
                                {item.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="font-semibold">
                          {item.productName}
                          <br />
                          {/* <span className="badge badge-ghost badge-sm">
                      Desktop Support Technician
                    </span> */}
                        </td>
                        <td className="font-bold">$ {item.price}</td>
                        <td
                          className={
                            item.orderStatus
                              ? `text-blue-500 font-bold`
                              : `text-yellow-500 font-bold`
                          }
                        >
                          {item.orderStatus ? <>Confirmed</> : <>Pending</>}
                        </td>
                        <th>
                          <Link href={`/admin/${item._id}`}>
                            <button className="btn btn-ghost btn-xs bg-yellow-500">
                              details
                            </button>
                          </Link>
                        </th>
                        <th>
                          <Link href={item.partLink}>
                            <button className="btn btn-ghost btn-xs bg-green-600">
                              Order
                            </button>
                          </Link>
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
                {/* foot */}
                <tfoot className="text-yellow-500 text-sm">
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Product Details</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Details</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
              </table>
            </div>
            {/* Add a View More button */}
            {visibleRows < cartData.length && (
              <div className="flex justify-center mt-8">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                  onClick={handleViewMoreClick}
                >
                  View More
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <LoadingSpinner />
        </>
      )}
    </>
  );
};

export default Customers;
