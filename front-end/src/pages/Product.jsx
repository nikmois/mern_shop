import React, {useEffect, useState} from "react";
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components"
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import NavbarCommon from "../components/NavbarCommon";
import Newsletter from "../components/Newsletter";
import Sidebar from "../components/Sidebar";
import MobileCart from "../components/MobileCart";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods"; 
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";


const ContentContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90vw;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
`;

const Wrapper = styled.div`
    padding: 7vh clamp(6px, 2vw, 50px) 10vh clamp(6px, 2vw, 50px);
    display: flex;
    width: 100%;
    @media screen and (max-width: 850px) {
        flex-direction: column;
    }
`;

const ImgContainer = styled.div`
    flex: 1;
`;

const Image = styled.img`
    width: 100%;
    height: 60vh;
    object-fit: cover;
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 0 clamp(6px, 2vw, 50px);
    display: flex;
    flex-direction: column;
    position: relative;
`;

const Title = styled.h1`
    font-weight: 400;
    font-size: clamp(25px, 5vw, 40px);
`;

const Desc = styled.p`
    margin: 20px 0;
    color: #6d6d6d;
    font-size: clamp(17px, 3vw, 20px);
`;

const LongDesc = styled.p`
    margin: 20px 0;
    color: #4e4e4e;
    font-size: clamp(15px, 3vw, 18px);
`;

const PriceContainer = styled.div`
    display: flex;
`;

const Price = styled.div`
    font-weight: 100;
    font-size: clamp(25px, 5vw, 33px);
    color: #c9660a;
`;

const NormalPrice = styled.div`
    font-weight: 100;
    font-size: clamp(25px, 5vw, 33px);
    color: #636363;
    margin-right: 1rem;
    position: relative;
    :before{
        border-bottom: 3px solid red;
        position: absolute;
        content: "";
        width: 110%;
        height: 50%;
        transform: rotate(12deg);
    }
`;

const FilterContainer = styled.div`
    margin: 20px 0 50px 0;
`;

const Filter = styled.div`
    display: flex;
    align-items: center;
`;
const FilterTitle = styled.span`
    font-weight: 200;
    font-size: 20px;
    margin-right: 10px;
`;
const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props=>props.color};
    margin: 0 5px;
    cursor: pointer;
    border: solid grey 1px;
`;

const AddContainer = styled.div`
    display: flex;
    width: 100%;
    
`;
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 600;
    padding-right: 20px;
`;
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid #2cb2e7;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
`;
const Button = styled.button`
    padding: 15px;
    border: 2.5px solid #2cb2e7;
    background-color: #2cb2e7;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;

    &:hover{
        background-color: #2486ad;
    }
`;

const Product = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [scrolled] = useState(true);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product,setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const dispatch = useDispatch();

    useEffect(()=>{
        const getProduct = async ()=>{
            try{
                const res = await publicRequest.get("/products/find/"+id)
                setProduct(res.data);
            }catch {}
        };
        getProduct()
    },[id]);

    const colorCheck = () => {
        if (typeof product.color !== 'undefined' && product.color.length > 0) {
                return(
                    <Filter>
                    <FilterTitle>Color</FilterTitle>
                    { product.color?.map((c) => (
                    <FilterColor color = {c} key = {c} onClick={()=>setColor(c)}/>
                    ))}
                    </Filter>
                )
        } else {
            return;
        }         
    };

    const priceCheck = () => {
        if (product.oldPrice) {
            return(
                <PriceContainer>
                    <NormalPrice>€{product.oldPrice}</NormalPrice>
                    <Price>€{product.price}</Price>
                </PriceContainer>
            )
        } else {
            return(
                <Price>€{product.price}</Price>
            )
        }
    };
    
    const handleQuantity = (type) => {
        if(type === "dec"){
            quantity > 1 && setQuantity(quantity - 1)
        } else {
            setQuantity(quantity + 1)
        }
    }


    const handleClick = () =>{
        dispatch(
            addProduct({ ...product, quantity, color })
            );
    };

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle}/>
            <NavbarCommon toggle={toggle} scrolled={scrolled}/>
            <Announcement />
            <ContentContainer>
            <Wrapper>
                <ImgContainer>
                <Image src={product.img1} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    {priceCheck()}
                    <LongDesc>{product.longDesc}</LongDesc>
                    <FilterContainer>
                    {colorCheck()}
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove style={{cursor: "pointer"}} onClick={()=>handleQuantity("dec")}/>
                            <Amount>{quantity}</Amount>
                            <Add style={{cursor: "pointer"}} onClick={()=>handleQuantity("inc")}/>
                        </AmountContainer>
                        <Button onClick={handleClick}>ADD TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            </ContentContainer>
            <Newsletter /> 
            <Footer />
            <MobileCart />
        </>
      
    )
}

export default Product
