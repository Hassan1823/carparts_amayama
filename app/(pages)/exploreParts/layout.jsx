import React from "react";
// local imports
import HeadBar from "@/components/HeadBar";
import Footer from "@/components/Footer";


export const metadata = {
  title: "Amayama Car Parts",
  description: "Amayama Car Parts Page",
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
