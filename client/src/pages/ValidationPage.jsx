import { useState, useRef } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router";
import {useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setRandomNumber } from '../redux/randomRedux';

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

const ValidationPage = () => {
  const [randomNumber, setRandomNumber] = useState("");
  const [allErrorShow, setAllErrorShow] = useState(false);
  const form = useRef();
  const navigate  = useNavigate();
  const randomValue = useSelector((state) => state.random.randomNumber);
//   console.log(randomValue);

  const handleClick = (e) => {
    e.preventDefault();
    if(randomValue == randomNumber){
        navigate("/updatePassword");
    }else {
        setAllErrorShow(true);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Verification</Title>
        <Form onSubmit={handleClick} ref={form}>
          <Input
            placeholder="Verification code"
            onChange={(e) => setRandomNumber(e.target.value)}
            required
          />

          <Button>Submit</Button>
        </Form>
      </Wrapper>

      <SweetAlert
        show={allErrorShow}
        danger
        title="Verification Code Invalid!"
        // text="SweetAlert in React"
        onConfirm={() => setAllErrorShow(false)}
      ></SweetAlert>
    </Container>
  );
};

export default ValidationPage;
