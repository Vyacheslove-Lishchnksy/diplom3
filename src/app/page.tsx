"use client";

import dynamic from "next/dynamic";

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { App } from "../components/App";
import { useStatusCheck } from "../hooks/useStatusChack";
import { useState } from "react";

const NavigationBar = dynamic(() => import("../components/NavigationBar"), {
  ssr: false,
});
const TopBarButtons = dynamic(() => import("../components/TopBarButtons"), {
  ssr: false,
});


export default function Home() {
 

  useStatusCheck();  

  

  return (
     <App/>
  );
}
