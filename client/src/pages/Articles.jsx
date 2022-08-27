import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";
import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/cartRedux";
import SweetAlert from "react-bootstrap-sweetalert";
import { useNavigate } from "react-router";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 500;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Article = (props) => {
  const id = window.location.pathname.split("/")[2];
  console.log(window.location.href);
  console.log(id);
  const [article, setArticle] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [allFailShow, setAllFailShow] = useState(false);
  const [allShow, setAllShow] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/article/find/" + id);
        setArticle(res.data);
        console.log(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    if (!user) {
      setShow(true);
    } else {
      dispatch(addProduct({ ...article, id, quantity, color, size }));
      // saveCartDetails();
    }
  };

  const saveCartDetails = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/v1/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // token: token,
        },
        body: JSON.stringify({
          userId: user._id,
          productId: id,
          quantity: 1,
          img: article.img,
          title: article.title,
          desc: article.desc,
          price: article.price,
        }),
      });
      let json = await response.json();
      setData(json);
      console.log(json);
      setAllShow(true);
      // setLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  const messageConfirm = () => {
    setShow(false);
    navigate("/login");
  };
  const messageCancel = () => {
    setShow(false);
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <InfoContainer>
          <Title style={{marginBottom:30}}>{article.title}</Title>
        </InfoContainer>
        <ImgContainer style={{marginBottom:30}}>
          {/* <Image src={article.img} /> */}
          <iframe
            width="853"
            height="480"
            src={article.img}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </ImgContainer>
        <InfoContainer>
          <Desc style={{marginBottom:30, fontSize:18, lineHeight:1.5}}>{article.desc}</Desc>
          {/* <Price>{article.price}</Price> */}
          <FilterContainer>
            {/* <Filter>
              <FilterTitle>Color</FilterTitle>
              {article.color?.map((item) => (
                <FilterColor
                  color={item}
                  key={item}
                  onClick={() => setColor(item)}
                />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {article.size?.map((item) => (
                  <FilterSizeOption key={item}>{item}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter> */}
          </FilterContainer>
          <AddContainer>
            {/* <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer> */}
            {/* <Button onClick={handleClick}>Get Service</Button> */}
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
      <SweetAlert
        show={allShow}
        success
        title="Successfully added!"
        onConfirm={() => setAllShow(false)}
      ></SweetAlert>
      {/* <SweetAlert
        show={allFailShow}
        warning
        title="Please select color and size!"
        onConfirm={() => setAllFailShow(false)}
      ></SweetAlert> */}
      <SweetAlert
        show={show}
        warning
        showCancel
        confirmBtnText="Yes"
        confirmBtnBsStyle="danger"
        title="Please,sign in first!"
        onConfirm={messageConfirm}
        onCancel={messageCancel}
        focusCancelBtn
      >
        You will not be able to recover this imaginary file!
      </SweetAlert>
    </Container>
  );
};

export default Article;
