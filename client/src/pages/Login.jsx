import { useState } from "react";
import styled from "styled-components";
import {mobile} from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import { useNavigate } from "react-router";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://res.cloudinary.com/midefulness/image/upload/v1657441705/cld-sample.jpg")
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
  width: 40%;
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
  color:black;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.user.currentUser);
  const isfail = useSelector((state) => state.user.error);
  const navigation  = useNavigate();
  // const globalStateContext = React.createContext(globalState);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
    if(isfail){
      navigation("/login");
    }else {
      console.log(isFetching);
    }
    setUsername("");
    setPassword("");
  };
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleClick}>
          <Input placeholder="username" onChange={(e) => setUsername(e.target.value)} required />
          <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} required />
          <Button disabled={isFetching}>
            LOGIN
          </Button>
          {/* {error && <Error>Something went wrong...</Error>} */}
          <Link href="/forgetPassword">DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link href="/register">CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
