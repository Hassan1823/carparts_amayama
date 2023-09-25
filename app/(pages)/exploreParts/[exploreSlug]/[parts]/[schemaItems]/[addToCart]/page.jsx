"use client";

import React, { useEffect, useMemo, useState } from "react";

// local imports
import { useRecoilState } from "recoil";
import { useSession } from "next-auth/react";
// local imports
import { toyotaNPN } from "@/public/utils/toyotaNPN";
import { cartState } from "@/atoms/cartState";
import toast from "react-hot-toast";

// import { infinitiNPN } from "@/public/utils/allInfinitiData";

const AddToCart = ({ params }) => {
  const { data: session } = useSession();
  const userData = () => {
    if (session) {
      return session.user;
    } else {
      return [];
    }
  };
  const user = userData();
  console.table(user);

  // cart items
  const [cartItem, setCartItem] = useRecoilState(cartState);
  const title = decodeURIComponent(params.exploreSlug).split(" ")[0];
  const ParentFrame = decodeURIComponent(params.parts).split(" ")[1];
  const Frames = " " + ParentFrame + " ";
  const ParentTitle = decodeURIComponent(params.exploreSlug);
  // h1Tag
  const h1Tag = decodeURIComponent(params.schemaItems);
  // console.log("H1 Tag : '", h1Tag, "'");

  const Alt = decodeURIComponent(params.addToCart);

  const getMainData = useMemo(() => {
    // getting main array
    let mainArray;
    switch (title) {
      case "Toyota":
        mainArray = toyotaNPN;
        break;
      case "Suzuki":
        mainArray = toyotaNPN;
        break;
      case "Lexus":
        mainArray = toyotaNPN;
        break;
      case "Mitsubishi":
        mainArray = toyotaNPN;
        break;
      case "Honda":
        mainArray = toyotaNPN;
        break;
      case "Mazda":
        mainArray = toyotaNPN;
        break;
      case "Nissan":
        mainArray = toyotaNPN;
        break;
      case "Subaru":
        mainArray = toyotaNPN;
        break;
      case "Infiniti":
        mainArray = toyotaNPN;
        break;
      default:
        mainArray = [];
    }

    // filtering to one array

    // console.log("Main array is : ", mainArray);
    const oneArray = mainArray.filter(
      (item) => item.Frames === Frames || item.ParentTitle === ParentTitle
    );

    // console.log("One Array is :", oneArray);

    // list of hrefs
    const listOfHref = oneArray.map((item) => item.ListOfHrefs);

    // console.table("List of Href is :", listOfHref);

    const h1TagArray = listOfHref.map((item) =>
      item.filter((data) => data.h1Tag === h1Tag)
    );
    // console.log("Final array is ",h1TagArray);

    const cardsArray = h1TagArray.map((item) => item.map((data) => data.cards));
    // console.log("cards array is ", cardsArray);

    // filtering cards according to parts
    const partsSigleArray = cardsArray.map((item) =>
      item.map((data) => data.filter((items) => items.Alt === Alt))
    );
    // console.log("Parts Single Array is :", partsSigleArray);
    const flattenedArray = partsSigleArray.flat(3);

    return flattenedArray;
  }, [title]);

  // console.table("Single Array is  : ", getMainData);
  const hrefNamesArray = getMainData.map((item) =>
    item.hrefNames ? item.hrefNames : " "
  );

  const hrefNumbersArray = getMainData.map((item) =>
    item.hrefNumbers ? item.hrefNumbers : " "
  );

  const hrefPricesArray = getMainData.map((item) =>
    item.hrefPrices ? item.hrefPrices : " "
  );

  const combinedArray = hrefNamesArray.concat(
    hrefNumbersArray,
    hrefPricesArray
  );
  // console.table("combined Array is  : ", combinedArray);

  // const handleAddToCart = () => {};

  const addItemToCart = (data) => {
    const currentItem = gettingCurrentItem(data);
    // console.table(currentItem);

    sendDataToServer(currentItem);
    // Check if the item is already in the cart by comparing its data with existing cart items
    const isItemAlreadyInCart = cartItem.some((item) => {
      // Compare each item in the cart with the new item
      return item.every((value, index) => value === data[index]);
    });

    // If the item is not already in the cart, add it
    if (!isItemAlreadyInCart) {
      // console.log("Adding item to cart:", data);
      setCartItem((prevState) => [...prevState, data]);
      toast(`${data[0]} Added to Cart`, {
        duration: 1000,
        position: "center-top",

        // Custom Icon
        icon: "❤️",

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
    } else {
      toast(`This Product is Already in the Cart`, {
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
      // console.log("Item is already in the cart.");
    }
  };
  // getting the current item
  const gettingCurrentItem = (data) => {
    // console.table("Current Item:", data);
    const productName = data[0];
    // console.table("Names:", names);
    const number = parseInt(data[1]);
    // console.table("Numbers:", numbers);
    const pricesDigit = calculateTwentyPercent(data[2]);
    const pricesFunction = () => {
      const priceString = pricesDigit.replace(",", ".");
      const numericPart = priceString.match(/[\d.]+/);
      return numericPart ? parseFloat(numericPart[0]) : 0;
    };

    const price = pricesFunction();

    // console.table("Prices:", prices);

    return { productName, number, price };
  };

  // Calculate the 20% values before rendering
  const calculateTwentyPercent = (value) => {
    const floatValue = parseFloat(value.replace(/,/g, ""));
    if (isNaN(floatValue)) {
      // console.log(`Original Value: ${value}`);
      return value; // If not a valid float, return the original value
    } else {
      const twentyPercent = floatValue * 0.2;
      const sumValue = floatValue + twentyPercent;

      // console.log(`Original Value: ${value}`);
      // console.log(
      //   `20% Value: ${new Intl.NumberFormat("en-US", {
      //     style: "currency",
      //     currency: "USD",
      //     minimumFractionDigits: 2,
      //     maximumFractionDigits: 2,
      //   }).format(twentyPercent)}`
      // );
      // console.log(
      //   `Sum Value: ${new Intl.NumberFormat("en-US", {
      //     style: "currency",
      //     currency: "USD",
      //     minimumFractionDigits: 2,
      //     maximumFractionDigits: 2,
      //   }).format(sumValue)}`
      // );

      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(sumValue);
    }
  };
  const email = user.email;
  const name = user.name;
  const image = user.image;

  console.table(email, name, image);

  // sending data to database
  const sendDataToServer = async (currentItem) => {
    const { productName, number, price } = currentItem;

    // Assuming 'image' is a URL to the image
    const requestBody = {
      email,
      name,
      image, // Assuming 'image' is the URL
      productName,
      number,
      price,
    };

    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          alert("New Product Added!");
        }
      } else {
        // Handle errors here
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      // Handle network errors here
      console.error("Network Error:", error);
    }
  };

  return (
    <div className="w-full min-h-screen h-auto">
      <h1 className="text-3xl font-bold text-yellow-500 text-center mb-5">
        Choose Your favourite Part
      </h1>
      <div className="w-full h-auto flex flex-wrap justify-evenly items-center p-4 gap-4">
        <div className="flex flex-col gap-1 w-1/2">
          <h1 className="text-2xl font-bold text-yellow-500">Details :</h1>
          <h1>{ParentTitle}</h1>
          <h1>{ParentFrame}</h1>
          <h1>{h1Tag}</h1>
          <h1>{Alt}</h1>
        </div>
        <div className="">
          {getMainData &&
            getMainData.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full h-auto flex justify-center items-center my-5"
                >
                  <img
                    src={item.ImageLink}
                    alt={item.Alt}
                    className="w-100 h-[250px] object-contain rounded-lg"
                  />
                </div>
              );
            })}
        </div>
      </div>
      <div className="overflow-x-auto border p-4 rounded-lg mt-10">
        {combinedArray[0] ? (
          <table className="table">
            <thead>
              <tr className="w-1/5 px-4 py-2 text-center">
                <th>ID</th>
                <th>Names</th>
                <th>Numbers</th>
                <th>Prices</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {combinedArray[0].map((_, index) => (
                // <tr key={index} className="hover hover:duration-300 cursor-pointer">
                <tr
                  key={index}
                  className={
                    combinedArray[2][index] === "Not available" ||
                    combinedArray[2][index] === "Out of stock" ||
                    combinedArray[2][index] === "Discontinued" ||
                    combinedArray[0][index] === "-"
                      ? "cursor-not-allowed w-1/5 px-4 py-2 text-center bg-slate-700 hover:scale-[103%] duration-200"
                      : "hover hover:duration-300 cursor-pointer w-1/5 px-4 py-2 text-center hover:scale-[103%] duration-200"
                  }
                >
                  <th>{index + 1}</th>

                  {combinedArray.map((row, rowIndex) => (
                    <td key={rowIndex}>
                      {rowIndex === 2 &&
                      combinedArray[2][index] !== "Discontinued" &&
                      combinedArray[2][index] !== "Not available" &&
                      combinedArray[2][index] !== "Out of stock"
                        ? // Use the function to calculate and format the values
                          calculateTwentyPercent(row[index])
                        : // If the conditions aren't met, display the original value
                          row[index]}
                    </td>
                  ))}

                  <td>
                    {combinedArray[2][index] !== "Discontinued" &&
                      combinedArray[2][index] !== "Not available" &&
                      combinedArray[2][index] !== "Out of stock" &&
                      combinedArray[0][index] !== "-" && (
                        <button
                          onClick={
                            () =>
                              addItemToCart(
                                combinedArray.map((row) => row[index])
                              )
                            // addItemToCart
                          }
                          className="bg-yellow-500 text-white rounded-md p-2 hover:scale-110 hover:duration-200 "
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
                              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                            />
                          </svg>
                        </button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <>
            <h1 className="text-center">
              No Parts Available for this Category
            </h1>
          </>
        )}
      </div>
    </div>
  );
};

export default AddToCart;
