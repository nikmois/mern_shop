import React, { useState } from 'react'
import styled from "styled-components"
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import CategoryTitle from '../components/CategoryTitle'
import Footer from '../components/Footer'
import MobileCart from '../components/MobileCart'
import NavbarCommon from '../components/NavbarCommon'
import Sidebar from '../components/Sidebar'
import advert from "../images/advert.webp";
import {motion} from 'framer-motion/dist/framer-motion';
import { Alert } from '@material-ui/core'
import { Helmet } from 'react-helmet'


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
            <Helmet>
        <title>BabyPingviin e-pood</title>
        <meta name="description" content="BabyPingviin on 2021. aastal loodud pereettevõte, mis pakub kvaliteetseid lauanõusid nii beebidele kui ka väikelastele ning arendavaid mänguasju mitmes vanuses mudilastele. 
                Meie tooted sobivad ideaalselt teie lastele, sest need on valitud hoolivate ja armastavate vanemate poolt. Meie visiooniks on pakkuda taskukohase hinnaga laste- ja beebitooteid ning erinevaid tarbeid,
                mis aitaks säästa pere eelarvet jättes seeläbi ruumi tõeliselt suurte unistuste jaoks." /> 
        <meta name="keywords" content="lastepood e-pood mänguasjad lastenõud beebitooted babypingviin BabyPingviin kvaliteetsed tooted arendavad mänguasjad nõusid" />
    </Helmet>
            <Sidebar isOpen={isOpen} toggle={toggle}/>
            <NavbarCommon toggle={toggle} scrolled={scrolled}/>
            <Announcement />
            <Alert variant="filled" severity="error">
            Tähelepanu veebileht on testrežiimis. Teie tellimust ei töödelda
            </Alert>
            <ImageContainer>
            <Advertise src={advert} alt="Baby pingviin e-pood"/>
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
