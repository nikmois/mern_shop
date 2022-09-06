import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import CartItem from '../components/CartItem'
import NavbarCommon from '../components/NavbarCommon'
import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BsCartX } from "react-icons/bs";
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion/dist/framer-motion';
import { Alert } from '@material-ui/core'
import { Helmet } from 'react-helmet'


const Container = styled.div`
    
`;

const Wrapper = styled.div`
padding: 1vw;
max-width: 1300px;
margin-left: auto;
margin-right: auto;
`;

const TextCont = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin-bottom: 30px;
`;

const Title = styled.h1`
font-weight: 300;
font-size: clamp(1.2rem, 1.5vw, 2.5rem);
padding: 10px 20px;
max-width: 300px; 
box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
`;

const Top = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 20px;
@media screen and (max-width: 500px) {
        padding: 10px;
        justify-content: center;
    }
`;

const Top1 = styled.div`
display: flex;
align-items: center;
justify-content: center;
padding: 20px;
@media screen and (max-width: 500px) {
        padding: 10px;
    }
`;

const TopButton1 = styled(Link)`
    font-size: clamp(0.7rem, 1vw, 1.1rem);
    padding: 5px;
    font-weight: 600;
    text-decoration: none;
    margin: 3px;
    border: 3px solid #f08e33;
    background-color: transparent;
    color: #f87800;
    text-align: center;
    min-width: 130px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
    transition: 0.5s all ease;
    &:hover{
        background-color: #f08e33;
        color: white;
    }
`;

const TopButton2 = styled(Link)`
    font-size: clamp(0.7rem, 1vw, 1.1rem);
    padding: 8px;
    font-weight: 600;
    margin: 3px;
    text-decoration: none;
    text-align: center;
    border: none;
    background-color: #f08e33;
    color: white;
    min-width: 130px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
    transition: 0.5s all ease;
    &:hover{
        background-color: transparent;
        color: #f87800;
    }
`;


const Bottom = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
@media screen and (max-width: 900px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

const Info = styled.div`
    width:100%;
    padding: 2rem 2vw;
`;

const Summary = styled.div`
border: 0.5px solid lightgrey;
box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
border-radius: 10px;
padding: 20px;
min-width: 32%;
max-width: 300px;
min-height: 430px;
margin: 20px;
position: relative;
@media screen and (max-width: 900px) {
        min-width: 80vw;
    }
`;

const SummaryTitle = styled.h1`
font-weight: 200;
font-size: clamp(1.2rem, 1.5vw, 2.5rem);
margin: 15px;
`;

const SummaryItem = styled.div`
margin: 30px 15px;
display: flex;
justify-content: space-between;
font-size: 1.1rem;
`;

const EstShipping = styled.div`
margin: 30px 15px 0 15px;
font-size: 1.1rem;
display: flex;
justify-content: space-between;
`;

const TotalItem = styled.div`
margin: 40px 15px 10px 15px;
display: flex;
justify-content: space-between;
font-weight: 600;
font-size: 22px;
width: 100%;
`;

const ShippingMessage = styled.div`
margin: 7px 15px 15px 15px;
font-size: 15px;
display: flex;
color: green;
justify-content: space-between;
font-weight: 500;
`;

const SummaryItemText = styled.span`

`;
const ShippingItemText = styled.span`
`;
const Vat = styled.span`
font-size: 0.8rem;
color: grey;
`;

const SummaryItemPrice = styled.span`
color: #f8921c;
line-height: 1;
text-align: justify;  /* For Edge */
text-align-last: right;
`;

const ShippingItemPrice = styled.span`
color: grey;
`;

const ButtonCont = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    width: 100%;
`;

const Button = styled(Link)`
    width: 80%;
    text-align: center;
    text-decoration: none;
    padding: 10px;
    background-color: #f08e33;
    border: 2px solid #c05d00;
    color: white;
    font-weight: 600;
    transition: 0.4s all ease;
    &:hover{
        background-color: transparent;
        color: #f87800;
    }
`;

const TotalCont = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`;

const EmptyContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 5px dashed lightgrey;
    margin:0 10px;
    width: 95%;
    height: 50vh;
    justify-content: center;
    align-items: center;
    text-shadow: 1px 1px #6e6e6e;
`;

const Empty = styled.h1`
    text-align: center;
    font-weight: 500;
    color: #a5a5a5;
    font-size: clamp(2rem, 3vw, 5rem);
`;

const EmptyIcon = styled.div`
    width: 100%;
    color: #b9b9b9;
    padding-bottom: 40px;
`;

const Icon = styled(BsCartX)`
    width: 100%;
    font-size: 10rem;
`;

const Cart = () => {
    

    const [isOpen, setIsOpen] = useState(false);
    const [scrolled] = useState(true);
    const cart = useSelector(state=>state.cart);
    const [endTotal, setEndTotal] = useState(0);
    const [shippingSize, setShippingSize] = useState();

    const toggle = () => {
        setIsOpen(!isOpen)
    };


    const quantity = useSelector(state=>state.cart.quantity);

    useEffect(() => {
        let shipping = 0;
        cart.products?.map(product=>(
            shipping = shipping + product.shipping*product.quantity
        ))
        setShippingSize(shipping)
        if(cart.total > 35){
            setEndTotal(cart.total)
        }else{
            if(shippingSize > 0 && shippingSize <= 33){
                setEndTotal((Number(cart.total) + 2.99).toFixed(2))
            } else if (33 < shippingSize && shippingSize <= 66){
                setEndTotal((Number(cart.total) + 3.99).toFixed(2))
            } else if (shippingSize>66){
                setEndTotal((Number(cart.total) + 4.89).toFixed(2))
            }
        }
      }, [cart.total, cart.products, shippingSize, endTotal]);

    const checkShipping = () => {
        if (cart.total > 35){
            return(
                <>
                <EstShipping>
                    <ShippingItemText>Arvestatav saatmise hind <br />
                        {(shippingSize > 0 && shippingSize <= 33) ? <b>(S suuruse pakend)</b>
                        : (shippingSize > 33 && shippingSize <= 66) ? <b>(M suuruse pakend)</b>
                        : (shippingSize > 66) && <b>(L suuruse pakend)</b>
                        }
                    </ShippingItemText>
                    {(shippingSize > 0 && shippingSize <= 33) ? <ShippingItemPrice>2,99€</ShippingItemPrice>
                        : (shippingSize > 33 && shippingSize <= 66) ? <ShippingItemPrice>3,99€</ShippingItemPrice>
                        :(shippingSize > 66) && <ShippingItemPrice>4,89€</ShippingItemPrice>
                        }
                </EstShipping>
                <ShippingMessage>
                    <ShippingItemText>Saatmise allahindlus</ShippingItemText>
                    {(shippingSize > 0 && shippingSize <= 33) ? <>- 2,99€</>
                        : (shippingSize > 33 && shippingSize <= 66) ? <>- 3,99€</>
                        : (shippingSize > 66) && <>- 4,89€</>
                    }
                </ShippingMessage>
                </>
            )
        } else {
            return(
                <>
                <EstShipping>
                <ShippingItemText>Arvestatav saatmise hind <br />
                        {(shippingSize > 0 && shippingSize <= 33) ? <b>(S suuruse pakend)</b>
                        : (shippingSize > 33 && shippingSize <= 66) ? <b>(M suuruse pakend)</b>
                        : (shippingSize > 66) && <b>(L suuruse pakend)</b>
                        }
                    </ShippingItemText>
                    {(shippingSize > 0 && shippingSize <= 33) ? <ShippingItemPrice>2,99€</ShippingItemPrice>
                        : (shippingSize > 33 && shippingSize <= 66) ? <ShippingItemPrice>3,99€</ShippingItemPrice>
                        : (shippingSize > 66) && <ShippingItemPrice>4,89€</ShippingItemPrice>
                    }
                </EstShipping>
                <ShippingMessage>
                    <ShippingItemText>Tasuta kohaletoimetamise saamiseks lisage ostukorvi rohkem tooteid vähemalt <b>{(35 - cart.total).toFixed(2)}€</b> väärtuses!</ShippingItemText>
                </ShippingMessage>
                </>
            )
        }
    }

    const checkCart = () => {
        if (cart.products.length < 1) {
            return(
                <Wrapper>
                <Top1>
                <TopButton1 to="/products/tableware">JÄTKA OSTLEMIST</TopButton1>
                </Top1>
                <EmptyContainer>
                <Empty>Teie ostukorv on tühi</Empty>
                <EmptyIcon>
                <Icon />
                </EmptyIcon>
                </EmptyContainer>
                </Wrapper>
            )
        } else {
            return(
            <Wrapper>
            <Top>
                <TopButton1 to="/products/tableware">JÄTKA OSTLEMIST</TopButton1>
                <TopButton2 to="/checkout">JÄTKA BRONEERINGUGA</TopButton2>
            </Top>
            <TextCont>
                <Title>TEIE KORV ({quantity})</Title>
                </TextCont>
            <Bottom>
            <Info>
                    {cart.products?.map((product, i)=>(
                        <CartItem product={product} key={i}/>
                    ))}
            </Info>
                <Summary>
                    <SummaryTitle>OSTUKORVI SUMMAD</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Vahesumma</SummaryItemText>
                        <SummaryItemPrice>{cart.total.toFixed(2)} €</SummaryItemPrice>
                    </SummaryItem>
                    {checkShipping()}
                    <TotalCont>
                    <TotalItem>
                        <SummaryItemText>Kokku</SummaryItemText>
                        <SummaryItemPrice>
                            {Number(endTotal).toFixed(2)} €<br />
                            <Vat>
                                (sisaldab <SummaryItemPrice>
                                    {(Number(endTotal)*0.2)?.toFixed(2)}€</SummaryItemPrice> KM)
                            </Vat>
                        </SummaryItemPrice>
                    </TotalItem>
                    <ButtonCont>
                    <Button to="/checkout">JÄTKA BRONEERINGUGA</Button>
                    </ButtonCont>
                    </TotalCont>
                </Summary>
            </Bottom>
            </Wrapper>
            )
        }
    }


    return (
        <motion.div 
        initial={{opacity: 0}} 
        animate={{opacity: 1}} 
        exit={{opacity: 0, transition: {duration: 0.05}}}>
            <Helmet>
        <title>Teie ostukorv</title>
        <meta name="description" content="BabyPingviin on 2021. aastal loodud pereettevõte, mis pakub kvaliteetseid lauanõusid nii beebidele kui ka väikelastele ning arendavaid mänguasju mitmes vanuses mudilastele. 
                Meie tooted sobivad ideaalselt teie lastele, sest need on valitud hoolivate ja armastavate vanemate poolt. Meie visiooniks on pakkuda taskukohase hinnaga laste- ja beebitooteid ning erinevaid tarbeid,
                mis aitaks säästa pere eelarvet jättes seeläbi ruumi tõeliselt suurte unistuste jaoks." />
        <meta name="keywords" content="lastepood e-pood mänguasjad lastenõud beebitooted babypingviin BabyPingviin kvaliteetsed tooted arendavad mänguasjad nõusid" />
    </Helmet>
        <Container>
            <Announcement />
            <Alert variant="filled" severity="error">
            Tähelepanu veebileht on testrežiimis. Teie tellimust ei töödelda
            </Alert>
            <Sidebar isOpen={isOpen} toggle={toggle}/>
            <NavbarCommon toggle={toggle} scrolled={scrolled}/>
            {checkCart()}
            <Footer />
        </Container>
        </motion.div>
    )
}

export default Cart
