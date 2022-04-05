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

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 20vh;
`;


const Advertise = styled.img`
    width: 90vw;
    display: block;
    margin: 2.5vh 0;
    
    max-width: 1300px; 
    margin-left: auto;
    margin-right: auto;
`;


const Shop = () => {
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
            <Advertise src={advert}/>
            <Container>
                <CategoryTitle/>
                <Categories />
            </Container>
            <Footer />
            <MobileCart />
        </>
    )
}

export default Shop
