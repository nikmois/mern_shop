import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import NavbarCommon from '../components/NavbarCommon'
import Sidebar from '../components/Sidebar';
import {motion} from 'framer-motion/dist/framer-motion';


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