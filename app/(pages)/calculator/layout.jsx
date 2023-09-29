import React from "react";
// local imports
import HeadBar from "@/components/HeadBar";
import Footer from "@/components/Footer";


export const metadata = {
  title: "Amayama Calculator",
  description: "Amayama Calculator Page",
};

export default function Layout({ children }) {
    return (
      <>
        <HeadBar />
        <main>{children}</main>
        <Footer />
      </>
    )
  }
// export default layout
