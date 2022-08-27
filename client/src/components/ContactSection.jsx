import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url("https://res.cloudinary.com/midefulness/image/upload/v1657441688/samples/bike.jpg")
      center;
  background-size: cover;
  background-attachment: fixed;
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
  margin-top:15px;
`;

const ContactSection = () => {
  return (
    <Container>
      <Wrapper>
        <Title>CONTACT US</Title>
        <Form>
          <Input placeholder="name" />
          <Input placeholder="Email" />
          <Input placeholder="contact number" />
          <Input placeholder="address" />
          <Input placeholder="subject" />
          <Input placeholder="message" />
          <Button>Submit</Button>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default ContactSection