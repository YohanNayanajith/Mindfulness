import styled from "styled-components";
import { mobile } from "../responsive";
import { useEffect, useMemo, useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useNavigate } from "react-router";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://res.cloudinary.com/midefulness/image/upload/v1657803949/Home/close-up-book-female-hands_xpkxv3.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const URL = "http://localhost:5000/api/v1/auth/register";

const Register = () => {
  const [formSaveData, setFormSaveData] = useState([]);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [allShow, setAllShow] = useState(false);
  const navigation = useNavigate();

  const userRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
    const formNewData = {
      username: formData.get("username"),
      email: formData.get("email"),
      fullName: formData.get("fullName"),
      phoneNo: formData.get("phoneNo"),
      address: formData.get("address"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      dateOfBirth: formData.get("dateOfBirth"),
      // isAdmin: formData.get("userType"),
      // isActivated: formData.get("userIdentification"),
    };
    setFormSaveData(formNewData);
    setShow(true);
  }

  const createConfirm = async () => {
    if (!(formSaveData.password === formSaveData.confirmPassword)) {
      alert("Please check your confirm password!");
      return;
    }
    setShow(false);
    try {
      let response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // token: token,
        },
        body: JSON.stringify({
          username: formSaveData.username,
          fullName: formSaveData.fullName,
          email: formSaveData.email,
          password: formSaveData.password,
          confirmPassword: formSaveData.confirmPassword,
          phoneNo: formSaveData.phoneNo,
          address: formSaveData.address,
          dateOfBirth: formSaveData.dateOfBirth,
        }),
      });
      let json = await response.json();
      setData(json);
      console.log(json);
      setAllShow(true);
      navigation("/login");
      // setLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  const createCancel = () => {
    setShow(false);
    console.log("Update cancel");
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={userRegister}>
          <Input placeholder="Username" name="username" id="username" required />
          {/* <Input placeholder="last name" required /> */}
          <Input type="text" placeholder="Full Name" name="fullName" id="fullName" required />
          <Input type="text" placeholder="Email" name="email" id="email" required />
          <Input type="password" placeholder="Password" name="password" id="password" required />
          <Input type="password" placeholder="Confirm Password" name="confirmPassword" id="confirmPassword" required />
          <Input type="date" placeholder="Date of Birth" name="dateOfBirth" id="dateOfBirth" required />
          <Input type="text" placeholder="Phone Number" name="phoneNo" id="phoneNo" required />
          <Input type="text" placeholder="Address" name="address" id="address" required />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>CREATE</Button>
        </Form>
      </Wrapper>
      <SweetAlert
        show={allShow}
        success
        title="Successfully added!"
        // text="SweetAlert in React"
        onConfirm={() => setAllShow(false)}
      ></SweetAlert>
      <SweetAlert
          show={show}
          warning
          showCancel
          confirmBtnText="Yes, Create it!"
          confirmBtnBsStyle="danger"
          title="Are you sure?"
          onConfirm={createConfirm}
          onCancel={createCancel}
          focusCancelBtn
        >
          You will not be able to recover this imaginary file!
        </SweetAlert>
    </Container>
  );
};

export default Register;
