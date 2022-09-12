import React from 'react'
import styled from "styled-components";
import { Link as LinkR } from 'react-router-dom';
import image from "../images/about1.webp";
import bgPic from "../images/wall.webp";
import {motion} from 'framer-motion/dist/framer-motion';


const Cont = styled.div`
    width: 100%;
    background: linear-gradient(#ffffff92,#ffcdb0a9), url(${props=>props.bgImage});
    background-size: cover;
`;

const Container = styled.div`
    width: 90vw;
    max-width: 1200px;
    margin-top: 5rem;
    margin-bottom: 4vh;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    justify-content: center;
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
        <Cont bgImage={bgPic}>
        <Container>
        
          <Left>
          <Info>
          <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        >
          <Title>BabyPingviin.</Title>
          <Hr />
          <h2>BabyPingviin on 2021. aastal loodud pereettevõte, mis pakub kvaliteetseid lauanõusid nii beebidele kui ka väikelastele ning arendavaid mänguasju mitmes vanuses mudilastele. 
              Meie tooted sobivad ideaalselt teie lastele, sest need on valitud hoolivate ja armastavate vanemate poolt.</h2>
              </motion.div>
          </Info> 
          <Button to='/about'>VAATA ROHKEM</Button> 
          </Left>
          <Right>
          <Image src={image} alt="Liitu uudiskirjadega"/>
          </Right>
          
        </Container>
        </Cont>
    )
}

export default TitleAboutUs
