"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
// local imports
import LoadingSpinner from "@/components/LoadingSpinner";

const CustomersID = ({ params }) => {
  const [cartData, setCartData] = useState([]);

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
        const data = results.filter((item) => item._id === params.adminId);
        setCartData(data);
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

  return (
    <>
      {cartData.length !== 0 ? (
        <>
          <div className=" w-full min-h-screen text-white">
            <div className="flex justify-between p-6 border-b border-white mb-4">
              <h2 className="font-bold text-yellow-500">Order Details</h2>
              <h2>
                <span className="font-bold text-yellow-500">Client ID :</span>{" "}
                {params.adminId}
              </h2>
            </div>
            <div className="overflow-x-auto my-16">
              {cartData.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-wrap justify-evenly items-center gap-8"
                  >
                    <div className="mx-8 flex flex-col justify-between items-center gap-8">
                      <img
                        src={item ? item.image : "/dp.jpg"}
                        alt={item.name}
                        className="object-contain w-32 rounded-full"
                      />
                      <Link href={item.partLink}>
                        <button className="btn text-white bg-yellow-500 p-2 text-center">
                          Order For {item.name}
                        </button>
                      </Link>
                    </div>
                    <div className="flex flex-col justify-center items-start sm:text-sm text-base gap-1">
                      <h1 className="text-base">
                        <span className="font-bold text-yellow-500">
                          Client Name :
                        </span>{" "}
                        {item.name}
                      </h1>
                      <h1 className="text-base">
                        <span className="font-bold text-yellow-500">
                          Client Email :
                        </span>{" "}
                        {item.email}
                      </h1>
                      <h1 className="text-base">
                        <span className="font-bold text-yellow-500">
                          Main Category :
                        </span>{" "}
                        {item.mainCategory}
                      </h1>
                      <h1 className="text-base">
                        <span className="font-bold text-yellow-500">
                          Product :
                        </span>{" "}
                        {item.productName}
                      </h1>
                      <h1 className="text-base">
                        <span className="font-bold text-yellow-500">
                          Sub Category :
                        </span>{" "}
                        {item.subCategory}
                      </h1>
                      <h1 className="text-base">
                        <span className="font-bold text-yellow-500">
                          Parts Group :
                        </span>{" "}
                        {item.partGroup}
                      </h1>
                      <h1 className="text-base">
                        <span className="font-bold text-yellow-500">
                          Frame :
                        </span>{" "}
                        {item.frame}
                      </h1>
                      <h1 className="text-base">
                        <span className="font-bold text-yellow-500">
                          Quantity :
                        </span>{" "}
                        {item.quantity}
                      </h1>
                      <h1 className="text-base">
                        {" "}
                        <span className="font-bold text-yellow-500">
                          Number :
                        </span>{" "}
                        {item.number}
                      </h1>
                      <h1 className="text-base">
                        {" "}
                        <span className="font-bold text-yellow-500">
                          Price :{" "}
                        </span>
                        $ {item.price}
                      </h1>
                      <h1 className="text-base">
                        <span className="font-bold text-yellow-500">
                          Order Status :
                        </span>{" "}
                        {item.orderStatus}
                      </h1>
                      <h1 className="text-base">
                        {" "}
                        <span className="font-bold text-yellow-500">
                          Order Date :{" "}
                        </span>
                        {item.time.split("T")[0]}
                      </h1>
                    </div>
                  </div>
                );
              })}
            </div>
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

export default CustomersID;
