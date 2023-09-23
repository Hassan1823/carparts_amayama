"use client";

// import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { usePathname } from "next/navigation";

// local imports
import { hondaAllPartsData, allHondaDataArray } from "@/public/utils/allPartsData";
import { allDataForInfiniti, infinitiNPN } from "@/public/utils/allInfinitiData";

const Parts = ({ params }) => {
  const pathname = usePathname();
  // const router = useRouter();
  const paramsPath =
    decodeURIComponent(params.schemaItems).replace(/%20/g, " ");

  const subSubCateg =
    decodeURIComponent(params.parts).replace(/%20/g, " ") + " ";
  const root = params.exploreSlug.split("%20");
  const mainCategory = root[0];
  const restOfElements = root.slice(1);
  const subCategory = restOfElements.join(" ");

  // console.log("Main Category is : ", mainCategory);
  // console.log("Sub Category is : ", subCategory);
  // console.log("Sub Sub Category is : ", subSubCateg);
  // console.log("last Params are :", paramsPath);

  const lastCat = subSubCateg;



  const filterAllPartsData = useMemo(() => {
    let allPartsArray;
    switch (mainCategory) {
      case "Toyota":
        allPartsArray = infinitiNPN;
        break;
      case "Suzuki":
        allPartsArray = infinitiNPN;
        break;
      case "Lexus":
        allPartsArray = infinitiNPN;
        break;
      case "Mitsubishi":
        allPartsArray = infinitiNPN;
        break;
      case "Honda":
        allPartsArray = allHondaDataArray;
        break;
      case "Mazda":
        allPartsArray = infinitiNPN;
        break;
      case "Nissan":
        allPartsArray = infinitiNPN;
        break;
      case "Subaru":
        allPartsArray = infinitiNPN;
        break;
      case "Infiniti":
        allPartsArray = infinitiNPN;
        break;
      // Add cases for other categories as needed
      default:
        allPartsArray = [];
    }
    return allPartsArray;
  }, [mainCategory]);

  const arrayData = filterAllPartsData.filter(
    (item) => item.Frames === lastCat
  );
  // console.log("last array data is : ", filterAllPartsData);

  const srcArray = arrayData.map((item) => item.ListOfHrefs).flat();
  // console.log("ListOfHrefs is : ", srcArray);

  const cardsData = srcArray.filter((item) => item.h1Tag === paramsPath);
  // console.log("paramsPath are: '", paramsPath, "'");

  // const cards = cardsData.map((item) => item.cards);

  return (
    <>
      {/* main container */}
      <div className="flex flex-col lg:px-32 md:px-12 px-4 text-center justify-center">
        {/* heading */}
        <h1 className="lg:text-4xl text-2xl font-semibold text-yellow-500 py-6">
          Choose schema for
        </h1>
        <h1 className="lg:text-2xl md:text-xl text-lg font-semibold text-yellow-500">
          {paramsPath && paramsPath}
        </h1>

        {/* parts cards */}

        <div className="w-full h-auto flex items-center justify-center gap-2 my-6">
          {cardsData ? (
            <>
              {cardsData.map((items, index) => {
                return (
                  <div
                    key={index}
                    // className="w-full h-auto flex flex-wrap justify-center items-center"
                    className="w-full h-auto grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-2 place-items-center gap-2 sm:gap-8 lg:gap-14"
                  >
                    {items.cards?.map((data, index) => {
                      return (
                        <Link
                          key={index}
                          href={`${pathname}/${data.Alt}`}
                          className="sm:w-48 w-auto h-56 sm:p-0 p-1 flex flex-col hover:shadow-xl hover:border hover:duration-300 hover:scale-105 hover:border-opacity-10 rounded-md items-center justify-around text-yellow-500 hover:bg-slate-100 hover:bg-opacity-10"
                        >
                          <img
                            src={data.ImageLink}
                            alt={data.Alt}
                            // width={160}
                            height={100}
                            className="object-contain rounded-md lg:w-56 md:w-44 w-40"
                          />
                          <span className="lg:text-sm text-xs">{data.Alt}</span>
                        </Link>
                      );
                    })}
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold text-gray-500">
                No Data Found
              </h1>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Parts;
