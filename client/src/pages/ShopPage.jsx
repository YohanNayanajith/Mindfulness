import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import ProductList from "./ProductList";

const ShopPage = () => {
  return (
    <div>
      <Announcement />
      <Navbar />

      <ProductList />
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default ShopPage;
