"use client"; // ✅ Marcamos este archivo como un Client Component

import { useEffect } from "react";
import { useGlobalStore } from "@/store/globals.store";

const ClientWrapper = () => {
  const setIsMobile = useGlobalStore((state) => state.setIsMobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize(); // ✅ Ejecutar al cargar

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsMobile]);

  return null; 
};

export default ClientWrapper;
