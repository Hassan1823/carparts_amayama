"use client";

import Image from "next/image";
import React, { useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";

// local imports
// import { infinitiNPN } from "@/public/utils/allInfinitiData";
// import { lexusNPN } from "@/public/utils/lexusNPN";
// import { mazdaNPN } from "@/public/utils/mazdaNPN";
// import { nissanNPN } from "@/public/utils/nissanNPN";
// import { subaruNPN } from "@/public/utils/subaruNPN";
import { toyotaNPN } from "@/public/utils/toyotaNPN";
// import { suzukiNPN } from "@/public/utils/suzukiNPN";

const partsGroup = [
  {
    src: "https://www.amayama.com/i/catalogs/group_1.png",
    desc: " Engine , fuel system and tools ",
  },
  {
    src: "https://www.amayama.com/i/catalogs/group_3.png",
    desc: " Body and interior ",
  },
  {
    src: "https://www.amayama.com/i/catalogs/group_2.png",
    desc: " Chassis and transmission ",
  },
  {
    src: "https://www.amayama.com/i/catalogs/group_4.png",
    desc: " Electrics ",
  },
];

const Chassis = ({ params }) => {
  const router = useRouter();
  const pathname = usePathname();
  const subSubCateg =
    decodeURIComponent(params.parts).replace(/%20/g, " ") + " ";
  const root = params.exploreSlug.split("%20");
  const mainCategory = root[0];
  const restOfElements = root.slice(1);
  const subCategory = restOfElements.join(" ");

  const lastCat = subSubCateg;


  const filterAllPartsData = useMemo(() => {
    let allPartsArray;
    switch (mainCategory) {
      case "Toyota":
        allPartsArray = toyotaNPN;
        break;
      case "Suzuki":
        allPartsArray = toyotaNPN;
        break;
      case "Lexus":
        allPartsArray = toyotaNPN;
        break;
      case "Mitsubishi":
        allPartsArray = toyotaNPN;
        break;
      case "Honda":
        allPartsArray = toyotaNPN;
        break;
      case "Mazda":
        allPartsArray = toyotaNPN;
        break;
      case "Nissan":
        allPartsArray = toyotaNPN;
        break;
      case "Subaru":
        allPartsArray = toyotaNPN;
        break;
      case "Infiniti":
        allPartsArray = toyotaNPN;
        break;
      // Add cases for other categories as needed
      default:
        allPartsArray = [];
    }
    return allPartsArray;
  }, [mainCategory]);

  // console.table("filtered all parts data is : ", filterAllPartsData);

  const headTitle = filterAllPartsData.find((item) => item.Frames === lastCat);


  const arrayData = filterAllPartsData.filter(
    (item) => item.Frames === lastCat
  );

  const mainArrayData = arrayData.slice(0,1)
  

  const srcArray = mainArrayData.map((item) => item.ListOfHrefs).flat();

  // returning href function
  const gettingHref = (partsGroup, srcArray) => {
    const partsFirst = partsGroup.map((item) => {
      const firstPartWord = item.desc.split(" ")[1];
      return firstPartWord;
    });

    const srcArrayFirst = srcArray.map((item) => {
      const firstSrcArrayWord = item.h1Tag.split(" ")[1];
      return firstSrcArrayWord;
    });

    if (partsFirst === srcArrayFirst) return h1Tag;
  };

  const firstLetter = gettingHref(partsGroup, srcArray);

  // href function
  const hrefFunction = (srcArray, item) => {
    const descItem = item.split(" ")[1];

    const gettingLetter = srcArray.find((data) => {
      const letter = data.h1Tag.split(" ")[1];
      // if(letter === descItem)
      // return data.h1Tag;
      return letter === descItem;
    });

    return gettingLetter ? gettingLetter.h1Tag : null;
  };

  return (
    <>
      {/* main conatiner */}

      <div className="w-full min-h-screen h-auto lg:px-32 px-4 flex flex-col gap-8">
        <h1 className="lg:text-3xl text-lg text-yellow-500 font-semibold py-6">
          {headTitle ? (
            <>{headTitle?.BreadcrumbsH1}</>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <span className="text-slate-400 "> No data found for </span>{" "}
              {mainCategory} {subCategory} , {subSubCateg}
            </div>
          )}
        </h1>
        {/* parts group */}
        <div className="w-full h-auto flex lg:justify-start justify-center flex-wrap gap-8">
          {/* card */}
          {arrayData?.slice(0, 1).map((data, index) => {
            return (
              <div
                className="h-auto w-full flex flex-wrap justify-evenly gap-8 items-center"
                key={index}
              >
                <div
                  // onClick={() => router.push(`${pathname}/${data.name}`)}
                  // href={`${pathname}/${data.generation}`}
                  className="w-48 h-60 rounded-md hover:shadow-xl flex flex-col justify-start items-center text-[0.75rem] text-[#A5A5A5] hover:cursor-not-allowed "
                >
                  <img
                    src={data.ImageLink}
                    alt="cars"
                    width={180}
                    height={48}
                    className=" object-contain rounded-md my-4"
                  />

                  <span className="text-yellow-600">{data.Family}</span>
                  <span>{data.Years}</span>
                  {/* <span>{data.Frames}</span> */}
                  <span>{data.Generation}</span>
                </div>
                {/* parts grid group */}
                <div className="flex flex-col gap-2 my-8">
                  <h1 className="lg:text-2xl text-base">Choose parts group:</h1>
                  {/* parts */}
                  <div className="w-full h-auto flex flex-wrap lg:justify-start justify-center gap-4 hover:cursor-pointer my-4">
                    {partsGroup?.map((item, index) => {
                      // const href = decodeURIComponent(srcArray[index].h1Tag);
                      // const hrefData = decodeURIComponent(hrefFunction(srcArray, item.desc));
                      const hrefData = hrefFunction(srcArray, item.desc);

                      return (
                        <span
                          key={index}
                          onClick={() => router.push(`${pathname}/${hrefData}`)}
                          // href={`/toyota/Alphard/2%20generation/${item.desc}`}
                          className="hover:shadow-xl w-44 h-44 rounded-md text-yellow-500 hover:text-yellow-600 font-medium flex flex-col justify-start text-center items-center gap-2 hover:scale-105 hover:duration-300 hover:bg-slate-100 hover:bg-opacity-10"
                        >
                          <Image
                            src={item.src}
                            alt={item.desc}
                            width={100}
                            height={100}
                            className="object-contain"
                          />
                          <span>{item.desc}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col gap-8 pb-20 w-full">
                  <h1 className="lg:text-lg text-sm font-medium text-yellow-500">
                    Frames
                  </h1>
                  <p className="lg:text-sm text-xs leading-5">{data.Frames}</p>

                  <h1 className="lg:text-lg text-sm font-medium text-yellow-500">
                    {data.typesDiv}
                  </h1>
                  <p className="lg:text-sm text-xs leading-5">
                    {data.textsDiv}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Chassis;
