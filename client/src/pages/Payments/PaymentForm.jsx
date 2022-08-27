import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./Payment.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useNavigate } from "react-router-dom";
import { removeProduct, removeAllProduct } from "../../redux/cartRedux";

const stripePromise = loadStripe(
  "pk_test_51LQvEKAjPRkUStMYeszYDlKAWx1thKzD8UU92RgiQMeTsHUGozDB2rrN0Nm8nVuCXefDo5t8WCkAcHXkBhoTdFWx00Eg83KkA1"
);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser._id);
  const [date, setDate] = useState("");
  const [clientSecretPay, setClientSecretPay] = useState("");
  const [allShow, setAllShow] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { confirmPayment, loading } = useConfirmPayment();

  const handleSubmit = (stripe, elements) => async () => {
    const cardElement = elements.getElement(CardElement);
    console.log(cart);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);

      // ... SEND to your API server to process payment intent
      const response = await fetch(
        "http://localhost:5000/api/v1/checkout/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: cart.total*100,
            currency: "usd",
          }),
        }
      );
      console.log(response);
      const { clientSecret, error } = await response.json();
      console.log(clientSecret);
      // console.log(error);
      setClientSecretPay(clientSecret);
      createPaymentDetails(clientSecret);
      createOrderDetails();
    }
  };

  const createPaymentDetails = async (clientSecret) => {
    var today = new Date();

    var dateNew =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    setDate(dateNew);
    try {
      let response = await fetch(`http://localhost:5000/api/v1/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // token: token,
        },
        body: JSON.stringify({
          clientSecret: clientSecret,
          createdDate: dateNew,
          currency: "USD",
          UserID: user,
          amount: cart.total,
        }),
      });
      let json = await response.json();
      console.log(json);
      // alert("Update");
    } catch (error) {
      console.log(error);
      // alert(error);
    }
  };

  const createOrderDetails = async () => {
    cart.products.map(async (item) => {
      try {
        let response = await fetch(`http://localhost:5000/api/v1/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // token: token,
          },
          body: JSON.stringify({
            userId: user,
            productId: item._id,
            quantity: item.quantity,
            title: item.title,
            desc: item.desc,
            img: item.img,
            price: item.price*item.quantity,
            isPay: true,
          }),
        });
        let json = await response.json();
        console.log(json);
        // alert("Update");
        dispatch(removeAllProduct());
        // setAllShow(true);
      } catch (error) {
        setShow(true);
        // alert(error);
      }
    });
    navigate("/");
  };

  return (
    <div className="paymentContainer">
      <SweetAlert
        show={allShow}
        success
        title="Paid Successfully!"
        onConfirm={() => setAllShow(false)}
      ></SweetAlert>
      <SweetAlert
        show={show}
        danger
        title="Paid Unsuccess!"
        onConfirm={() => setShow(false)}
      ></SweetAlert>
      <h1 className="paymentHeader">Payment</h1>
      <div className="subPaymentContainer">
        <CardElement />
      </div>
      <button
        className="paymentButton"
        onClick={handleSubmit(stripe, elements)}
      >
        Pay
      </button>
    </div>
  );
};

export default PaymentForm;
