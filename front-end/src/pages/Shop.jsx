import React, { useState } from 'react'
import styled from "styled-components"
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import CategoryTitle from '../components/CategoryTitle'
import Footer from '../components/Footer'
import MobileCart from '../components/MobileCart'
import NavbarCommon from '../components/NavbarCommon'
import Sidebar from '../components/Sidebar'
import advert from "../images/advert.png";
import {motion} from 'framer-motion/dist/framer-motion';
import { Alert } from '@material-ui/core'


const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 20vh;
`;

const ImageContainer = styled.div`
    width: 90vw;
    display: block;
    margin: 2.5vh 0;
    position: relative;
    max-width: 1300px; 
    margin-left: auto;
    margin-right: auto;
`;

const Layer = styled.div`
    position: absolute;
    top: 15%;
    width: 100%;
    height: 70%;
    background-color: #00000072;
    display: flex;
    justify-content: start;
    align-items: center;
`;

const Header = styled.h1`
    color: white;
    font-weight: 700;
    padding: 5%;
    font-size: 3vw;
`;


const Advertise = styled.img`
    width: 100%;
`;


const Shop = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled] = useState(true);


    const toggle = () => {
        setIsOpen(!isOpen)
    };
    return (
        <motion.div 
        initial={{opacity: 0}} 
        animate={{opacity: 1}} 
        exit={{opacity: 0, transition: {duration: 0.05}}}>
            <Sidebar isOpen={isOpen} toggle={toggle}/>
            <NavbarCommon toggle={toggle} scrolled={scrolled}/>
            <Announcement />
            <Alert variant="filled" severity="error">
            Tähelepanu veebileht on testrežiimis. Teie tellimust ei töödelda
            </Alert>
            <ImageContainer>
            <Advertise src={advert}/>
            <Layer>
            <Header>
            Kõrgeima kvaliteediga tooted sinu lapse jaoks
            </Header>
            </Layer>
            </ImageContainer>
            <Container>
                <CategoryTitle/>
                <Categories />
            </Container>
            <Footer />
            <MobileCart />
        </motion.div>
    )
}

export default Shop
