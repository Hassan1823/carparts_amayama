import React from "react";
import Link from "next/link";
import Image from "next/image";
import { RxDashboard, RxPerson } from "react-icons/rx";
import { HiOutlineShoppingBag } from "react-icons/hi";

export const metadata = {
  title: "Amayama Admin Panel",
  description: "Amayama Admin Panel Page",
};

export default function Layout({ children }) {
  return (
    <>
      <div className="flex">
        <div className="fixed w-20 h-screen p-4 bg-black border-r-[1px] flex flex-col justify-between">
          <div className="flex flex-col items-center">
            <Link href="/admin">
              <div className="bg-gray-300 text-black hover:bg-gray-200 p-3 rounded-lg inline-block">
                {/* <RxSketchLogo size={20} /> */}
                <Image
                  src="/amayama.png"
                  alt="logo"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
            </Link>
            <span className="border-b-[1px] border-yellow-500 w-full p-2"></span>
            {/* <Link href="/">
              <div className="bg-gray-300 text-black hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                <RxDashboard size={20} />
              </div>
            </Link>
            <Link href="/customers">
              <div className="bg-gray-300 text-black hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                <RxPerson size={20} />
              </div>
            </Link> */}
            <Link href="/admin">
              <div className="bg-gray-300 text-yellow-500 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                <HiOutlineShoppingBag size={20} />
              </div>
            </Link>
          </div>
        </div>
        <main className="ml-20 w-full">{children}</main>
      </div>
    </>
  );
}
// export default layout
