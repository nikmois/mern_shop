import React, { useState } from 'react'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import NavbarCommon from '../components/NavbarCommon'
import Sidebar from '../components/Sidebar'
import styled from 'styled-components'

const Container = styled.div`

`;

const Wrapper = styled.div`
    max-width: 1300px;
    margin: 7vh auto 10vh auto;
    display: flex;
    justify-content: space-between;
    height: 80vh;
    @media screen and (max-width: 850px){
    flex-direction: column;
    margin: 5vh 1.5rem 10vh 1.5rem;
    align-items: center;
    }
`;

const Text = styled.div`
    width: 100%;
    margin: 0 3vw;
    line-height: 2;
    text-align:justify;
`;

const Image = styled.img`
    width: 100%;
    margin: 0 3vw;
`;

const Header = styled.h1`
    margin-bottom: 2rem;
`;


const About = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled] = useState(true);

    const toggle = () => {
        setIsOpen(!isOpen)
    };
  return (
    <Container>
        <Announcement />
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <NavbarCommon toggle={toggle} scrolled={scrolled} />
        <Wrapper>
            <Text>
                <Header>About BabyPingviin</Header>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, 
            discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. 
            The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
            </Text>
            <Image></Image>
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default About