"use client";

import Link from "next/link";
import React from "react";
// import { UserButton } from "@clerk/nextjs";

// other imports
import { useRecoilState } from "recoil";
import { useSession, signIn, signOut } from "next-auth/react";
// local imports
import { cartState } from "@/atoms/cartState";

const HeadBar = () => {
  const { data: session } = useSession();
  // console.log(session ? session : 'no session data ');
  const [cartItem] = useRecoilState(cartState);

  const handleSignInOut = async () => {
    if (!session) {
      await signIn("google");
    } else {
      await signOut();
    }
  };

  return (
    <div className="w-full py-4">
      <div className="navbar bg-black border-b">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow gap-4 bg-black border rounded-box w-52 text-yellow-500"
            >
              <Link href="/">
                <li>Home</li>
              </Link>
              <Link href="/exploreParts">
                <li>Explore</li>
              </Link>
              <Link href="/">
                <li>Contact US</li>
              </Link>
              <Link href="/">
                <li>Calculator</li>
              </Link>
              <Link href="/">
                <li>Search By Chassis</li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link href="/" className="cursor-pointer">
            <span className="btn btn-ghost normal-case lg:text-3xl md:text-2xl text-xl">
              Amayama
            </span>
            {/* <img 
            src="/Amayama-logo.png" alt="logo" height={100}
            // width={100}
            className="object-contain md:w-24 2xl:w-32 w-20" />*/}
          </Link>
        </div>
        <div className="navbar-end mr-4 flex justify-end items-center md:gap-8 gap-2">
          {/* cart */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {cartItem.length}
                </span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg text-center">
                  {cartItem.length} Items
                </span>
                {/* <span className="text-yellow-500">Subtotal: $999</span> */}
                <Link href="/cart">
                  <div className="card-actions">
                    <button className="btn text-white btn-block bg-yellow-500">
                      View cart
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* sign in and out */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <img
                // src="/dp.jpg"
                src={`${session ? session.user.image : '/dp.jpg'}`}
                alt="dp"
                className="object-contain rounded-full w-9 h-9"
              />
            </label>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                {/* <span className="text-yellow-500">Subtotal: $999</span> */}
                {/* <Link href="/cart"> */}
                <div className="card-actions">
                  <button
                    className="btn text-white btn-block bg-yellow-500"
                    onClick={handleSignInOut}
                  >
                    {!session ? "Sign In with Google" : "Sign Out"}
                  </button>
                </div>
                {/* </Link> */}
              </div>
            </div>
          </div>

          {/* <UserButton afterSignOutUrl="/" /> */}
        </div>
      </div>
    </div>
  );
};

export default HeadBar;
