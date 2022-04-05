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
`;

const Image = styled.img`
    width: 100%;
    height: 60vh;
    object-fit: cover;
`;

const InfoContainer = styled.div`
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
    margin: 0 0 20px 0;
    color: #6d6d6d;
    font-size: clamp(16px, 3vw, 18px);
`;

const StockText = styled.p`
    margin: 0 0 20px 0;
    color: #f30000;
    font-size: clamp(16px, 3vw, 18px);
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
    font-size: clamp(22px, 5vw, 30px);
    color: #c9660a;
    margin: 5vw 0 1vw 0;
`;

const NormalPrice = styled.div`
    font-weight: 100;
    font-size: clamp(22px, 5vw, 30px);
    color: #636363;
    margin: 5vw 1rem 1vw 0;
    position: relative;
    :before{
        border-bottom: 3px solid red;
        position: absolute;
        content: "";
        width: 100%;
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
    font-weight: 600;
    font-size: 1rem;
    margin-right: 10px;
`;
const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props=>props.color};
    margin: 0 5px;
    cursor: pointer;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.959);
    transition: all 0.3s ease;
    &:hover{
        transform: scale(1.1);
    }
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

const RemoveBut = styled(Remove)`
    transition: all 0.5s ease;
    &:hover{
        transform: scale(1.2);
    }
`;

const AddBut = styled(Add)`
    transition: all 0.5s ease;
    &:hover{
        transform: scale(1.2);
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
    const [dbColor, setDbColor] = useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
        const getProduct = async ()=>{  
            try{
                const res = await publicRequest.get("/products/find/"+id)
                setProduct(res.data);
                if(product.color.length === 1){
                    setColor(product?.color[0])
                }else if(product.color.length > 1){
                    setDbColor(product.color)
                }
            }catch {}
        };
        getProduct()
    },[id, product.color]);

    const colorCheck = () => {
        if (typeof product.color !== 'undefined' && product.color.length > 0) {
            
            return(
                <Filter>
                <FilterTitle>Choose color:</FilterTitle>
                { product.color?.map((c) => (
                <FilterColor color = {c} key = {c} onClick={()=>setColor(c)}/>
                ))}
                </Filter>
            )        
        } else {
            return
        }        
    };

    const priceCheck = () => {
        if (product.oldPrice) {
            return(
                <PriceContainer>
                    <NormalPrice>{`${product.oldPrice.toFixed(2)} €`}</NormalPrice>
                    <Price>{`${product.price.toFixed(2)} €`}</Price>
                </PriceContainer>
            )
        } else {
            return(
                <Price>{`${product.price?.toFixed(2)} €`}</Price>
            )
        }
    };

    const stockCheck = () => {
        if (product.inStock < 1) {
            return(
                <StockText>
                    This product is out of stock. Estimated shipping time is 10 days.
                </StockText>
            )
        }else{
            return
        }
    }
    
    const handleQuantity = (type) => {
        if(type === "dec"){
            quantity > 1 && setQuantity(quantity - 1)
        } else {
            setQuantity(quantity + 1)
        }
    }


    const handleClick = () =>{
        dispatch(
            addProduct({ ...product, quantity, color, dbColor })
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
                    <Desc><i>{product.desc}</i></Desc>
                    {priceCheck()}
                    <LongDesc>{product.longDesc}</LongDesc>
                    <FilterContainer>
                    {colorCheck()}
                    </FilterContainer>
                    {stockCheck()}
                    <AddContainer>
                        <AmountContainer>
                            <RemoveBut style={{cursor: "pointer"}} onClick={()=>handleQuantity("dec")}/>
                            <Amount>{quantity}</Amount>
                            <AddBut style={{cursor: "pointer"}} onClick={()=>handleQuantity("inc")}/>
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
