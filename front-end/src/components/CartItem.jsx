import styled from "styled-components";
import { Add, Remove } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods"; 
import { useDispatch } from "react-redux";
import { removeFromCart, addOneProduct, removeOneProduct, setColor } from "../redux/cartRedux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Hr = styled.hr`
    background-color: #dbdbdb;
    border: none;
    height: 2px;
    width: 100%;
    margin-bottom: 10px;
`;

const Product = styled.div`
display: flex;
justify-content: space-between;
padding: 0 4vw 10px 4vw;
position: relative;
@media screen and (max-width: 500px){
    flex-direction: column;
    padding: 0 0 10px 0;
}
`;

const ProductDetail = styled.div`
display: flex;
align-items: center;
`;

const Image = styled.img`
width: 100%;
height: 100%;
object-fit: contain; 
`;

const ImageContainer = styled(Link)`
width: 12vh;
height: 9vh;
`;

const Details = styled.div`
padding: 5px 5px 5px 15px;
display: flex;
flex-direction: column;
justify-content: space-between;
`;

const ProductName = styled(Link)`
font-size: 1.1rem;
text-decoration: none;
color: black;
`;

const ProductId = styled.span`
    color: grey;
    font-size: 0.8rem;
`;

const ProductColorSpan = styled.span`
    font-size: 0.8rem;
    color: #eb8a0c;
    font-weight: 200;
    display: flex;
    align-items: center;
`;

const ProductColor = styled.div`
width: 15px;
height: 15px;
border-radius: 50%;
background-color: ${(props) => props.color};
box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.959);
margin-left: 10px;
`;

const PriceDetails = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
flex-direction: column;
@media screen and (max-width: 500px){
    flex-direction: row;
}
`;

const ProductAmountContainer = styled.div`
display: flex;
align-items: center;
margin: 7px;
border: 1px solid grey;
`;

const ProductAmount = styled.div`
font-size: 1.1rem;
margin: 0 3px;
`;

const ProductPrice = styled.div`
font-size: 1.4rem;
font-weight: 200;
color: #f8921c;
`;

const ButtonContainer = styled.div`
height: 100%;
display: flex;
align-items: center;
transition: 0.3s all ease;
cursor: pointer;
    &:hover{
        background-color: #f08e33;
    }
`;

const Select = styled.select`
    padding: 0 5px;
    margin:0 10px 0 10px;
    transition: all 1s ease-out;
    @media screen and (max-width: 500px){
        margin: 0 0 0 10px;
    }
`;

const Option = styled.option`
    transition: all 0.5s ease-in;
    padding: 0.2rem 0;
`;

const RemoveContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    cursor: pointer;
    &:hover{
        color: grey;
    }
    @media screen and (max-width: 500px){
        position: absolute;
        top: 0;
        right: 5%;
    }
`;

const CartItem = ({product}) => {

    const [dbProduct, setDbProduct] = useState({});
    const dispatch = useDispatch();

    useEffect(()=>{
        const getProduct = async ()=>{  
            try{
                const res = await publicRequest.get("/products/find/"+product._id)
                setDbProduct(res.data);
            }catch {}
        };
        getProduct()
    },[product._id]);


    const addQuantity = (product) => {
        dispatch(addOneProduct(product))
    };

    const removeQuantity = (product) => {
        if (product.quantity > 1){
        dispatch(removeOneProduct(product))
        } else {
            return
        }
    };

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product))
    };

    const handleColor = (product,e) => {
        const color = e.target.value
        dispatch(setColor({product,color}))
    }

    const colorCheck = () => {
        if(product.color){
            return(
                <ProductColorSpan><b>Choosed color: </b>
                <ProductColor color={product.color} />
                </ProductColorSpan>
            )
        }else if(!product.color && dbProduct.color && dbProduct.color.length > 1){
            return(
                <ProductColorSpan><b>Please pick a color: </b>
                    <Select name="color" onChange={(e)=>handleColor(product,e)}>
                        <Option defaultValue hidden>Choose color</Option>
                    { dbProduct.color?.map((color, i) =>(
                        <Option key={i}>{color}</Option>
                        ))}
                    </Select>
                    </ProductColorSpan>
            )
        }else{
            return;
        }
    }

  return (
    <>
    <Product>
    <ProductDetail>
        
    <RemoveContainer>
        <DeleteOutlineIcon onClick={()=>handleRemoveFromCart(product)}/>
    </RemoveContainer>
        <ImageContainer to={`/product/${product._id}`}>
        <Image src={product.img1}/>
        </ImageContainer>
        <Details>
            <ProductName  to={`/product/${product._id}`}><b>{product.title}</b></ProductName>
            <ProductId><b>{product.desc}</b></ProductId>
            {colorCheck()}
        </Details>
    </ProductDetail>
    <PriceDetails>
        <ProductAmountContainer>
            <ButtonContainer>
            <Add style={{transform: "scale(0.6)"}} onClick={()=>addQuantity(product)}/>
            </ButtonContainer>
            <ProductAmount>{product.quantity}</ProductAmount>
            <ButtonContainer>
            <Remove style={{transform: "scale(0.6)"}} onClick={()=>removeQuantity(product)}/>
            </ButtonContainer>
        </ProductAmountContainer>
        <ProductPrice>{(product.price * product.quantity).toFixed(2)} €</ProductPrice>
    </PriceDetails>
    </Product>
    <Hr />
    </>
  )
}

export default CartItem
