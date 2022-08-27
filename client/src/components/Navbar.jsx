import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined, AccountCircle } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  console.log(quantity);
  const openHome = () => {
    navigation("/");
  };
  const clickRegister = () => {
    navigation("/register");
  };
  const clickSignIn = () => {
    navigation("/login");
  };
  const clickLogOut = () => {
    dispatch(logout());
    // alert("Logout");
    navigation("/login");
  };
  const clickProduct = () => {
    navigation("/products");
  };
  const clickContact = () => {
    navigation("/contactus");
  };
  const clickOrderHistory = () => {
    navigation("/orderHistory");
  };
  const clickArticles = () => {
    navigation("/article");
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          {/* <Link to="http://localhost:3000/"> */}
          <Logo onClick={openHome}>Mindfulness Portal</Logo>
          {/* </Link> */}
        </Center>

        <Right>
          <MenuItem onClick={clickProduct}>SHOP</MenuItem>
          <MenuItem onClick={clickArticles}>ARTICLES</MenuItem>
          {user.currentUser ? (
            <MenuItem onClick={clickOrderHistory}>HISTORY</MenuItem>
          ) : (
            <></>
          )}
          <MenuItem onClick={clickContact}>CONTACT US</MenuItem>

          {user.currentUser ? (
            <MenuItem onClick={clickLogOut}>LOGOUT</MenuItem>
          ) : (
            <MenuItem onClick={clickRegister}>REGISTER</MenuItem>
          )}
          {user.currentUser ? (
            // <MenuItem><AccountCircle /></MenuItem>
            <></>
          ) : (
            <MenuItem onClick={clickSignIn}>SIGN IN</MenuItem>
          )}

          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
