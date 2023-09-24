"use client";

import React, { useMemo } from "react";

// local imports
import { toyotaNPN } from "@/public/utils/toyotaNPN";

// import { infinitiNPN } from "@/public/utils/allInfinitiData";

const AddToCart = ({ params }) => {
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

    console.log("Main array is : ", mainArray);
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

  const handleAddToCart = () => {};
  return (
    <div className="w-full min-h-screen h-auto">
      <h1 className="text-3xl font-bold text-yellow-500 text-center mb-5">
        Add Items to Cart
      </h1>
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
      <div className="overflow-x-auto border p-4 rounded-lg mt-10">
        {combinedArray[0] ? (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Names</th>
                <th>Numbers</th>
                <th>Prices</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {combinedArray[0].map((_, index) => (
                // <tr key={index} className="hover hover:duration-300 cursor-pointer">
                <tr
                  key={index}
                  className={
                    combinedArray[2][index] === "Not available"
                      ? "cursor-not-allowed"
                      : "hover hover:duration-300 cursor-pointer"
                  }
                >
                  <th>{index + 1}</th>
                  {combinedArray.map((row, rowIndex) => (
                    <td key={rowIndex}>{row[index]}</td>
                  ))}
                  <td>
                    {combinedArray[2][index] !== "Not available" && (
                      <button
                        onClick={() =>
                          handleAddToCart(
                            combinedArray.map((row) => row[index])
                          )
                        }
                        className="bg-yellow-500 text-white rounded-md p-2 hover:shadow-lg"
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
            <h1 className="text-center">No Parts Available for this Category</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default AddToCart;
