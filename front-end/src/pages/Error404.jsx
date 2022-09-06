import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import NavbarCommon from '../components/NavbarCommon'
import Sidebar from '../components/Sidebar';
import {motion} from 'framer-motion/dist/framer-motion';
import { Helmet } from 'react-helmet';


const Container = styled.div`
`;

const TextContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50vh;
`;

const Text = styled.h1`
    
    text-align: center;
`;

const Error404 = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [scrolled] = useState(true);
    const location = useLocation();

    const toggle = () => {
        setIsOpen(!isOpen)
    };

  return (
    <motion.div 
        initial={{opacity: 0}} 
        animate={{opacity: 1}} 
        exit={{opacity: 0, transition: {duration: 0.05}}}>
            <Helmet>
        <title>Error 404</title>
        <meta name="description" content="BabyPingviin on 2021. aastal loodud pereettevõte, mis pakub kvaliteetseid lauanõusid nii beebidele kui ka väikelastele ning arendavaid mänguasju mitmes vanuses mudilastele. 
                Meie tooted sobivad ideaalselt teie lastele, sest need on valitud hoolivate ja armastavate vanemate poolt. Meie visiooniks on pakkuda taskukohase hinnaga laste- ja beebitooteid ning erinevaid tarbeid,
                mis aitaks säästa pere eelarvet jättes seeläbi ruumi tõeliselt suurte unistuste jaoks." />
        <meta name="keywords" content="lastepood e-pood mänguasjad lastenõud beebitooted babypingviin BabyPingviin kvaliteetsed tooted arendavad mänguasjad nõusid" />
    </Helmet>
    <Container>
    <Announcement />
    <Sidebar isOpen={isOpen} toggle={toggle}/>
    <NavbarCommon toggle={toggle} scrolled={scrolled}/>
    <TextContainer>
    <Text>Vabandust, lehekülg antud aadressiga ei leitud: <br/><i>{location.pathname}</i></Text>
    </TextContainer>
    <Footer />
    </Container>
    </motion.div>
  );
};

export default Error404;