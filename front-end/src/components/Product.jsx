import { SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux";


const Info = styled(Link)`
    display: none;
    z-index: 2;
    @media screen and (min-width: 1150px){
        opacity: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.5s ease;
        cursor: pointer;
    }
    
`;

const Icons = styled.div`
    display: none;
    @media screen and (min-width: 1150px){
        z-index: 2;
        opacity: 0;
        position: absolute;
        top: 50%-50px;
        left: 50%-110px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.5s ease;
        cursor: pointer;
    }
`;

const Container = styled.div`
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
    &:hover ${Info}{
        opacity: 1;
    }
    &:hover ${Icons}{
        opacity: 1;
    }
`;

const ImgContainer = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 260px;
    background-color: #f0f0f0;
    position: relative;
    @media screen and (max-width: 1150px){
        padding-bottom: 3rem;
    }
    
`;

const Buttons = styled.div`
    display: none;
    @media screen and (max-width: 1150px){
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 23%;
        width: 100%;
        left: 0;
    }
`;

const MobileButton1 = styled(Link)`
    width: 40%;
    text-align: center;
    box-sizing: border-box;
    margin-right: 0.5rem;
    z-index: 5;
    font-weight: 600;
    text-decoration: none;
    color: #f18016;
    background-color: transparent;
    border: 3px solid #f18016;
    padding: 0.2rem 0 0 0;
`;

const MobileButton2 = styled.div`
    width: 40%;
    margin-left: 0.5rem;
    text-align: center;
    z-index: 5;
    text-decoration: none;
    color: #f18016;
    background-color: transparent;
    border: 3px solid #f18016;
    padding: 0.2rem 0 0 0;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    min-width: 100%;
    height: 80px;
    line-height: 1.3;
    background-color: #f0f0f0;
`;

const Image = styled.img`
    height: 100%;
    width: 100%;
    z-index: 2;
    object-fit: cover;
`;

const Icon = styled(Link)`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    z-index: 10;
    transition: all 0.5s ease;
    color: black;
    &:hover{
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`;

const Icon1 = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    z-index: 7;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    color: black;
    &:hover{
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`;
const Title = styled.div`
    z-index: 5;
    font-weight: 600;
    font-size: 20px;
`;

const Desc = styled.div`
    z-index: 5;
    font-weight: 500;
    font-size: 18px;
    color: grey;
`;

const Price = styled.div`
    z-index: 5;
    font-weight: 600;
    font-size: clamp(17px, 4vw, 22px);
    color: rgba(224, 98, 13, 0.911);
`;

const PriceContainer = styled.div`
    display: flex;
`;

const NormalPrice = styled.div`
    font-weight: 600;
    font-size: clamp(17px, 4vw, 22px);
    color: #888888;
    margin-right: 1rem;
    position: relative;
    :before{
        border-bottom: 3px solid red;
        position: absolute;
        content: "";
        width: 100%;
        height: 45%;
        transform: rotate(12deg);
    }
`;

const Discount = styled.div`
    border-radius: 50%;
    position: absolute;
    top: 5%;
    right: 5%;
    width: 4rem;
    height: 4rem;
    background-color: #f57106;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 1.1rem;
    transform: rotate(-10deg);
    z-index: 5;
`;

const Stock = styled.div`
    position: absolute;
    bottom: 2%;
    left: 5%;
    color: #b8b8b8;
    text-shadow: 1px 1px#00000090;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    z-index: 5;
    @media screen and (max-width: 1150px){
        bottom: 20%;
    }
`;

const Product = ({item}) => {

    const [quantity] = useState(1);

    const dispatch = useDispatch();
    const [color,setColor] = useState("");
    const [dbColor, setDbColor] = useState([]);
    

    useEffect(() => {
        if(item.color.length === 1){
            setColor(item?.color[0])
        }else if(item.color.length > 1){
            setDbColor(item.color)
        }
    }, [item, color])
    

    const handleClick = async (e) =>{
        e.preventDefault()
        dispatch(addProduct({ ...item, quantity, color, dbColor})) 
    };

    const priceCheck = () => {
        if (item.oldPrice) {
            return(
                <PriceContainer>
                    <NormalPrice>€{item.oldPrice.toFixed(2)}</NormalPrice>
                    <Price>€{item.price.toFixed(2)}</Price>
                </PriceContainer>
            )
        } else {
            return(
                <Price>€{item.price.toFixed(2)}</Price>
            )
        }
    };

    const discountCheck = () => {
        if (item.oldPrice) {
            return(
                <Discount>
                    - {Math.floor(100 - (item.price/item.oldPrice*100))}%
                </Discount>
            )
        }else{
            return
        }
    };

    const stockCheck = () => {
        if (item.inStock < 1) {
            return(
                <Stock>
                    LAOS LÕPPENUD
                </Stock>
            )
        }else{
            return
        }
    };

    

    return (
        <Container>
            <ImgContainer to={`/product/${item._id}`}>
            <Image src={item.img1}/>
            {discountCheck()}
            {stockCheck()}
            </ImgContainer>
            <Buttons>
            <MobileButton1 to={`/product/${item._id}`}><SearchOutlined/></MobileButton1>
            <MobileButton2 onClick={handleClick}><ShoppingCartOutlined/></MobileButton2>
            </Buttons>
            
            <TextContainer>
            <Info to={`/product/${item._id}`}>
            </Info>
            
            <Title>{item.title}</Title>
            <Desc>{item.desc}</Desc>
            {priceCheck()}
            </TextContainer>
            <Icons>
            <Icon1 onClick={handleClick}>
                    <ShoppingCartOutlined/>
            </Icon1>
            <Icon to={`/product/${item._id}`}>
                    <SearchOutlined/>
            </Icon>
            </Icons>
        </Container>
    )
}

export default Product
