import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import NavbarCommon from '../components/NavbarCommon'
import Input from '../components/Input'
import Sidebar from '../components/Sidebar';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useForm, Controller } from "react-hook-form";
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useEffect, useState } from 'react';
import { BsCartX } from "react-icons/bs";
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { TextField } from '@material-ui/core'


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
    flex: 1;
    height: 100%;
    background-color: #fde3c0b0;
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
    margin: 0.6rem;
    line-height: 1;
`;

// const Input = styled.input`
//     height: 2.5rem;
//     width: 100%;
//     margin-bottom: 2vh;
// `;

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
    width: 100%;
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

const Ship = styled.div`
    width: 100%;
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    padding: 1rem;
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

const Automats = styled.div`
    display: flex;
    flex-direction: column;
`;

const Button = styled.button`
    width: 80%;
    text-align: center;
    margin: 2rem 0 1rem 0;
    text-decoration: none;
    padding: 10px;
    background-color: #f08e33;
    border: 2px solid #c05d00;
    color: white;
    font-weight: 600;
    transition: 0.4s all ease;
    cursor: pointer;
    &:hover{
        background-color: transparent;
        color: #f87800;
    }
`;

const normalizePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value)
    if (!phoneNumber) {
        return value
    }

    return (
        phoneNumber.formatInternational()
    )
}

const Checkout = () => {

    const schema = yup.object().shape({
        firstName: yup.string().matches(/^([^0-9]*)$/, "First name should not contain numbers").required("First name is a required field"),
        lastName: yup.string().matches(/^([^0-9]*)$/, "Last name should not contain numbers").required("Last name is a required field"),
        email: yup.string().email("Email is invalid").required("Email is a required field"),
        message: yup.string(),
        phone: yup.string().required("Phone is a required field"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
        defaultValues: {
            checkbox: false,
        }
    })
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled] = useState(true);
    const [endTotal, setEndTotal] = useState(0);
    const [post, setPost] = useState("dpd");
    const [shippingSize, setShippingSize] = useState();
    const cart = useSelector(state => state.cart);
    const toggle = () => {
        setIsOpen(!isOpen)
    };

    useEffect(() => {
        let shipping = 0;
        cart.products?.map(product => (
            shipping = shipping + product.shipping * product.quantity
        ))
        setShippingSize(shipping)
        if (cart.total > 35) {
            setEndTotal(cart.total)
        } else {
            if (shippingSize > 0 && shippingSize <= 33) {
                setEndTotal((Number(cart.total) + 2.99).toFixed(2))
            } else if (33 < shippingSize && shippingSize <= 66) {
                setEndTotal((Number(cart.total) + 3.99).toFixed(2))
            } else if (shippingSize > 66) {
                setEndTotal((Number(cart.total) + 4.89).toFixed(2))
            }
        }
    }, [cart.total, cart.products, shippingSize, endTotal]);


    const checkShipping = () => {
        if (cart.total > 35) {
            return (<Subtotal><Free>free</Free></Subtotal>)
        } else {
            return (<Subtotal>
                {(shippingSize > 0 && shippingSize <= 33) ? <>2,99€</>
                    : (shippingSize > 33 && shippingSize <= 66) ? <>3,99€</>
                        : (shippingSize > 66) && <>4,89€</>
                }
            </Subtotal>)
        }
    }

    const onSubmit = (data) => {
        console.log(data)
    }


    const [country, setCountry] = useState('');

    const handleChange = (event) => {
        setCountry(event.target.value);
    };

    const checkCart = () => {
        if (cart.products.length < 1) {
            return (
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
            return (
                <Wrapper>
                    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                        <Left>
                            <Billing>
                                <Title>BILLING DETAILS</Title>
                                <Input {...register("firstName")} id="firstName" type="text" label="First Name" name="firstName" required error={!!errors.firstName} helperText={errors?.firstName?.message} />
                                {/* <Label htmlFor="name">First Name <span style={{color: "red"}}>*</span></Label>
                            <Input name="name" type="text" required value={name} onChange={(e)=>setName(e.target.value)}/> */}
                                <Input {...register("lastName")} id="lastName" type="text" label="Last Name" name="lastName" required error={!!errors.lastName} helperText={errors?.lastName?.message} />
                                {/* <Label htmlFor="lastname">Last Name <span style={{color: "red"}}>*</span></Label>
                            <Input type="text" name="lastname" required value={lastname} onChange={(e)=>setLastname(e.target.value)}/> */}
                                <Input {...register("email")} id="email" type="email" label="E-mail" name="email" required error={!!errors.email} helperText={errors?.email?.message} />
                                <Input {...register("phone")}
                                    id="phone"
                                    type="tel"
                                    label="Phone number"
                                    name="phone"
                                    onChange={(event) => { event.target.value = normalizePhoneNumber(event.target.value) }}
                                    required
                                    error={!!errors.phone}
                                    helperText={errors?.phone?.message}
                                />
                                <FormControl style={{ margin: "1rem 0 0.6rem 0" }}>
                                    <InputLabel id="demo-simple-select-helper-label">Country</InputLabel>
                                    <Select
                                        {...register("country")}
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select"
                                        value={country}
                                        name="country"
                                        label="Country"
                                        required
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="Estonia">Estonia</MenuItem>
                                        <MenuItem value="Latvia">Latvia</MenuItem>
                                        <MenuItem value="Finland">Finland</MenuItem>
                                        <MenuItem value="Lithuania">Lithuania</MenuItem>
                                    </Select>
                                </FormControl>
                                <Input {...register("city")} id="city" type="text" label="City (optional)" name="city" />
                                <Input {...register("street")} id="street" type="text" label="Street address (optional)" name="street" />
                                <Input {...register("postcode")} id="postcode" type="text" label="ZIP / Postcode (optional)" name="postcode" />
                                <TextField
                                {...register("message")}
                                id="outlined-multiline-static"
                                label="Some additional information about your order (optional)"
                                name="message"
                                multiline
                                minRows={5}
                                variant="outlined"
                                style={{margin: "1rem 0"}}
                                />
                                {/* <Label htmlFor="email">e-mail <span style={{color: "red"}}>*</span></Label>
                            <Input type="email" name="email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            <Label htmlFor="phone">Phone number <span style={{color: "red"}}>*</span></Label>
                            <Input type="tel" name="phone" required value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                            <Label htmlFor="country">Country <span style={{color: "red"}}>*</span></Label>
                            <Input type="text" name="country" required value={country} onChange={(e)=>setCountry(e.target.value)}/> */}
                            </Billing>
                            <Shipping>
                                <Title>SHIPPING DETAILS</Title>
                                <Ship>
                                    <p>Select a maintenance drone:</p>
                                    <Automats onChange={(event) => { setPost(event.target.value) }}>
                                        <Label>
                                            <input
                                                type="radio"
                                                id="dpd"
                                                name="post"
                                                value="dpd"
                                                defaultChecked
                                                style={{ marginRight: "1rem" }}
                                            />
                                            <label htmlFor="dpd">DPD</label>
                                        </Label>
                                        <Label>
                                            <input
                                                type="radio"
                                                id="smartpost"
                                                name="post"
                                                value="smartpost"
                                                style={{ marginRight: "1rem" }}
                                            />
                                            <label htmlFor="smartpost">SmartPost</label>
                                        </Label>
                                        <Label>
                                            <input type="radio"
                                                id="omniva"
                                                name="post"
                                                value="omniva"
                                                style={{ marginRight: "1rem" }}
                                            />
                                            <label htmlFor="omniva">Omniva</label>
                                        </Label>
                                    </Automats>
                                    {post === "dpd" ? <p>some dpd</p> : post === "omniva" ? <p>some omniva</p> : post === "smartpost" && <p>some smartpost</p>}
                                </Ship>
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
                                {cart.products?.map((product) => (
                                    <>
                                        <Headers>
                                            <Prod style={{ marginRight: "1rem" }}>{product.title}   <b>x {product.quantity}</b>
                                            </Prod>
                                            <Prod style={{ whiteSpace: "nowrap" }}>{(product.price * product.quantity).toFixed(2)} €</Prod>
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
                                <Headers style={{ fontSize: "1.2rem" }}>
                                    <p>Total</p>
                                    <Subtotal>
                                        {Number(endTotal).toFixed(2)} €<br />
                                        <Vat>
                                            (includes <VatPrice>
                                                {(Number(endTotal) * 0.2)?.toFixed(2)}€</VatPrice> VAT)
                                        </Vat>
                                    </Subtotal>
                                </Headers>
                            </Order>
                            <Text>After placing an order you will receive an email with a pdf file, containing the invoice, to the email you specified in the billing details section.</Text>
                            <Hr style={{ width: "calc(100% - 4rem)", margin: "1rem 0" }} />
                            <Text style={{ margin: "0" }}>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <PrivLink onClick={() => window.open("/privacy-policy", "_blank")}>privacy policy</PrivLink>.</Text>
                            <Hr style={{ width: "calc(100% - 4rem)", margin: "1rem 0" }} />
                            <Checkbox><input name="checkbox" {...register("checkbox")} type="checkbox" /><label htmlFor="ckbox" style={{ float: "right", padding: "0 1rem" }}>I have read and agree to the website <PrivLink onClick={() => window.open("/terms-and-conditions", "_blank")}>terms and conditions </PrivLink><span style={{ color: "red" }}>*</span></label></Checkbox>
                            <Button type="submit">PLACE ORDER</Button>
                        </Right>
                    </Form>
                </Wrapper>
            )
        }
    }

    return (
        <Container>
            <Announcement />
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <NavbarCommon toggle={toggle} scrolled={scrolled} />
            {checkCart()}
            <Footer />
        </Container>
    )
}

export default Checkout