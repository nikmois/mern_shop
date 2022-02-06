import React, { useState } from 'react';
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import NavbarCommon from '../components/NavbarCommon'
import Sidebar from '../components/Sidebar';

const Container = styled.div`

`;

const Cabinet = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [scrolled] = useState(true);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

  return (
    <Container>
    <Announcement />
    <Sidebar isOpen={isOpen} toggle={toggle}/>
    <NavbarCommon toggle={toggle} scrolled={scrolled}/>
    <Footer />
    </Container>
  );
};

export default Cabinet;
