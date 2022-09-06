import React, {useEffect, useState} from 'react';
import Announcement from '../components/Announcement';
import Categories from '../components/Categories';
import Newsletter from '../components/Newsletter';
import Products from '../components/Products';
import { Slider } from '../components/Slider';
import styled from "styled-components";
import Footer from '../components/Footer';
import CategoryTitle from '../components/CategoryTitle';
import LatestProducts from '../components/LatestProducts';
import NavbarCommon from '../components/NavbarCommon';
import Sidebar from '../components/Sidebar';
import MobileCart from '../components/MobileCart';
import TitleAboutUs from '../components/TitleAboutUs';
import {motion} from 'framer-motion/dist/framer-motion';
import { Helmet } from 'react-helmet';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;



const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollNav, setScrollNav] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const toggle = () => {
      setIsOpen(!isOpen)
  };

  const changeNav = () => {
    if(window.innerWidth >= 2400){
      if(window.scrollY >= 90) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    } else if(window.innerWidth < 2400 && window.innerWidth >= 2000 ) {
      if(window.scrollY >= 80) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    } else if(window.innerWidth < 2000 && window.innerWidth >= 1600 ) {
      if(window.scrollY >= 70) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    } else if(window.innerWidth < 1600) {
      if(window.scrollY >= 65) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    } 
  }

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
    return () => {
      setScrollNav(false)
    }
  }, []);



  return (
    <motion.div 
        initial={{opacity: 0}} 
        animate={{opacity: 1}} 
        exit={{opacity: 0, transition: {duration: 0.05}}}>
          <Helmet>
        <title>BabyPingviin lastepood</title>
        <meta name="description" content="BabyPingviin on 2021. aastal loodud pereettevõte, mis pakub kvaliteetseid lauanõusid nii beebidele kui ka väikelastele ning arendavaid mänguasju mitmes vanuses mudilastele. 
                Meie tooted sobivad ideaalselt teie lastele, sest need on valitud hoolivate ja armastavate vanemate poolt. Meie visiooniks on pakkuda taskukohase hinnaga laste- ja beebitooteid ning erinevaid tarbeid,
                mis aitaks säästa pere eelarvet jättes seeläbi ruumi tõeliselt suurte unistuste jaoks." /> 
        <meta name="keywords" content="lastepood e-pood mänguasjad lastenõud beebitooted babypingviin BabyPingviin kvaliteetsed tooted arendavad mänguasjad nõusid" />
    </Helmet>
    <div>
      <Announcement/>
      <Sidebar isOpen={isOpen} toggle={toggle}/>
      <NavbarCommon toggle={toggle} scrollNav={scrollNav} scrolled={scrolled}/>
      <Slider scrollNav={scrollNav} scrolled={scrolled} isOpen={isOpen}/>
      <CategoryTitle/>
      <Container><Categories/></Container>
      <LatestProducts latest={true}/>
      <Container><Products/></Container>
      <TitleAboutUs />
      <LatestProducts popular={true}/>
      <Container><Products popular={true}/></Container>
      <Newsletter/>
      <Footer/>
      <MobileCart />
    </div>
    </motion.div>
  )
}

export default Home
