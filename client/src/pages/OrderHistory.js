import Announcement from "../components/Announcement";
import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import OrderHistoryComponent from "../components/OrderHistory/OrderHistoryComponent";
import OrderHistoryTest from "../components/OrderHistory/OrderHistoryTest";

const OrderHistory = () => {
  return (
    <div>
      <Navbar />
      <Announcement />
      {/* <Slider /> */}
      {/* <Categories /> */}
      {/* <Products/> */}
      <OrderHistoryTest />
      {/* <OrderHistoryComponent /> */}
      <Newsletter />
      <Footer />
    </div>
  );
};

export default OrderHistory;
