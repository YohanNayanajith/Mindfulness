import React from "react";
import { MdPlace } from "react-icons/md";
import styled from "styled-components";
import { LocationOn , Mail, Phone } from "@material-ui/icons";

const BigContainer = styled.div`
  display: flex;

  justify-content: space-evenly;
  margin:40px;
  
`;
const NameBox = styled.div`
  text-align: center;
  border: 2px solid #F5F5F5;
  padding:20px;
  width:300px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius:10px;
`;
const BoxIcon = styled.div`
  padding-top:20px;
`;


const BoxHeader = styled.div`
  font-size:24px;
  font-weight:bold;
  padding:20px;
`
const BoxText = styled.div`
  font-size:18px;
  padding:20px;
`

export default function ContactInfoItem({
  icon = <MdPlace />,
  text = "I need text ",
}) {
  return (
    <BigContainer>
      <NameBox>
        <BoxIcon><Phone style={{ fontSize: 64,color:"teal" }}/></BoxIcon>
        <BoxHeader>Our Phone</BoxHeader>
        <BoxText>Office-(+94)766269150</BoxText>
      </NameBox>

      <NameBox>
        <BoxIcon><Mail style={{ fontSize: 64,color:"teal" }}/></BoxIcon>
        <BoxHeader>Our Mail Box</BoxHeader>
        <BoxText>yohannayanajith40@gmail.com</BoxText>
      </NameBox>
      <NameBox>
        <BoxIcon><LocationOn style={{ fontSize: 64,color:"teal" }}/></BoxIcon>
        <BoxHeader>Our Location</BoxHeader>
        <BoxText>
          <div style={{padding:"10px"}}>(Office)No. 27/A/2,</div>
          <div>Ranasinghe Road,Ja-Ela,Sri Lanka</div>
        </BoxText>
      </NameBox>
    </BigContainer>
  );
}
