import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
import waves from "../images/waves.svg";
import { Link as LinkR } from 'react-router-dom';
import {motion} from 'framer-motion/dist/framer-motion';

const Container = styled.div`
    width: 100%;
    height: 95vh;
    display: flex;
    position: relative;
    overflow: hidden;
    @media screen and (min-width: 2250px){
        margin-top: ${({ scrollNav, scrolled, isOpen }) => scrollNav && scrolled && !isOpen ? '-3.3%' : '0'};
    }

    @media screen and (min-width: 1150px) and (max-width: 1300px) {
        margin-top: ${({ scrollNav, scrolled, isOpen }) => scrollNav && scrolled && !isOpen ? '-7%' : '0'};
    }
    @media screen and (min-width: 1300px) and (max-width: 1420px) {
        margin-top: ${({ scrollNav, scrolled, isOpen }) => scrollNav && scrolled && !isOpen ? '-6%' : '0'};
    }
    @media screen and (min-width: 1420px) and (max-width: 1600px) {
        margin-top: ${({ scrollNav, scrolled, isOpen }) => scrollNav && scrolled && !isOpen ? '-5.5%' : '0'};
    }
    @media screen and (min-width: 1600px) and (max-width: 1740px) {
        margin-top: ${({ scrollNav, scrolled, isOpen }) => scrollNav && scrolled && !isOpen ? '-5%' : '0'};
    }
    @media screen and (min-width: 1740px) and (max-width: 1890px) {
        margin-top: ${({ scrollNav, scrolled, isOpen }) => scrollNav && scrolled && !isOpen ? '-4.5%' : '0'};
    }
    @media screen and (min-width: 1890px) and (max-width: 2050px) {
        margin-top: ${({ scrollNav, scrolled, isOpen }) => scrollNav && scrolled && !isOpen ? '-4%' : '0'};
    }
    @media screen and (min-width: 2050px) and (max-width: 2250px) {
        margin-top: ${({ scrollNav, scrolled, isOpen }) => scrollNav && scrolled && !isOpen ? '-3.7%' : '0'};
    }
    @media screen and (max-width: 1150px) and (min-height: 400px){
        height: 85vh;
    }
    @media screen and (max-width: 320px){
        height: 95vh;
    }
`;

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${props=>props.slideIndex * -100}vw);
`;


const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${props=> props.direction === "left" && "10px"};
    right: ${props=> props.direction === "right" && "10px"};
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
    z-index: 2;
    @media screen and (max-width:900px){
        width: 5px;
        background-color: transparent;
        opacity: 0.8;
    }
`

const MuiArrowLeft = styled(ArrowLeftIcon)`
    @media screen and (max-width:900px){
        transform: scale(2.5);
        color: white;
    }
    
`;

const MuiArrowRight = styled(ArrowRightIcon)`
    @media screen and (max-width:900px){
        transform: scale(2.5);
        color: white;
    }
    
`;

const Slide = styled.div`
    width: 100vw;
    min-height: 99.5%;
    display: flex;
    align-items: center;
    background-image: url(${props=>props.bgImage});
    background-size: cover;
    background-position: 40%;
`;

const Waves = styled.div`
    background-image: url(${waves});
    position: absolute;
    bottom: 0;
    left: 0;
    width: calc(100% + 1.3px);
    height: 79px;
    overflow: hidden;
    line-height: 0;
    display: block;
`;


const InfoContainer = styled.div`
    margin-left:  clamp(5vw, 9%, 15vw);
    margin-right: 20%;
`;

const Title = styled.h1`
    font-size: clamp(2.3rem, 5vw, 6rem);
    color: white;
    text-shadow: 2px 2px #000000;
`;

const Desc = styled.h3`
    margin: 50px 0px;
    font-size: clamp(1rem, 3vw, 2rem);
    font-weight: 500;
    letter-spacing: 2px;
    color: white;
    text-shadow: 1px 1px #000000;
`;

const Button = styled(LinkR)`
    padding: 10px 40px;
    font-size: 20px;
    background-color: rgba(233, 168, 115, 0.822);
    &:hover{
        background-color: rgba(240, 144, 66, 0.795);
    }
    box-sizing: border-box;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
`;


export const Slider = ({scrolled, scrollNav, isOpen}) => {
    const [slideIndex, setSlideIndex] = useState(0);
    const handleClick = (direction) => {

        if(direction==="left"){
            setSlideIndex(slideIndex > 0 ? slideIndex-1 : 2);

        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex+1 : 0);
        }
    };

    return (
        <Container scrolled={scrolled} scrollNav={scrollNav} isOpen={isOpen}>
            <Arrow direction="left" onClick={()=>handleClick("left")}>
                <MuiArrowLeft/>
            </Arrow>
            <Wrapper slideIndex = {slideIndex}>
                {sliderItems.map((item)=>(
                <Slide bgImage={item.bgImage} key={item.id}>
                    <motion.div initial={{x: -1000}} animate={{x: 0}}>
                    <InfoContainer>
                        <Title>{item.title}</Title>
                        <Desc>{item.desc}</Desc>
                        <Button to='/shop'>SHOP NOW</Button>
                    </InfoContainer>
                    </motion.div>
                    </Slide>
                ))}
            
            </Wrapper>
            <Arrow direction="right" onClick={()=>handleClick("right")}>
                <MuiArrowRight/>
            </Arrow>
            <Waves />
        </Container>
    )

}
