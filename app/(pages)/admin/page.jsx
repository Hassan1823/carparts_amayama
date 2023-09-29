"use client";

import React, { useState, useEffect } from "react";
// local import
import Customers from "@/components/Customers";

const Admin = () => {
  return (
    <div className="w-full min-h-screen h-auto bg-black">
      <Customers />
    </div>
  );
};

export default Admin;
