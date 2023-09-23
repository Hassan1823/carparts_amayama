"use client";
import Image from "next/image";
import React, { useEffect, useState, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";

// local imports
import {
  toyotaCars,
  suzukiCars,
  subaruCars,
  nissanCars,
  mitsubishiCars,
  mazdaCars,
  lexusCars,
  infinitiCars,
  hondaCars,
} from "@/public/utils/cars";

import {
  hondaCarChassisTags,
  infinitiCarChassisTags,
  lexusCarChassisTags,
  mazdaCarChassisTags,
  mitsubishiCarChassisTags,
  nissanCarChassisTags,
  subaruCarChassisTags,
  suzukiCarChassisTags,
  toyotaCarChassisTags,
} from "@/public/utils/carChassisTags";
// import LoadingSpinner from "@/components/LoadingSpinner";

const ExploreSlug = ({ params }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

  const root = params.exploreSlug.split("%20");
  const mainCategory = root[0];
  const restOfElements = root.slice(1);
  const subCategory = restOfElements.join(" ");
  // console.log("main category is : ", mainCateg);
  // console.log("sub category is : ", subCateg);

  const categ = " " + mainCategory + " " + subCategory + " ";
  const tagsCateg = mainCategory + " " + subCategory;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    setTimeout(() => {
      setImageLoading(false);
    }, 4000);
  }, []);

  // const exploreSlug = decodeURIComponent(params.exploreSlug).replace(
  //   /%20/g,
  //   " "
  // );

  const filteredCarArray = useMemo(() => {
    // Select the appropriate car array based on mainCategory
    let carArray;
    switch (mainCategory) {
      case "Toyota":
        carArray = toyotaCars;
        break;
      case "Suzuki":
        carArray = suzukiCars;
        break;
      case "Lexus":
        carArray = lexusCars;
        break;
      case "Mitsubishi":
        carArray = mitsubishiCars;
        break;
      case "Honda":
        carArray = hondaCars;
        break;
      case "Mazda":
        carArray = mazdaCars;
        break;
      case "Nissan":
        carArray = nissanCars;
        break;
      case "Subaru":
        carArray = subaruCars;
        break;
      case "Infiniti":
        carArray = infinitiCars;
        break;
      // Add cases for other categories as needed
      default:
        carArray = [];
    }

    // Filter the selected car array based on categ
    return carArray.filter((data) => data.parentTitle === categ);
  }, [mainCategory, categ]);

  // console.log("Main array data is : ", filteredCarArray);

  const filteredCarTags = useMemo(() => {
    let carTags;
    switch (mainCategory) {
      case "Toyota":
        carTags = toyotaCarChassisTags;
        break;
      case "Suzuki":
        carTags = suzukiCarChassisTags;
        break;
      case "Lexus":
        carTags = lexusCarChassisTags;
        break;
      case "Mitsubishi":
        carTags = mitsubishiCarChassisTags;
        break;
      case "Honda":
        carTags = hondaCarChassisTags;
        break;
      case "Mazda":
        carTags = mazdaCarChassisTags;
        break;
      case "Nissan":
        carTags = nissanCarChassisTags;
        break;
      case "Subaru":
        carTags = subaruCarChassisTags;
        break;
      case "Infiniti":
        carTags = infinitiCarChassisTags;
        break;
      // Add cases for other categories as needed
      default:
        carTags = [];
    }
    const filteredArray = carTags
      .filter((data) => data.title === tagsCateg)
      .map((data) => data.markets);
    // console.log("Main Tagsssss are :", carTags);
    return filteredArray;
  }, [mainCategory, tagsCateg]);

  useEffect(() => {
    filteredCarTags;
    // console.table("Tags are :", filteredCarTags);
  }, [filteredCarTags]);

  return (
    <>
      {/* {loading ? (
        <LoadingSpinner />
      ) : ( */}
      <div className="w-full min-h-screen h-auto lg:px-32 md:px-12 px-6 flex flex-col justify-start gap-6 py-6">
        {/* heading */}
        <h1 className="lg:text-4xl text-2xl font-semibold text-yellow-500">
          {mainCategory} {subCategory}
        </h1>
        {filteredCarArray.length === 0 ? (
          <h1 className="lg:text-2xl text-lg font-light text-gray-500">
            {"No Data Found"}
          </h1>
        ) : (
          <h1 className="lg:text-2xl text-lg font-light ">
            {"Choose generation by production years:"}
          </h1>
        )}
        {/* card */}
        {/* <div className="w-full h-auto flex flex-wrap lg:justify-start justify-center items-start gap-4"> */}
        <div className="w-full h-auto grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-2 place-items-center gap-4 md:gap-6 lg:gap-10">
          {filteredCarArray.map((data, index) => {
            return (
              <div key={index}>
                {/* {data.parentTitle === categ && ( */}
                <div
                  onClick={() => router.push(`${pathname}/${data.Frames}`)}
                  className="w-48 h-60 rounded-md hover:shadow-xl flex flex-col justify-start items-center text-[0.75rem] text-[#A5A5A5] hover:cursor-pointer"
                >
                  {/* {imageLoading ? (
                      <span className="loading loading-infinity loading-md"></span>
                    ) : ( */}
                  <img
                    src={data.imageLink}
                    alt={data.Frames}
                    // width={150}
                    height={100}
                    className=" object-contain rounded-md my-4 lg:w-56 md:w-44 w-36 border"
                  />
                  {/* // )} */}

                  <span className="text-yellow-500 hover:text-white">
                    {data.Family}
                  </span>
                  <span className="text-white hover:text-yellow-500">
                    {data.Years}
                  </span>
                  {/* <span className="truncate">{data.Frames}</span> */}
                  {/* <span className="text-white hover:text-yellow-500 mx-auto text-center">{data.Frames}</span> */}
                  <span className="text-white hover:text-yellow-500">
                    {data.Generation}
                  </span>
                </div>
                {/* )} */}
              </div>
            );
          })}
        </div>

        {/* chassis model */}
        {filteredCarTags.length !== 0 && (
          <>
            <h1 className="lg:text-2xl text-lg font-light">
              {`Choose chassis model by the car's market`}
            </h1>
          </>
        )}

        <div className="flex flex-col gap-4">
          {filteredCarTags.map((data, index) => {
            return (
              <span
                key={index}
                className="text-lg text-yellow-500 hover:text-yellow-600"
              >
                {data[0]?.market_title}
                <div className="w-full h-auto flex flex-wrap gap-4 text-white my-2 lg:text-base text-xs ">
                  {data[0]?.items.map((items) => {
                    return (
                      <span
                        // onClick={() =>
                        //   router.push(`${pathname}/${items.value}`)
                        // }
                        // href={`/toyota/Alphard/${data}`}
                        key={items.value}
                        className=" hover:text-yellow-600 hover:cursor-pointer "
                      >
                        {items.value}
                      </span>
                    );
                  })}
                </div>
                {data[1]?.market_title}
                <div className="w-full h-auto flex flex-wrap gap-4 text-white my-2 lg:text-base text-xs">
                  {data[1]?.items.map((items) => {
                    return (
                      <span
                        // onClick={() =>
                        //   router.push(`${pathname}/${items.value}`)
                        // }
                        // href={`/toyota/Alphard/${data}`}
                        key={items.value}
                        className=" hover:text-yellow-600 hover:cursor-pointer"
                      >
                        {items.value}
                      </span>
                    );
                  })}
                </div>
                {data[2]?.market_title}
                <div className="w-full h-auto flex flex-wrap gap-4 text-white my-2 lg:text-base text-xs">
                  {data[2]?.items.map((items) => {
                    return (
                      <span
                        // onClick={() =>
                        //   router.push(`${pathname}/${items.value}`)
                        // }
                        // href={`/toyota/Alphard/${data}`}
                        key={items.value}
                        className=" hover:text-yellow-600 hover:cursor-pointer"
                      >
                        {items.value}
                      </span>
                    );
                  })}
                </div>
                {data[3]?.market_title}
                <div className="w-full h-auto flex flex-wrap gap-4 text-white my-2 lg:text-base text-xs">
                  {data[3]?.items.map((items) => {
                    return (
                      <span
                        // onClick={() =>
                        //   router.push(`${pathname}/${items.value}`)
                        // }
                        key={items.value}
                        className=" hover:text-yellow-600 hover:cursor-pointer"
                      >
                        {items.value}
                      </span>
                    );
                  })}
                </div>
                {data[4]?.market_title}
                <div className="w-full h-auto flex flex-wrap gap-4 text-white my-2 lg:text-base text-xs">
                  {data[4]?.items.map((items) => {
                    return (
                      <span
                        // onClick={() =>
                        //   router.push(`${pathname}/${items.value}`)
                        // }
                        key={items.value}
                        className=" hover:text-yellow-600 hover:cursor-pointer"
                      >
                        {items.value}
                      </span>
                    );
                  })}
                </div>
              </span>
            );
          })}
        </div>
      </div>
      {/* // )} */}
    </>
  );
};

export default ExploreSlug;
