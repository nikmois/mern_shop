import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import NavbarCommon from '../components/NavbarCommon'
import Sidebar from '../components/Sidebar';

const Container = styled.div`

`;

const NoUser = styled.div`
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Message = styled.h1`
color: grey;
`

const Cabinet = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [scrolled] = useState(true);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    const user = useSelector(state=>state.user.currentUser);

  return (
    <Container>
    <Announcement />
    <Sidebar isOpen={isOpen} toggle={toggle}/>
    <NavbarCommon toggle={toggle} scrolled={scrolled}/>
    {user ? 
    <NoUser>
    <Message>Your account</Message>
    </NoUser>
    :
    <NoUser>
      <Message>Please sign in to your account or create one if you still don't have it</Message>
    </NoUser>
    }
    <Footer />
    </Container>
  );
};

export default Cabinet;
