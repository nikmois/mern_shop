import { SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { Link as LinkR } from 'react-router-dom';

const Info = styled.div`
    display: none;
    @media screen and (min-width: 1150px){
        opacity: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,0.2);
        z-index: 3;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.5s ease;
        cursor: pointer;
    }
    
`;



const Container = styled.div`
    margin: 0.7rem;
    width: 260px;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: auto;
    &:hover ${Info}{
        opacity: 1;
    }
    @media screen and (max-width: 450px){
        width: 85vw;
    }
`;

const ImgContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 260px;
    background-color: #f0f0f0;
    position: relative;
    @media screen and (max-width: 1150px){
        padding-bottom: 1rem;
    }
    
`;

const Buttons = styled.div`
    display: none;
    @media screen and (max-width: 1150px){
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 6px;
        width: 100%;
        left: 0;
    }
`;

const MobileButton1 = styled(LinkR)`
    width: 40%;
    text-align: center;
    box-sizing: border-box;
    margin-right: 0.5rem;
    text-decoration: none;
    color: #5f5f5f;
    border: 2.5px solid grey;
    padding: 0.2rem 0 0 0;
`;

const MobileButton2 = styled(LinkR)`
    width: 40%;
    margin-left: 0.5rem;
    text-align: center;
    text-decoration: none;
    color: #5f5f5f;
    box-sizing: border-box;
    border: 2.5px solid grey;
    padding: 0.2rem 0 0 0;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    min-width: 100%;
    height: 90px;
    background-color: #ffffff;
`;

const Image = styled.img`
    height: 100%;
    width: 100%;
    z-index: 2;
    object-fit: contain;
`;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
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
    font-size: 20px;
    color: rgba(224, 98, 13, 0.911);
`;

const Product = ({item}) => {
    return (
        <Container>
            <ImgContainer>
            <Image src={item.img}/>
            <Buttons>
            <MobileButton1 to='/'><SearchOutlined/></MobileButton1>
            <MobileButton2 to='/'><ShoppingCartOutlined/></MobileButton2>
            </Buttons>
            </ImgContainer>
            <TextContainer>
            <Info>
                <Icon>
                    <ShoppingCartOutlined/>
                </Icon>
                <Icon>
                    <SearchOutlined/>
                </Icon>
            </Info>
            <Title>{item.title}</Title>
            <Desc>{item.desc}</Desc>
            <Price>{item.price}€</Price>
            </TextContainer>
        </Container>
    )
}

export default Product
