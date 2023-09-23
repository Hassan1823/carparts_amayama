"use client";

import React from "react";
import { RecoilRoot } from "recoil";

const RecoilWrapper = ({ children }) => {
  return (
    <>
      <RecoilRoot>{children}</RecoilRoot>
    </>
  );
};

export default RecoilWrapper;
