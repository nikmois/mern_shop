import React from 'react'
import styled from "styled-components";
import { Link as LinkR } from 'react-router-dom';
import image from "../images/about.png";

const Container = styled.div`
    width: 90vw;
    max-width: 1200px;
    margin-top: 5rem;
    margin-bottom: 10rem;
    margin-left: auto;
    margin-right: auto;
    background-color: #ffe4d4;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border-radius: 0.5rem;
    outline: 5px dashed #fff;
    outline-offset: -15px;
    @media screen and (max-width: 600px){
        flex-direction: column;
    }
`;

const Left = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const Info = styled.div`
    margin: 0;
    color: white;
    border-radius: 0.2rem;
    padding: clamp(1.5rem, 2vw, 2rem);
    font-size: clamp(0.8rem, 1vw, 1.1rem);
    font-weight: 600;
`;

const Button = styled(LinkR)`
    padding: clamp(8px, 1vw, 10px) clamp(25px, 1vw, 40px);;
    font-size: clamp(15px, 1vw, 20px);
    width: clamp(10rem, 1vw, 12rem);
    align-self: center;
    text-align: center;
    background-color: rgba(233, 168, 115, 0.822);
    transition: all 0.3s ease;
    &:hover{
        background-color: rgba(240, 144, 66, 0.795);
    }
    box-sizing: border-box;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    border: 2px solid white;
    margin: 2rem 2rem 3rem 2rem;
    text-decoration: none;
    @media screen and (max-width: 600px){
        margin: 0 2rem 0.5rem 2rem;
    }
`;

const Title = styled.h1`
    font-weight: 600;
    margin-bottom: 1rem;
    font-size: clamp(2.3rem, 4vw, 5rem);
`;
const Right = styled.div`
    flex: 1;
    border-radius: 5%;
`;
const Image = styled.img`
    width: 100%;
    padding: 4rem 4rem 5rem 4rem;
    @media screen and (max-width: 1000px){
        padding: 1.5rem;
    }
`;

const Hr = styled.hr`
    background-color: #ff792c;
    width: 50%;
    margin-bottom: 1rem;
    border: none;
    height: 2.5px;
`;

const TitleAboutUs = () => {
    return (
        <Container>
          <Left>
          <Info>
          <Title>BabyPingviin.</Title>
          <Hr />
          TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT 
          TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT 
          TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT 
          TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT 
          </Info> 
          <Button to='/about'>SEE MORE</Button> 
          </Left>
          <Right>
          <Image src={image}/>
          </Right>
        </Container>
    )
}

export default TitleAboutUs
