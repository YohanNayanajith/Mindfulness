import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/userSlice";
import { setRandomNumber } from '../redux/randomRedux';
import SweetAlert from "react-bootstrap-sweetalert";
// import { useNavigate } from "react-router";
import styled from "styled-components";
import { mobile } from "../responsive";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://res.cloudinary.com/midefulness/image/upload/v1657441688/samples/bike.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 50%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  color: black;
`;

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const isFetching = useSelector((state) => state.user.currentUser);
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState([]);

  const [allErrorShow, setAllErrorShow] = useState(false);
  const dispatch = useDispatch();
  const form = useRef();
  const [show, setShow] = useState(false);
  // const [randomNumber, setRandomNumber] = useState(0);
  const navigation  = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    const checkEmail = async () => {
      try {
        let response = await fetch(
          "http://localhost:5000/api/v1/user/email",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // token: token,
            },
            body: JSON.stringify({
              email: email,
            }),
          }
        );
        let json = await response.json();
        // console.log(json);
        setData(json[0]);
        setUserId(json[0]._id);
        sendEmail(json[0]);
        dispatch(loginSuccess(json[0]));
        // checkLogin(json[0]._id);
      } catch (error) {
        setAllErrorShow(true);
      }
    };
    checkEmail();
  };

  //   updatePassword
  const sendEmail = (userData) => {
    let RandomNumber = Math.floor(Math.random() * 10000) + 1;
    var templateParams = {
      user_name: userData.username,
      user_email: userData.email,
      message: "Verification code is " + RandomNumber,
    };

    // console.log(templateParams);

    emailjs
      .send(
        "service_m6aluv6",
        "template_sb99nip",
        templateParams,
        "Q_-lY5fRb6PO6d6BG"
      )
      .then(
        (result) => {
          // console.log(result.text);
          setShow(true);
          // e.target.reset();
          // window.location.href = "http://localhost:3000/updatePassword";
          dispatch(setRandomNumber(RandomNumber));
          navigation("/validation",{"RandomNumber":RandomNumber});
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <Container>
      <SweetAlert
        show={show}
        success
        title="Email Sent!"
        onConfirm={() => setShow(false)}
      ></SweetAlert>
      <Wrapper>
        <Title>Forget Password</Title>
        <Form onSubmit={handleClick} ref={form}>
          <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button>Send Email</Button>
        </Form>
      </Wrapper>

      <SweetAlert
        show={allErrorShow}
        danger
        title="Email Sent Unsuccessfully!"
        // text="SweetAlert in React"
        onConfirm={() => setAllErrorShow(false)}
      ></SweetAlert>
    </Container>
  );
};

export default ForgetPassword;
