import { useState } from 'react';
import {FaBars, } from 'react-icons/fa';
import {IoIosArrowDown} from 'react-icons/io';
import {SiInstagram, SiFacebook} from 'react-icons/si';
import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import React from 'react';
import styled from 'styled-components';
import logo from "../images/logo-cropped.svg";
import { Link as LinkR } from 'react-router-dom';
import eng from '../images/eng.svg';
import rus from '../images/rus.svg';
import est from '../images/est.svg';
import { useSelector } from 'react-redux';

const Nav = styled.nav`
    height: 80px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-weight: 600;
    position: sticky;
    align-content: center;
    top: 0;
    z-index: 10;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);


    
    @media screen and (max-height: 650px) and (max-width: 450px) {
        height: 60px;
    }

    @media screen and (max-width: 960px) {
        transition: 0.8s all ease;
        font-size: 0.8rem;
    }

    @media screen and (max-width: 1240px) and (min-width: 1175px) {
        font-size: ${({ scrollNav, scrolled }) => scrollNav && !scrolled ? '0.9rem' : '1rem'};
    }

    @media screen and (max-width: 1175px) and (min-width: 1150px) {
        font-size: ${({ scrollNav, scrolled }) => scrollNav && !scrolled ? '0.8rem' : '1rem'};
    }


    @media screen and (min-width: 1150px) {
        width: ${({ scrollNav, scrolled }) => scrollNav && !scrolled ? '80%' : '100%'};
        position: ${({ scrolled }) => scrolled ? 'sticky' : 'absolute'};
        top: ${({ scrollNav, scrolled }) => scrollNav && !scrolled ? '6%' : '0'};
        left: ${({ scrollNav, scrolled }) => scrollNav && !scrolled ? '10%' : '0'};
        height: ${({ scrollNav, scrolled }) => scrollNav && !scrolled ? '90px' : '80px'};
    }
`;

const NavBarContainer = styled.div`
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 24px;
    max-width: ${({ scrollNav }) => scrollNav ? '1400px' : '1100px'};
    z-index: 1;
    
`;

const Left = styled(LinkR)`
    display: flex;
    justify-content: center;
    align-items: center;



    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0.6rem;
        left: 3rem;
    }
    @media screen and (max-width: 600px) {
        display: block;
        position: absolute;
        top: 0.7rem;
        left: 2rem;
    }
    @media screen and (max-width: 400px) {
        display: block;
        position: absolute;
        top: 0.7rem;
        left: 1rem;
    }
    @media screen and (max-width: 300px) {
        display: block;
        position: absolute;
        top: 0.9rem;
        left: 1rem;
    }
    @media screen and (max-width: 380px) and (max-height: 650px){
        display: block;
        position: absolute;
        top: 0.1rem;
        left: 1rem;
    }
`;

const MobileIcon = styled.div`
display: none;

@media screen and (max-width: 850px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #f3ad5e;
}
@media screen and (max-width: 380px) and (max-height: 650px){
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    cursor: pointer;
    color: #f3ad5e;
    font-size: 1.3rem;
    }
`;

const Flags = styled.div`
    display:none;

    @media screen and (max-width: 850px) {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 20%;
        top: 2.1rem;
        cursor: pointer;
    }
    @media screen and (max-width: 380px) and (max-height: 650px){
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 20%;
        top: 1.4rem;
        cursor: pointer;
    }
`;

const Right = styled.ul`
    display: flex;
    list-style: none;
    text-align: center;
    align-items: center;
    justify-content: flex-end;

    @media screen and (max-width: 850px) {
        display: none;
    }
`;

const NavItem = styled.li`
    height: 76px;
    text-decoration: none;
`;

const NavLinks = styled(LinkR)`
    color: black;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 0.45rem;
    height: 100%;
    cursor: pointer;

    @media screen and (max-width: 992px) {
        padding: 0 0.3rem;
    }

`;

const Socials = styled.a`
    color: black;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 0.4rem;
    height: 100%;
    cursor: pointer;
`;

const HoveredMenu = styled.div`
    
    display: inline-block;
    line-height: 1;
    text-decoration:none;
    cursor: pointer;
    position: relative;
    

    &:after {
    background-color: #f3ad5e;
    left: 50%;
    display: block;
    content: "";
    height: 2px;
    width: 0%;
    position: absolute;
    -webkit-transition: width .3s ease-in-out;
    -moz--transition: width .3s ease-in-out;
    transition: width .3s ease-in-out;
    transform:translateX(-50%);
}
    &:hover:after,
    &:focus:after{
        width: 100%;
        
    }
    &:hover{
        color: #f7a140;
    }
   
`;

const Lang = styled.img`
width: 20px;
height: 100%;
z-index: 10;
margin-left: 3px;
border: 0.3px solid grey;
`;

const Cart = styled.div`
    &:hover{
        color: #f7a140;
        transform: scale(1.1);
    }
`;

const Logo = styled.img`
width: 180px;
cursor: pointer;

@media screen and (max-width: 960px) {
        width: 150px;
    }
;

@media screen and (max-width: 300px) {
        width: 120px;
    }
`;

const Hr = styled.hr`
 width: 1px;
 height: 25px;
 display: inline-block;
 background-color: #d6d6d6;
 border: none;
`;

const DropDownContent = styled.div`
    position: absolute;
    top: 50%;
    left: 5%;
    z-index: 380;
    margin: 15px 0 0;
    background-color: #FFF;
    box-shadow: 0 0 3px rgb(0 0 0 / 15%);
    text-align: left;
    visibility: hidden;
    opacity: 0;
    transition: opacity .3s ease,visibility .3s ease,transform .3s ease;
`;

const DropDownLi = styled.div`
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 0.6rem;
    height: 100%;
    cursor: pointer;
    position: relative;
    &:hover ${DropDownContent} {
    opacity: 1;
    visibility: visible;
  }
 
`;

const DropDownRoute = styled(LinkR)`
    text-decoration: none;
    color: black;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 0.6rem;
    height: 100%;
`;

const DropDownItem = styled.li`
    height: 76px;
    cursor: pointer;
    position: relative;
    
    &:hover ${DropDownContent} {
    opacity: 1;
    visibility: visible;
    }

`;


const SubA = styled.div`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  min-width: 9rem;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const FlagR = styled.div`
  text-align: left;
  padding:0 5px;
  @media screen and (max-width: 850px) and (min-width: 550px) {
    padding: 0 15px;
  }
`;



const SubLink = styled(LinkR)`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  min-width: 13rem;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #f1f1f1;
    color: #f3ad5e;
  }
`;

const ChosenLang = styled.div`
text-decoration: none;
display: flex;
`

const NavbarCommon = ({ toggle, scrollNav, scrolled }) => {

    const languages = [
        {id: 1, name: 'ENGLISH', valueLang: 'en-US', img: eng},
        {id: 2, name: 'РУССКИЙ', valueLang: 'ru-RU', img: rus},
        {id: 3, name: 'EESTI', valueLang: 'et-EE', img: est}
    ]

    const defaultLang = 'en-US';

    let currentLocal = defaultLang;

    const [lan, setLan] = useState('');

    const CurrentLocal = () => {
        if (!localStorage.getItem('Local')) {
            localStorage.setItem('Local', defaultLang);
        } else {
            currentLocal = localStorage.getItem('Local');
        }
    }

    CurrentLocal();

    const handleClick = (e) => {
        currentLocal = lan;
        localStorage.setItem('Local', e.target.id);
    }

    const langCheck = () => {
        for (let i = 0; i < languages.length; i++) {
            if (languages[i].valueLang === currentLocal){
                let a = languages[i].name;
                let image = languages[i].img;
                return(
                <ChosenLang key={languages[i].id}>
                <HoveredMenu>
                    {a}
                </HoveredMenu>  
                <Lang src={image}/> 
                </ChosenLang>  
                )
            }        
        }  
    }

    const langChange = () => {
        const dataCollection = [];
        for (let i = 0; i < languages.length; i++) {
            if (languages[i].valueLang !== currentLocal){
                let a = languages[i].name;
                let image = languages[i].img;
                let alt = languages[i].valueLang;
                dataCollection.push(
                <SubA id={alt} onClick={(e) => {handleClick(e); setLan(alt)}} key={languages[i].id}>
                <HoveredMenu id={alt}>
                {a}
                </HoveredMenu> 
                <Lang src={image} id={alt}/>
                </SubA>
                )
            }
        }
        
        return dataCollection;
    }

    const langChangeShortNav = () => {
        const dataCollection = [];
        for (let i = 0; i < languages.length; i++) {
            if (languages[i].valueLang !== currentLocal){
                let image = languages[i].img;
                let alt = languages[i].valueLang;
                dataCollection.push(
                <FlagR id={alt} onClick={(e) => {handleClick(e); setLan(alt)}} key={languages[i].id}>
                <Lang src={image} id={alt}/>
                </FlagR>
                )
            }
        }
        
        return dataCollection;
    };

    const quantity = useSelector(state=>state.cart.quantity);

    const user = useSelector(state=>state.user.currentUser);

  return (
    <Nav scrollNav={scrollNav} scrolled={scrolled}>
      <NavBarContainer scrollNav={scrollNav}>
          <Left to='/'>
              <Logo src={logo} />
          </Left>
          <Flags>
          {langChangeShortNav()}
          </Flags>
          <MobileIcon onClick={toggle}>
                <FaBars />
          </MobileIcon>
          <Right>
            <NavItem>
                <NavLinks to='/'>
                <HoveredMenu>
                    HOME 
                </HoveredMenu>
                </NavLinks>
            </NavItem>
            <DropDownItem>
                <DropDownRoute to='/shop'>
                <HoveredMenu>
            SHOP
                </HoveredMenu>
                <IoIosArrowDown />
                </DropDownRoute>
                <DropDownContent>
                    <SubLink to="/products/tableware">SILICONE BABY TABLEWARE</SubLink>
                    <SubLink to="/products/educational-toys">EDUCATIONAL TOYS FOR CHILDREN</SubLink>
                    <SubLink to="/products/silicone-toys">SILICONE TOYS FOR CHILDREN</SubLink>
                </DropDownContent>
            </DropDownItem>
            <NavItem>
                <NavLinks to='/about'>
                <HoveredMenu>
            ABOUT US
                </HoveredMenu>  
                </NavLinks>
            </NavItem>
            <NavItem>
                <NavLinks to='/contact'>
                <HoveredMenu>
            CONTACT
                </HoveredMenu>  
                </NavLinks>
            </NavItem>
            <NavItem>
                <DropDownLi>
                {langCheck()}
                <IoIosArrowDown />
                <DropDownContent>
                {langChange()}
                </DropDownContent>
                </DropDownLi>  
            </NavItem>
            <Hr />
            <NavItem>
            <Socials href="https://www.instagram.com/babypingviin/?fbclid=IwAR2rFcMaofIwjZYlZGcOn-Py6FYLiX1Sha-Avzwkrol6xVXQ2HXd1xfxdO0">
                <Cart>
            <SiInstagram />
                </Cart>  
            </Socials>
            </NavItem>
            <NavItem>
                <Socials href="https://www.facebook.com/babypingviin/">
                <Cart>
            <SiFacebook />
                </Cart>  
                </Socials>
            </NavItem>
            <Hr />
            {user 
            ?
            <NavItem>
                <NavLinks to='/cabinet'>
                <HoveredMenu>
            CABINET
                </HoveredMenu>
                </NavLinks>
            </NavItem> 
            :
            <>
            <NavItem>
                <NavLinks to='/register'>
                <HoveredMenu>
            REGISTER
                </HoveredMenu>
                </NavLinks>
            </NavItem>
            <NavItem>
                <NavLinks to='/signIn'>
                <HoveredMenu>
            SIGN IN
              </HoveredMenu>
                </NavLinks>
            
            </NavItem>
            </>
            }
            <Hr />
            <NavItem>
                <NavLinks to='/cart'>
                <Badge badgeContent={quantity} color="primary">
                    <Cart><ShoppingCartOutlined /></Cart>
                </Badge>
                </NavLinks>
            </NavItem>
          </Right>
      </NavBarContainer>
    </Nav>
    
  )
}



export default NavbarCommon
