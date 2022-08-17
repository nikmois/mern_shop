import React, { useState } from 'react'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import NavbarCommon from '../components/NavbarCommon'
import Sidebar from '../components/Sidebar'
import styled from 'styled-components'
import {motion} from 'framer-motion/dist/framer-motion';


const Container = styled.div`

`;

const TermsAndConditions = () => {
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
    <Container>
        <Announcement />
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <NavbarCommon toggle={toggle} scrolled={scrolled} />
        <p style={{margin: "5rem", fontSize: "2rem"}}>TULEB HILJEM</p>
        <Footer />
    </Container>
    </motion.div>
  )
}

export default TermsAndConditions