import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import NavbarCommon from '../components/NavbarCommon'
import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
import { BsCartX } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Container = styled.div`

`;

const Wrapper = styled.div`
max-width: 1300px;
margin-left: auto;
margin-right: auto;
`;

const Form = styled.form`
    display: flex;
    @media screen and (max-width: 750px){
    flex-direction: column;
    }
`;


const EmptyWrapper = styled.div`
max-width: 1300px;
margin-left: auto;
margin-right: auto;
`;

const Left = styled.div`
    display: flex;
    flex: 1;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    margin: 3vh 2vw;
`;

const Right = styled.div`
    display: flex;
    background-color: #fde3c0b0;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 3vh 2vw;
    padding: 1rem;
`;

const Billing = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1rem;

`;


const Label = styled.label`
    margin-bottom: 0.2rem;
`;

const Input = styled.input`
    height: 2.5rem;
    width: 100%;
    margin-bottom: 2vh;
`;

const Fullname = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    @media screen and (max-width: 825px){
    flex-direction: column;
    gap: 0rem;
    }
`;

const NameDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    width: 100%;
`;

const Shipping = styled.div`

`;

const Order = styled.div`
    background-color: white;
    display: flex;
    margin-top: 1rem;
    padding: 1rem;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 90%;
    height: 90%;
`;

const Headers = styled.div`
    display: flex;
    width: 100%;
    padding: 1rem;
    align-items: center;
    justify-content: space-between;
`;

const Title = styled.h2`
    font-weight: 500;
    font-size: clamp(1.2rem, 1.3vw, 2.2rem);
    text-align: center;
`;

const SubTitle = styled.h2`
    font-weight: 600;
    font-size: clamp(1.1rem, 0.8vw, 1.8rem);
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
    margin: 3px;
    cursor: pointer;
    border: 3px solid #f08e33;
    background-color: transparent;
    color: #f87800;
    min-width: 130px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
    transition: 0.5s all ease;
    &:hover{
        background-color: #f08e33;
        color: white;
    }
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

const Hr = styled.hr`
    background-color: #dbdbdb;
    border: none;
    height: 1px;
    width: calc(100% - 1rem);
`;

const Prod = styled.p`
    color: #696969;
`;

const Text = styled.p`
    color: #696969;
    margin-top: 2rem;
    padding: 0 2rem;
`;

const Subtotal = styled.p`
    color: #ff9d1d;
    font-weight: 600;
    line-height: 1;
    text-align: justify;  /* For Edge */
    text-align-last: right;
    margin-left: 1rem;
`;

const VatPrice = styled.span`
    color: #ff9d1d;
    font-weight: 600;
`;

const Vat = styled.span`
font-size: 0.8rem;
color: grey;
`;

const Free = styled.span`
    color: green;
`;

const PrivLink = styled.span`
    text-decoration: none;
    color: black;
    font-weight: 600;
    cursor: pointer;
`;

const Checkbox = styled.span`
    align-self: start;
    padding: 0 2rem;
    align-items: center;
    display: flex;
`;

const Checkout = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [scrolled] = useState(true);
    const [checked, setChecked] = useState(false);
    const [endTotal, setEndTotal] = useState(0);
    const [shippingSize, setShippingSize] = useState();
    const [name, setName] = useState();
    const [lastname, setLastname] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [country, setCountry] = useState();
    const cart = useSelector(state=>state.cart);
    const toggle = () => {
        setIsOpen(!isOpen)
    };

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
            return (<Subtotal><Free>free</Free></Subtotal>)
        }else{
            return(<Subtotal>
                {(shippingSize > 0 && shippingSize <= 33) ? <>2,99€</>
                : (shippingSize > 33 && shippingSize <= 66) ? <>3,99€</>
                : (shippingSize > 66) && <>4,89€</>
                }
            </Subtotal>)
        }
    }

    const checkCart = () => {
        if (cart.products.length < 1) {
            return(
                <EmptyWrapper>
                <Top1>
                <TopButton1 to="/products/tableware">CONTINUE SHOPPING</TopButton1>
                </Top1>
                <EmptyContainer>
                <Empty>Your cart is empty</Empty>
                <EmptyIcon>
                <Icon />
                </EmptyIcon>
                </EmptyContainer>
                </EmptyWrapper>
            )
        } else {
            return(
                <Wrapper>
                    <Form>
                    <Left>
                        <Billing>
                            <Title>BILLING DETAILS</Title>
                            <Fullname>
                                <NameDiv>
                            <Label htmlFor="name">First Name <span style={{color: "red"}}>*</span></Label>
                            <Input name="name" type="text" required value={name} onChange={(e)=>setName(e.target.value)}/>
                                </NameDiv>
                                <NameDiv>
                            <Label>Last Name <span style={{color: "red"}}>*</span></Label>
                            <Input type="text" required value={lastname} onChange={(e)=>setLastname(e.target.value)}/>
                                </NameDiv>
                            </Fullname>
                            <Label>e-mail <span style={{color: "red"}}>*</span></Label>
                            <Input type="text" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            <Label>Phone number <span style={{color: "red"}}>*</span></Label>
                            <Input type="text" required value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                            <Label>Country <span style={{color: "red"}}>*</span></Label>
                            <Input type="text" required value={country} onChange={(e)=>setCountry(e.target.value)}/>
                        </Billing>
                        <Shipping>
                            <Title>SHIPPING DETAILS</Title>
                        </Shipping>
                    </Left>
                    <Right>
                    <Title>ORDER DETAILS</Title>
                        <Order>
                            <Headers>
                            <SubTitle>PRODUCT</SubTitle>
                            <SubTitle>SUBTOTAL</SubTitle>
                            </Headers>
                            <Hr />
                            {cart.products?.map((product)=>(
                            <>
                            <Headers>
                                <Prod style={{marginRight: "1rem"}}>{product.title}   <b>x {product.quantity}</b>
                                </Prod>
                                <Prod style={{whiteSpace: "nowrap"}}>{(product.price * product.quantity).toFixed(2)} €</Prod>
                            </Headers>
                            <Hr />
                            </>
                            ))}
                            <Headers>
                                <p>Subtotal</p>
                                <Subtotal>{cart.total.toFixed(2)} €</Subtotal>
                            </Headers>
                            <Hr />
                            <Headers>
                                <p>Shipping</p>
                                {checkShipping()}
                            </Headers>
                            <Hr />
                            <Headers style={{fontSize: "1.2rem"}}>
                                <p>Total</p>
                                <Subtotal>
                                {Number(endTotal).toFixed(2)} €<br />
                                <Vat>
                                    (includes <VatPrice>
                                        {(Number(endTotal)*0.2)?.toFixed(2)}€</VatPrice> VAT)
                                </Vat>
                                </Subtotal>
                            </Headers>
                        </Order>
                        <Text>After placing an order you will receive an email with a pdf file, containing the invoice, to the email you specified in the billing details section.</Text>
                        <Hr style={{width: "calc(100% - 4rem)", margin: "1rem 0"}}/>
                        <Text style={{margin: "0"}}>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <PrivLink onClick={()=> window.open("/privacy-policy", "_blank")}>privacy policy</PrivLink>.</Text>
                        <Hr style={{width: "calc(100% - 4rem)", margin: "1rem 0"}}/>
                        <Checkbox><input name="ckbox" style={{verticalAlign: "middle"}} type="checkbox" onChange={(e)=>setChecked(e.target.checked)}/><label for="ckbox" style={{float:"right", padding: "0 1rem"}}>I have read and agree to the website <PrivLink onClick={()=> window.open("/terms-and-conditions", "_blank")}>terms and conditions </PrivLink><span style={{color: "red"}}>*</span></label></Checkbox>
                    </Right>
                    </Form>
                </Wrapper>
            )
        }
    }

  return (
    <Container>
        <Announcement />
        <Sidebar isOpen={isOpen} toggle={toggle}/>
        <NavbarCommon toggle={toggle} scrolled={scrolled}/>
        {checkCart()}
        <Footer />
    </Container>
  )
}

export default Checkout