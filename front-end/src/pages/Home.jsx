import React, {useEffect, useState} from 'react';
import Announcement from '../components/Announcement';
import Categories from '../components/Categories';
import Newsletter from '../components/Newsletter';
import Products from '../components/Products';
import { Slider } from '../components/Slider';
import styled from "styled-components";
import Footer from '../components/Footer';
import CategoryTitle from '../components/CategoryTitle';
import PopularProducts from '../components/PopularProducts';
import NavbarCommon from '../components/NavbarCommon';
import Sidebar from '../components/Sidebar';
import MobileCart from '../components/MobileCart';
import TitleAboutUs from '../components/TitleAboutUs';

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
    <div>
      <Announcement/>
      <Sidebar isOpen={isOpen} toggle={toggle}/>
      <NavbarCommon toggle={toggle} scrollNav={scrollNav} scrolled={scrolled}/>
      <Slider scrollNav={scrollNav} scrolled={scrolled} isOpen={isOpen}/>
      <CategoryTitle/>
      <Container><Categories/></Container>
      <TitleAboutUs />
      <PopularProducts/>
      <Container><Products/></Container>
      <Newsletter/>
      <Footer/>
      <MobileCart />
    </div>
  )
}

export default Home
