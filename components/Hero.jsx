'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";



function Hero() {

const router = useRouter();

  const handleNavigae= ()=>{
router.push('/exploreParts')
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <h2
          className="text-[40px] md:text-[60px] 
                font-bold "
        >
          Premium Car <span className="text-yellow-500">Parts</span> At Your Door
        </h2>
        <h2 className="text-[20px] text-gray-500 pr-20 mt-5">
          Choose your car parts and place order 
        </h2>
        <button
          className="p-2 mt-5 bg-yellow-500 text-white
                px-4 rounded-full 
                hover:scale-105 transition-all my-8"
                onClick={handleNavigae}
        >
          Explore Parts
        </button>
      </div>
      <div>
        <Image
          src="/car.png"
          alt="hero"
          width={400}
          height={500}
          priority
          className="w-full object-fit align-center"
        />
      </div>
    </div>
  );
}

export default Hero;
