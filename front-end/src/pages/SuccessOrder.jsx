import React, { useState } from 'react'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import NavbarCommon from '../components/NavbarCommon'
import Sidebar from '../components/Sidebar'
import styled from 'styled-components'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Alert, Button } from '@material-ui/core'
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion/dist/framer-motion';


const Container = styled.div`

`;

const MessageCont = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto 0 auto;
    width: 100vw;
    height: 60vh;
`;


const Message = styled.div`
    color: #00a700;
    font-size: clamp(2rem, 3vw, 5rem);
    margin: 5vh 0 8vh 0;
    text-align:center ;
`

const Icon = styled(DoneAllIcon)`
    margin-right: 1.5rem;
    transform: scale(2);
`;


const SuccessOrder = () => {

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
        <Alert variant="filled" severity="error">
            Tähelepanu veebileht on testrežiimis. Teie tellimust ei töödelda
        </Alert>
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <NavbarCommon toggle={toggle} scrolled={scrolled} />
        <MessageCont>
            <Message><Icon />Teie tellimus on edukalt vastu võetud</Message>
            <Stack spacing={3} direction="column">
            <Button component={Link} to="/shop" variant="contained" color="primary">Jätka ostlemist</Button>
            <p style={{alignSelf: "center"}}>VÕI</p>
            <Button component={Link} to="/" variant="outlined" color="primary">Mine kodulehele</Button>
            </Stack>
        </MessageCont>
        <Footer />
    </Container>
    </motion.div>
  )
}

export default SuccessOrder