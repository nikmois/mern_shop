import React, {useState} from "react";
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components"
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import NavbarCommon from "../components/NavbarCommon";
import Newsletter from "../components/Newsletter";
import Sidebar from "../components/Sidebar";
import cooltoy from "../images/cooltoy.jpeg";
import MobileCart from "../components/MobileCart";


const ContentContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    max-width: 1200px;
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
    padding: 0 50px;
`;

const Title = styled.h1`
    font-weight: 200;
`;

const Desc = styled.p`
    margin: 20px 0;
`;

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`;

const FilterContainer = styled.div`
    margin: 30px 0;
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
`;

const AddContainer = styled.div`
    display: flex;
    align-items: center;
    width: 50%;
    justify-content: space-between;
`;
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 600;
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
    border: 2px solid #2cb2e7;
    background-color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover{
        background-color: #bbe3f3;
    }
`;

const Product = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [scrolled] = useState(true);

    const toggle = () => {
        setIsOpen(!isOpen)
    };


    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle}/>
            <NavbarCommon toggle={toggle} scrolled={scrolled}/>
            <Announcement />
            <ContentContainer>
            <Wrapper>
                <ImgContainer>
                <Image src={cooltoy} />
                </ImgContainer>
                <InfoContainer>
                    <Title>Some cool toy</Title>
                    <Desc>Тут писать подробное описание товара.Тут писать подробное описание товара.
                        Тут писать подробное описание товара.Тут писать подробное описание товара.
                        Тут писать подробное описание товара.Тут писать подробное описание товара.
                        Тут писать подробное описание товара.Тут писать подробное описание товара.
                        Тут писать подробное описание товара.Тут писать подробное описание товара.</Desc>
                    <Price>$ 20</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            <FilterColor color="black"/>
                            <FilterColor color="darkblue"/>
                            <FilterColor color="grey"/>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove/>
                            <Amount>1</Amount>
                            <Add/>
                        </AmountContainer>
                        <Button>ADD TO CART</Button>
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
