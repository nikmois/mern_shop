import React from 'react'
import styled from 'styled-components'
import {FaTimes} from 'react-icons/fa';
import { Link as LinkR } from 'react-router-dom';
import {SiFacebook} from 'react-icons/si';
import insta from "../images/insta.svg";
import wapp from "../images/whatsapp.svg";
import bg from "../images/menubg.jpg";
import { useSelector } from 'react-redux';
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineHeart, AiOutlinePhone } from "react-icons/ai";

const SidebarContainer = styled.aside`
    position: fixed;
    z-index: 99999999;
    width: 100%;
    height: 100%;
    background: linear-gradient(#ffecdaeb, #ffe2cbd2), url(${props=>props.bgImage});
    display: grid;
    align-items: center;
    left: 0;
    transition: 0.3s ease-in-out;
    opacity: ${({ isOpen }) => (isOpen ? '100%' : '0')};
    top: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
`;

const CloseIcon = styled(FaTimes)`
    color: #f3ad5e;
`;

const Icon = styled.div`
    position: absolute;
    top: 1.2rem;
    right: 1.5rem;
    background: transparent;
    font-size: 2rem;
    cursor: pointer;
    outline: none;
`;

export const SidebarWrapper = styled.div`
    color: #ffbd66;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const SidebarMenu = styled.ul`
    display: grid;
    width: 50%;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 80px);
    text-align: center;
    padding: 0;

`;

const SidebarLink = styled(LinkR)`
    display: flex;
    align-items: center;
    justify-content: start;
    font-size: 1.5rem;
    text-decoration: none;
    list-style: none;
    transition: 0.2s ease-in-out;
    text-decoration: none;
    color: #faa433;
    cursor: pointer;
    font-weight: 600;

    &:hover{
        color: #ff912b;
        transition: 0.2s ease-in-out;
    }
`;

const SideBtnWrap = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin: 1rem 0;
gap: 0.7rem;
`;

const LoginRoute = styled.a`
    border-radius: 50px;
    background-color: #e2921a;
    white-space: nowrap;
    padding: 10px 42px;
    color: white;
    font-size: 1.3rem;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover{
        transition: all 0.2s ease-in-out;
        background-color: #e2921a;
        color: white;
        transform: scale(1.05);
    }
`;

const LoginR = styled(LinkR)`
    border-radius: 50px;
    background-color: #e2921a;
    white-space: nowrap;
    padding: 10px 42px;
    color: white;
    font-size: 1.3rem;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover{
        transition: all 0.2s ease-in-out;
        background-color: #e2921a;
        color: white;
        transform: scale(1.05);
    }
`;

const RegisterRoute = styled(LinkR)`
    border-radius: 50px;
    background-color: transparent;
    white-space: nowrap;
    padding: 9px 35px;
    color: #e2921a;
    font-size: 1.3rem;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    border: solid 3px #e2921a;

    &:hover{
        transition: all 0.2s ease-in-out;
        background-color: #ffffff;
        color: #e2921a;
        transform: scale(1.05);
    }
`;

const SocialsContainer = styled.div`
display: flex;
justify-content: center;
padding: 15px 0;
`;

const SocialsFB = styled.a`
color: #0f0d69;
padding: 0 10px;
font-size: 2rem;
`;
const SocialsINST = styled.a`
padding: 0 10px;
font-size: 2rem;
text-decoration: none;
`;
const Instagram = styled.img`
width: 2rem;
`;



const Sidebar = ({isOpen, toggle}) => {

    const user = useSelector(state=>state.user.currentUser);

    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle} bgImage={bg}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to="/">
                    <AiOutlineHome style={{marginRight: "5px"}}/>
                        KODU
                    </SidebarLink>
                    <SidebarLink to="/shop">
                        <AiOutlineShoppingCart style={{marginRight: "5px"}} />
                        POOD
                    </SidebarLink>
                    <SidebarLink to="/about">
                        <AiOutlineHeart style={{marginRight: "5px"}} />
                        MEIST
                    </SidebarLink>
                    <SidebarLink to="/contact">
                    
                    <AiOutlinePhone style={{marginRight: "5px"}} />
                        KONTAKTID
                    </SidebarLink>
                </SidebarMenu>
                {!user ?
                <SideBtnWrap>
                    <LoginR to="/signin">LOGI SISSE</LoginR>
                    <RegisterRoute to="/register">LOO KONTO</RegisterRoute>
                </SideBtnWrap>
                :
                <SideBtnWrap>
                    <LoginRoute href={'/cabinet/' + user._id}>MINU KONTO</LoginRoute>
                </SideBtnWrap>
                }   
                <SocialsContainer>
                <SocialsINST href="https://www.instagram.com/babypingviin/?fbclid=IwAR2rFcMaofIwjZYlZGcOn-Py6FYLiX1Sha-Avzwkrol6xVXQ2HXd1xfxdO0">
                <Instagram src={insta} alt="instagramm"/>
                </SocialsINST>
                <SocialsFB href="https://www.facebook.com/babypingviin/">
                <SiFacebook />
                </SocialsFB>
                <SocialsINST href="https://api.whatsapp.com/send?phone=37253737427&fbclid=IwAR1_XeXAzY51-CENjvLctkD-IG6swb2Z-t-Uswu_DjUK3EudA45GhFbU9C4">
                <Instagram src={wapp} alt="whatsapp"/>
                </SocialsINST>
                </SocialsContainer>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar
