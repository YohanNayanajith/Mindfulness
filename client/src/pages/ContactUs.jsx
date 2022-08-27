import Slider from "../components/Slider";
import Announcement from "../components/Announcement";
import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import ContactSection from "../components/ContactSection";
import styled from "styled-components";
import Map from "../components/Map";
import ContactInfoItem from "../components/ContactInfoItem";

const Title = styled.h1`
  margin: 20px;
`;
const Container = styled.div`
  width: 100%;
  height: 80vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://res.cloudinary.com/midefulness/image/upload/v1657829965/samples/businessman-touching-virtual-screen_rguu3a.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 70px;
  font-weight:bold;
`;
const middleText = styled.div`
    top:0;
    bottom:0
    margin:auto;
    text-align:center;
`;
const headerContainer = styled.h1`
  
`;

const ContactUs = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Container>
        <middleText><headerContainer>Contact Us</headerContainer></middleText>
      </Container>

      {/* <Slider /> */}
      {/* <Title>Touch With Us</Title> */}
      <ContactInfoItem />
      <ContactSection />
      <Map />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ContactUs;
