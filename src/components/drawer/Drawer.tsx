"use client";

import { useState,useEffect } from "react";
import CodeBlock from "./CodeBlock";
import SnippetSection from "../snippet/snippet";
import { useSearchParams } from "next/navigation";

const RightDrawer = () => {
  const [isOpen, setIsOpen] = useState(true);
  
  const searchParams = useSearchParams();

  const snippet = searchParams.get("snippet")
    ? searchParams.get("snippet")
    : "";
  


  const toggleDrawer = () => {
    // setIsOpen(!isOpen);
    setIsOpen(true);
  };

  return (
    snippet && 
    (
      <div className="flex items-center justify-center">
      {/* <div
        className=" bg-black text-white rounded-xl hover:bg-black hover:text-white hover:duration-300 p-2 transition-all duration-300 ease-in-out border-2 border-black hover:border-white"
      >
       
      </div> */}
      {isOpen && (
        <div className="fixed top-16 right-0 h-full w-1/2 bg-black transition-all duration-300">
          <div className="p-4">
            Drawer content goes here snippet id-  {snippet}
            <h2 className="text-xl font-bold text-white">
              Sub Category Heading
            </h2>
            <h2 className="text-zinc-100/70 text-sm py-2 mb-2">File Count</h2>
            <CodeBlock />
          </div>
        </div>
      )}
    </div>
    )
  );
};

export default RightDrawer;
