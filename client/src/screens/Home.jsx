import React from "react";
import { Hero } from "../components/homeScreen/Home/Hero";
import { BestPicks } from "../components/homeScreen/Home/BestPicks";
import { FavouriteReads } from "../components/homeScreen/Home/FavouriteReads";

export const Home = () => {
  return (
    <>
      <Hero />
      <BestPicks />
      <FavouriteReads />
    </>
  );
};
