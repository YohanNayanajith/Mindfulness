import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../requestMethods";
import StripeCheckout from "react-stripe-checkout";
// import { Search, ShoppingCartOutlined, AccountCircle } from "@material-ui/icons";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SweetAlert from "react-bootstrap-sweetalert";
import {
  removeProduct,
  decreaseAddProduct,
  increaseAddProduct,
} from "../redux/cartRedux";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
// const KEY = process.env.REACT_APP_STRIPE;
//yohannayanajith13@gmail.com

const KEY = "pk_test_51LQvEKAjPRkUStMYeszYDlKAWx1thKzD8UU92RgiQMeTsHUGozDB2rrN0Nm8nVuCXefDo5t8WCkAcHXkBhoTdFWx00Eg83KkA1";
// console.log(KEY);
const stripePromise = loadStripe(KEY);

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const PriceDetailContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const [productId, setProductId] = useState("");
  const [allShow, setAllShow] = useState(false);
  const [productPrice, setProductPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  // const history = useHistory();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onToken = (token) => {
    setStripeToken(token);
    // console.log(stripeToken);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("http://localhost:5000/api/v1/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
          // amount: cart.total * 100,
        });
        // history.push("/success", {
        //   stripeData: res.data,
        //   products: cart,
        // });
        navigate("/success", {
          stripeData: res.data,
          products: cart,
        });
        // console.log(res);
      } catch {}
    };
    // stripeToken && cart.total >= 1 && makeRequest();
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, cart.products, navigate]);

  const navigateShop = () => {
    navigate("/products");
  };

  const removeItem = () => {
    // alert("delete button clicked");
    dispatch(removeProduct({ productId, productPrice }));
    // removeCartDetails();
  };
  const increaseItem = () => {
    dispatch(increaseAddProduct({ productId, productPrice, price }));
    // updateCartDetails();
  };
  const decreaseItem = () => {
    dispatch(decreaseAddProduct({ productId, productPrice, price }));
    // updateCartDetails();
  };

  const redirectToPayment = () => {
    if(cart.total === 0) {
      setAllShow(true);
    }else {
      navigate("/paymentForm", {
        products: cart,
      });
    }
  }

  // const updateCartDetails = async () => {
  //   try {
  //     let response = await fetch(`http://localhost:5000/api/v1/carts/{productId}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         // token: token,
  //       },
  //       body: JSON.stringify({
  //         quantity: productQuantity
  //       }),
  //     });
  //     let json = await response.json();
  //     console.log(json);
  //     alert("Update");
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  return (
    <Container>
      <SweetAlert
        show={allShow}
        warning
        title="Cart amount is 0!"
        // text="SweetAlert in React"
        onConfirm={() => setAllShow(false)}
      ></SweetAlert>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={navigateShop}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            {/* <TopText>Shopping Bag(2)</TopText> */}
            {/* <TopText>Your Wishlist (0)</TopText> */}
          </TopTexts>
          <TopButton type="filled" onClick={redirectToPayment}>CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    {product.size ? (
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                    ) : (
                      <></>
                    )}
                  </Details>
                </ProductDetail>
                <PriceDetailContainer>
                  <PriceDetail>
                    {product.size ? (
                      <ProductAmountContainer>
                        <Add
                          onClick={() => {
                            increaseItem();
                            setProductId(product._id);
                            setProductPrice(product.price * product.quantity);
                            setPrice(product.price);
                            setProductQuantity(product.quantity + 1);
                          }}
                        />
                        <ProductAmount>{product.quantity}</ProductAmount>
                        <Remove
                          onClick={() => {
                            decreaseItem();
                            setProductId(product._id);
                            setProductPrice(product.price * product.quantity);
                            setPrice(product.price);
                            setProductQuantity(product.quantity - 1);
                          }}
                        />
                      </ProductAmountContainer>
                    ) : (
                      <></>
                    )}

                    <ProductPrice>
                      $ {product.price * product.quantity}
                    </ProductPrice>
                  </PriceDetail>
                  <PriceDetail>
                    {/* <div>Delete</div> */}
                    {/* <svg data-testid="DeleteForeverIcon"></svg> */}
                    <DeleteForeverIcon
                      sx={{ fontSize: 35, color: "red" }}
                      onClick={() => {
                        removeItem();
                        setProductId(product._id);
                        setProductPrice(product.price * product.quantity);
                        setPrice(product.price);
                      }}
                    />
                  </PriceDetail>
                </PriceDetailContainer>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            {/* <StripeCheckout
              name="MindFulness"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout> */}
            <Button onClick={redirectToPayment}>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
