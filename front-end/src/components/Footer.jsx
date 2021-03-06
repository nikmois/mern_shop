import { Facebook, Home, Instagram, MailOutline, Phone, WhatsApp } from "@material-ui/icons";
import styled from "styled-components";
import logo from "../images/logo-cropped.svg";
import { Link } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    font-size: 1rem;

    @media screen and (max-width: 1000px) {
        font-size: 0.8rem;
    }

    @media screen and (max-width: 830px) {
        flex-direction: column;

    }
   
`;

const BigContainer = styled.div`
     @media screen and (max-width: 1150px) {
        padding-bottom: 4rem;
    }
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 40px 0 0 40px;
    @media screen and (max-width: 830px) {
        padding: 20px;

    }
`;

const Desc = styled.p`
    margin: 20px 0;
    @media screen and (max-width: 830px) {
        margin: 10px 0;
    }
`;

const SocialContainer = styled.div`
    display: flex;
`;

const SocialIcon = styled.a`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props=>props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    @media screen and (max-width: 830px) {
        width: 35px;
        height: 35px;
    }

`;

const Center = styled.div`
    flex: 1;
    padding: 20px;
    @media screen and (max-width: 830px) {
        padding: 5px 0 0 20px;
    }
`;

const Title = styled.h3`
    margin-bottom: 25px;
    font-size: 1.1rem;
    @media screen and (max-width: 830px) {
        margin-bottom: 15px;
    }
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    margin-right: 1rem;
`;

const ListItem = styled(Link)`
    width: 50%;
    margin-bottom: 10px;
    text-decoration: none;
    color: black;
    

    &:hover{
        transition: 0.2s ease-in-out;
        transform: scale(1.025);
    }
`;

const Right = styled.div`
    flex: 1;
    padding: 20px;
    
`;

const ContactItem = styled.div`
margin-bottom: 20px;
display: flex;
align-items: center;
`;


const ImgContainer = styled(Link)`

`;

const Image = styled.img`
    width: 250px;

    @media screen and (max-width: 1000px) {
        width: 200px;
    }
    @media screen and (max-width: 450px) {
        width: 150px;
    }
`;

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1.5px;
`;

const Text = styled.div`
    text-align: center;
    text-decoration: none;
    padding: 20px 10px 35px 10px;
    font-size: 14px;
    
    @media screen and (max-width: 650px) {
        font-size: 12px;
        padding: 15px 10px 20px 10px;
    }
`;


const SocLink = styled.a`
    text-decoration: none;
    color: black;
    font-weight: 550;

`;

const Footer = () => {
    return (
        <BigContainer>
        <Container>
            <Left>
                <ImgContainer to="/">
                <Image src={logo} />
                </ImgContainer>
                <Desc>???????? ???????? ?????????? ???????????????? ???????????????? ?????????? ?? ????????????????.</Desc>
                <SocialContainer>
                    <SocialIcon href="https://www.facebook.com/babypingviin/" color = "3B5999">
                        <Facebook/>
                    </SocialIcon>
                    <SocialIcon href="https://www.instagram.com/babypingviin/?fbclid=IwAR2rFcMaofIwjZYlZGcOn-Py6FYLiX1Sha-Avzwkrol6xVXQ2HXd1xfxdO0" color = "E4405F">
                        <Instagram/>
                    </SocialIcon>
                    <SocialIcon href="https://api.whatsapp.com/send?phone=37253737427&fbclid=IwAR1_XeXAzY51-CENjvLctkD-IG6swb2Z-t-Uswu_DjUK3EudA45GhFbU9C4" color = "25D366">
                        <WhatsApp />
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem to='/'>HOME</ListItem>
                    <ListItem to='/cart'>CART</ListItem>
                    <ListItem to='/shop'>SHOP</ListItem>
                    <ListItem to="/products/tableware">SILICONE BABY TABLEWARE</ListItem>
                    <ListItem to="/products/educational-toys">EDUCATIONAL TOYS FOR CHILDREN</ListItem>
                    <ListItem to="/products/silicone-toys">SILICONE TOYS FOR CHILDREN</ListItem>
                    <ListItem to='/cabinet'>MY ACCOUNT</ListItem>
                    <ListItem to='/terms-and-conditions'>TERMS AND CONDITIONS</ListItem>
                    <ListItem to='/privacy-policy'>PRIVACY POLICY</ListItem>
                    <ListItem to='/return-policy'>RETURN POLICY</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem><Home style={{marginRight:"10px"}}/>
                Eesti, Narva<br/>
                Arkona Grupp O??<br/>
                Reg nr.: 10854223
                </ContactItem>
                <ContactItem><Phone style={{marginRight:"10px"}}/>
                    +372 53737427
                </ContactItem>
                <ContactItem><MailOutline style={{marginRight:"10px"}}/>
                    babypingviin@gmail.com
                </ContactItem>
                
            </Right>
        </Container>
        <Hr/>
        <Text>
        <SocLink href="babypingviin.ee">BABYPINGVIIN &copy;</SocLink> 2022 CREATED BY <SocLink href="https://github.com/nikmois">NIKMOIS</SocLink><br/>
        Copying or reusing texts, media or any other materials from this website is strictly prohibited.
        </Text>
        </BigContainer>
    )
}

export default Footer
