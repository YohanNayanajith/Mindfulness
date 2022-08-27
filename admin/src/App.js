import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import Post from "./pages/post/Post";
import { useSelector } from "react-redux";
import ArticleList from "./pages/ArticleLIst/ArticleList";
import Article from "./pages/Article/Article";
import NewArticle from "./pages/newArticle/NewArticle";
import { SendEmail } from "./pages/sendEmail/SendEmail";
import BulkEmail from "./pages/BulkEmail/BulkEmail";
import OrderList from "./pages/OrderList/OrderList";
import ForgetPassword from "./pages/forgetPassword/ForgetPassword";
import PaymentList from "./pages/paymentList/PaymentList";
import Payments from "./pages/payment/Payment";
import ReportList from "./pages/ReportList/ReportList";

function App() {
  // const admin = useSelector((state) => state.user.currentUser.isAdmin);
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/ForgetPassword">
          <ForgetPassword />
        </Route>
        {/* {admin && ( */}
        <>
          <Topbar />
          <div className="container">
            <Sidebar />
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/users">
              <UserList />
            </Route>
            <Route path="/user/:userId">
              <User />
            </Route>
            <Route path="/newUser">
              <NewUser />
            </Route>
            <Route path="/products">
              <ProductList />
            </Route>
            <Route path="/product/:productId">
              <Product />
            </Route>
            <Route path="/newproduct">
              <NewProduct />
            </Route>
            <Route path="/article">
              <ArticleList />
            </Route>
            <Route path="/articles/:articleId">
              <Article />
            </Route>
            <Route path="/newarticle">
              <NewArticle />
            </Route>
            <Route path="/orders">
              <OrderList />
            </Route>
            <Route path="/reports">
              <ReportList />
            </Route>

            <Route path="/email">
              <SendEmail />
            </Route>
            <Route path="/bulkEmail">
              <BulkEmail />
            </Route>
            <Route path="/payments">
              <PaymentList />
            </Route>
            <Route path="/payment/:paymentId">
              <Payments />
            </Route>

            <Route path="/post">
              <Post />
            </Route>
          </div>
        </>
        {/* )} */}
      </Switch>
    </Router>
  );
}

export default App;
