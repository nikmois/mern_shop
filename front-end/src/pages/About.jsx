import React, { useState } from 'react'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import NavbarCommon from '../components/NavbarCommon'
import Sidebar from '../components/Sidebar'
import styled from 'styled-components'
import {motion} from 'framer-motion/dist/framer-motion';
import about from "../images/about.jpeg";
import {Helmet} from "react-helmet"

const Container = styled.div`

`;

const Wrapper = styled.div`
    max-width: 1300px;
    margin: 7vh auto 10vh auto;
    display: flex;
    justify-content: space-between;
    min-height: 80vh;
    @media screen and (max-width: 850px){
    flex-direction: column;
    margin: 5vh 1.5rem 10vh 1.5rem;
    align-items: center;
    }
`;

const TextCont = styled.div`
    width: 100%;
    margin: 0 3vw;
    text-align:justify;
    flex: 1;
`;

const Text = styled.p`
    line-height: 2;
`;

const ImgContainer = styled.div`
    margin: 0 3vw;
    flex: 1;
    width: 100%;
`;

const Image = styled.img`
    width: 100%;
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
    <motion.div 
    initial={{opacity: 0}} 
    animate={{opacity: 1}} 
    exit={{opacity: 0, transition: {duration: 0.05}}}> 
    <Helmet>
        <title>Natuke meist</title>
        <meta name="description" content="BabyPingviin on 2021. aastal loodud pereettevõte, mis pakub kvaliteetseid lauanõusid nii beebidele kui ka väikelastele ning arendavaid mänguasju mitmes vanuses mudilastele. 
                Meie tooted sobivad ideaalselt teie lastele, sest need on valitud hoolivate ja armastavate vanemate poolt. Meie visiooniks on pakkuda taskukohase hinnaga laste- ja beebitooteid ning erinevaid tarbeid,
                mis aitaks säästa pere eelarvet jättes seeläbi ruumi tõeliselt suurte unistuste jaoks." />
        <meta name="keywords" content="lastepood e-pood mänguasjad lastenõud beebitooted babypingviin BabyPingviin kvaliteetsed tooted arendavad mänguasjad nõusid" />
    </Helmet>
    <Container>
        <Announcement />
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <NavbarCommon toggle={toggle} scrolled={scrolled} />
        <Wrapper>
            <TextCont>
                <Header>BabyPingviin</Header>
                <Text>BabyPingviin on 2021. aastal loodud pereettevõte, mis pakub kvaliteetseid lauanõusid nii beebidele kui ka väikelastele ning arendavaid mänguasju mitmes vanuses mudilastele. 
                Meie tooted sobivad ideaalselt teie lastele, sest need on valitud hoolivate ja armastavate vanemate poolt. Meie visiooniks on pakkuda taskukohase hinnaga laste- ja beebitooteid ning erinevaid tarbeid,
                mis aitaks säästa pere eelarvet jättes seeläbi ruumi tõeliselt suurte unistuste jaoks.
            </Text>
            </TextCont>
            <ImgContainer><Image src={about} alt="About Baby Pingviin"></Image></ImgContainer>
        </Wrapper>
        <Footer/>
    </Container>
    </motion.div>
  )
}

export default About