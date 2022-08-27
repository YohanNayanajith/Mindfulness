import React from "react";
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51LQvEKAjPRkUStMYeszYDlKAWx1thKzD8UU92RgiQMeTsHUGozDB2rrN0Nm8nVuCXefDo5t8WCkAcHXkBhoTdFWx00Eg83KkA1"
);

const StripePaymentForm = () => {
//   console.log(props.params);
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripePaymentForm;
