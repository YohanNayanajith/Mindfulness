import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   // Redirect,
// } from "react-router-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AllProducts from "./components/AllProducts";
import ContactUs from "./pages/ContactUs";
import ForgotPassword from "./pages/ForgotPassword";
import ForgetPassword from "./pages/ForgetPassword";
import OrderHistory from "./pages/OrderHistory";
import Articles from "./pages/Articles";
import AllArticles from "./components/articles/AllArticles";
import ArticleList from "./pages/ArticleList";
import Article from "./pages/Articles";
import UpdatePassword from "./pages/UpdatePassword";
import StripePaymentForm from "./pages/Payments/StripePaymentForm";
import ValidationPage from "./pages/ValidationPage";

const App = () => {
  const user = useSelector((state) => state.user);
  return (
    // <Router>
    //   <Switch>
    //     <Route exact path="/">
    //       <Home />
    //     </Route>
    //     <Route path="/products/:category">
    //       <ProductList />
    //     </Route>
    //     <Route path="/product/:id">
    //       <Product />
    //     </Route>
    //     <Route path="/cart">
    //       <Cart />
    //     </Route>
    //     <Route path="/success">
    //       <Success />
    //     </Route> */}
    //     {/* <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
    //     <Route path="/register">
    //       {user ? <Redirect to="/" /> : <Register />}
    //     </Route>
    //     <Route path="/login">
    //       <Login />
    //     </Route>
    //     <Route path="/register">
    //       <Register />
    //     </Route>
    //   </Switch>
    // </Router>

    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/login" element={user.currentUser ? <Navigate to="/" /> : <Login />} />
        {/* <Route path="/forgotPassword" element={<ForgotPassword />} /> */}
        <Route path="/orderHistory" element={<OrderHistory />} />
        <Route path="/article" element={<AllArticles />} />
        <Route path="/articles/:category" element={<ArticleList />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/updatePassword" element={<UpdatePassword />} />
        <Route path="/paymentForm" element={<StripePaymentForm />} />
        <Route path="/validation" element={<ValidationPage />} />
        <Route
          path="/register"
          element={user.currentUser ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
