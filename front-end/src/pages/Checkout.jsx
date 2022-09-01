import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import NavbarCommon from '../components/NavbarCommon'
import Input from '../components/Input'
import Sidebar from '../components/Sidebar';
import { useForm} from "react-hook-form";
import { useEffect, useState } from 'react';
import { BsCartX } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import FormHelperText from '@mui/material/FormHelperText';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { TextField } from '@material-ui/core';
import omnivaLocations from "../locations.json";
import smartLocations from "../places.json";
import omniva from "../images/omniva.jpg";
import smartpost from "../images/smartpost.png";
import dpd from "../images/dpd.jpg";
import { useHttp } from "../hooks/http.hook";
import CircularProgress from '@mui/material/CircularProgress';
import { emptyAllCart } from "../redux/apiCalls";
import {motion} from 'framer-motion/dist/framer-motion';
import axios from 'axios'
import Alert from '@mui/material/Alert';


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

const PostLogo = styled.img`
    width: 5rem;
    margin-left: 0.5rem;
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
    display: flex;
    margin: 0.6rem;
    align-items: center;
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
  
const Blurred = styled.div`
    width: 100vw;
    z-index: 50;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    background-color: #808080b5;
`;

const Circle = styled(CircularProgress)`
    transform: scale(2);
    margin-top: 5vh;
`;

const BlurredMessage = styled.div`
    color: white;
    font-size: clamp(2rem, 3vw, 5rem);
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

const phoneRegExp = /^([0-9 ]|#|\+|\*)+$/

const countries = ["Eesti", "Läti", "Leedu", "Soome"];


const Checkout = () => {

    const schema = yup.object().shape({
        firstName: yup.string().matches(/^([^0-9]*)$/, "Eesnimi ei pea sisaldama numbreid").required("Eesnimi on kohustuslik väli"),
        lastName: yup.string().matches(/^([^0-9]*)$/, "Perekonnanimi ei pea sisaldama numbreid").required("Perekonnanimi on kohustuslik väli"),
        email: yup.string().email("Palun sisestage korrektne email").matches(/^\S*$/, "Email ei tohi sisaldada tühikuid").required("Email on kohustuslik väli"),
        message: yup.string(),
        street: yup.string().required("Aadress on kohustuslik väli"),
        postcode: yup.string(),
        city: yup.string().required("Linn on kohustuslik väli"),
        phone: yup.string().matches(phoneRegExp, 'Palun sisestage korrektne telefoninumber').required("Telefoninumber on kohustuslik väli"),
        country: yup.string().oneOf(countries).required("Palun valige riik"),
        container: yup.string().required("Palun valige postiautomaat"),
        checkbox: yup.bool().oneOf([true], "Palun nõustuge tingimustega"),
    })

    const { register, resetField, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
        defaultValues: {
            checkbox: false,
        }
    })
    
    const user = useSelector(state=>state.user.currentUser);
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled] = useState(true);
    const [endTotal, setEndTotal] = useState(0);
    const [post, setPost] = useState("omniva");
    const [shippingSize, setShippingSize] = useState();
    const [shippingPrice, setShippingPrice] = useState();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    function disableScroll() {
        // Get the current page scroll position
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            // if any scroll is attempted, set this to the previous value
            window.onscroll = function() {
                window.scrollTo(scrollLeft, scrollTop);
            };
    }
      
    function enableScroll() {
        window.onscroll = function() {};
    }
    

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
                if (post==="smartpost"){
                    setEndTotal((Number(cart.total) + 2.99).toFixed(2))
                    setShippingPrice(2.99.toFixed(2))
                }else if(post==="dpd"){
                    setEndTotal((Number(cart.total) + 2.90).toFixed(2))
                    setShippingPrice(2.90.toFixed(2))
                }else if(post==="omniva"){
                    setEndTotal((Number(cart.total) + 2.95).toFixed(2))
                    setShippingPrice(2.95.toFixed(2))
                }
            } else if (33 < shippingSize && shippingSize <= 66) {
                if (post==="smartpost"){
                    setEndTotal((Number(cart.total) + 3.99).toFixed(2))
                    setShippingPrice(3.99.toFixed(2))
                }else if(post==="dpd"){
                    setEndTotal((Number(cart.total) + 3.90).toFixed(2))
                    setShippingPrice(3.90.toFixed(2))
                }else if(post==="omniva"){
                    setEndTotal((Number(cart.total) + 3.95).toFixed(2))
                    setShippingPrice(3.95.toFixed(2))
                }
            } else if (shippingSize > 66) {
                if (post==="smartpost"){
                    setEndTotal((Number(cart.total) + 4.89).toFixed(2))
                    setShippingPrice(4.89.toFixed(2))
                }else if(post==="dpd"){
                    setEndTotal((Number(cart.total) + 4.80).toFixed(2))
                    setShippingPrice(4.80.toFixed(2))
                }else if(post==="omniva"){
                    setEndTotal((Number(cart.total) + 4.85).toFixed(2))
                    setShippingPrice(4.85.toFixed(2))
                }
            }
        }
    }, [cart.total, cart.products, shippingSize, endTotal, post]);


    const checkShipping = () => {
        if (cart.total > 35) {
            return (<Subtotal><Free>tasuta</Free></Subtotal>)
        } else {
            return (<Subtotal>
                {(shippingSize > 0 && shippingSize <= 33) ? <>{shippingPrice}€</>
                    : (shippingSize > 33 && shippingSize <= 66) ? <>{shippingPrice}€</>
                        : (shippingSize > 66) && <>{shippingPrice}€</>
                }
            </Subtotal>)
        }
    }

    const history = useNavigate();
    const {request} = useHttp();

    const onSubmit = async (data,e) => {
        setLoading(true)
        disableScroll()
        data.amount = cart.total.toFixed(2)
        data.products = cart.products
        data.shipping = post
        data.shippingPrice = shippingPrice
        if (user){
            data.userId = user._id;
        }
        if (shippingSize > 0 && shippingSize <=33){
            data.shippingSize = "S suuruse pakend"
        } else if (shippingSize > 33 && shippingSize <=66){
            data.shippingSize = "M suuruse pakend"
        } else if (shippingSize > 66){
            data.shippingSize = "L suuruse pakend"
        }
        try {
            const res = await request('https://baby-pingviin.herokuapp.com/api/orders', 'POST', {...data})
            setLoading(false)
            enableScroll()
            history('/successOrder')
            console.log(res.message)
            console.log(res)
            emptyAllCart(dispatch)
            const res2 = await axios.get("https://baby-pingviin.herokuapp.com/api/counter")
            let [arve] = res2.data;
            try {
                request("https://baby-pingviin.herokuapp.com/contact", 'POST', {
                name: res.firstName,
                arveId: arve.seq_value,
                lastname: res.lastName,
                total: res.amount,
                id: res._id,
                products: res.products,
                email: res.email,
                city: res.city,
                street: res.street,
                shipping: res.shipping,
                post: res.container
            })
            } catch (e) {}
        } catch (e) {}
    }

    
    const [country, setCountry] = useState('');
    const [container, setContainer] = useState('');

    const handlePost = (event) => {
        setPost(event.target.value);
        setContainer('');
        resetField("container");
    };

    const handleChange = (event) => {
        setCountry(event.target.value);
    };

    const handleContainer = (event) => {
        setContainer(event.target.value);
    };

    const checkCart = () => {
        if (cart.products.length < 1) {
            return (
                <EmptyWrapper>
                    <Top1>
                        <TopButton1 to="/products/tableware">JÄTKA OSTLEMIST</TopButton1>
                    </Top1>
                    <EmptyContainer>
                        <Empty>Teie ostukorv on tühi</Empty>
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
                                <Input {...register("firstName")} id="firstName" type="text" label="Eesnimi" name="firstName" required error={!!errors.firstName} helperText={errors?.firstName?.message} />
                                <Input {...register("lastName")} id="lastName" type="text" label="Perekonnanimi" name="lastName" required error={!!errors.lastName} helperText={errors?.lastName?.message} />
                                <Input {...register("email")} id="email" type="email" label="E-mail" name="email" required error={!!errors.email} helperText={errors?.email?.message} />
                                <Input {...register("phone")}
                                    id="phone"
                                    type="tel"
                                    label="Telefoninumber"
                                    name="phone"
                                    onChange={(event) => { event.target.value = normalizePhoneNumber(event.target.value) }}
                                    required
                                    error={!!errors.phone}
                                    helperText={errors?.phone?.message}
                                />
                                <FormControl style={{ margin: "1rem 0 0.6rem 0" }} error={!!errors.country}>
                                    <InputLabel id="demo-simple-select-helper-label">Riik</InputLabel>
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
                                        <MenuItem value="Eesti">Eesti</MenuItem>
                                        <MenuItem value="Läti">Läti</MenuItem>
                                        <MenuItem value="Soome">Soome</MenuItem>
                                        <MenuItem value="Leedu">Leedu</MenuItem>
                                    </Select>
                                    {!!errors.country && <FormHelperText>{errors?.country?.message}</FormHelperText>}
                                </FormControl>
                                <Input {...register("city")} id="city" type="text" label="Linn" required name="city" error={!!errors.city} helperText={errors?.city?.message}/>
                                <Input {...register("street")} id="street" type="text" label="Aadress" required name="street" error={!!errors.street} helperText={errors?.street?.message}/>
                                <Input {...register("postcode")} id="postcode" type="text" label="ZIP / Postiindeks (valikuline)" name="postcode" error={!!errors.postcode} helperText={errors?.postcode?.message} />
                                <TextField
                                {...register("message")}
                                id="outlined-multiline-static"
                                label="Täiendav teave teie tellimuse kohta (valikuline)"
                                name="message"
                                multiline
                                minRows={5}
                                variant="outlined"
                                style={{margin: "1rem 0"}}
                                />
                            </Billing>
                            <Shipping>
                                <Title>KOHALETOIMETUSE DETAILID</Title>
                                <Ship>
                                    <p style={{margin: "1rem 0", fontSize: "1.1rem"}}>Valige pakiautomaat:</p>
                                    <Automats onChange={handlePost}>
                                        <Label>
                                            <input type="radio"
                                                id="omniva"
                                                name="post"
                                                value="omniva"
                                                defaultChecked
                                                style={{ marginRight: "1rem" }}
                                            />
                                            <label htmlFor="omniva">Omniva pakiautomaat <b style={{fontSize: "0.8rem", letterSpacing: "-1px"}}>({(shippingSize >= 0 && shippingSize <= 33) ? <>2,95</> 
                                            : (shippingSize > 33 && shippingSize <= 66) ? <>3,95</> : (shippingSize > 66) && <>4,85</>} €)</b></label>
                                            <PostLogo style={{transform: "scale(1.2)"}} src={omniva}></PostLogo>
                                        </Label>
                                        <Label>
                                            <input
                                                type="radio"
                                                id="dpd"
                                                name="post"
                                                value="dpd"
                                                style={{ marginRight: "1rem" }}
                                            />
                                            <label htmlFor="dpd">DPD pakiautomaat <b style={{fontSize: "0.8rem", letterSpacing: "-1px"}}>({(shippingSize >= 0 && shippingSize <= 33) ? <>2,90</> 
                                            : (shippingSize > 33 && shippingSize <= 66) ? <>3,90</> : (shippingSize > 66) && <>4,80</>} €)</b></label>
                                            <PostLogo src={dpd}></PostLogo>
                                        </Label>
                                        <Label>
                                            <input
                                                type="radio"
                                                id="smartpost"
                                                name="post"
                                                value="smartpost"
                                                style={{ marginRight: "1rem" }}
                                            />
                                            <label htmlFor="smartpost">SmartPost pakiautomaat <b style={{fontSize: "0.8rem", letterSpacing: "-1px"}}>({(shippingSize >= 0 && shippingSize <= 33) ? <>2,99</> 
                                            : (shippingSize > 33 && shippingSize <= 66) ? <>3,99</> : (shippingSize > 66) && <>4,89</>} €)</b></label>
                                            <PostLogo src={smartpost}></PostLogo>
                                        </Label>
                                    </Automats>
                                    
                                    <FormControl style={{ margin: "1rem 0 0.6rem 0", width: "100%"}} error={!!errors.container}>
                                    <InputLabel id="demo-simple-select-helper-label">Pakiautomaat</InputLabel>
                                    <Select
                                        {...register("container")}
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select"
                                        name="container"
                                        value={container}
                                        label="Pakiautomaat"
                                        required
                                        onChange={handleContainer}
                                        MenuProps={{ PaperProps: { sx: { maxHeight: 400 } } }}
                                    >
                                    {post === "omniva" ? 
                                    omnivaLocations.map((location, i) => {
                                        if (location.A0_NAME === "EE"){
                                            return(
                                                <MenuItem key={i} value={location.NAME}>{location.NAME}</MenuItem>
                                            )
                                        } else {
                                            return(<p key={i} style={{display: "none"}}></p>);
                                        }
                                    })
                                    : post === "dpd" 
                                    ? smartLocations.map((location, i) => {
                                            return(
                                                <MenuItem key={i} value={location.name}>{location.name}</MenuItem>
                                            )
                                        
                                    })
                                    : post === "smartpost" 
                                    && smartLocations.map((location, i) => {
                                            return(
                                                <MenuItem key={i} value={location.name}>{location.name}</MenuItem>
                                            )
                                    })}
                                    </Select>
                                    {!!errors.container && <FormHelperText>{errors?.container?.message}</FormHelperText>}
                                    </FormControl>
                                </Ship>
                            </Shipping>
                        </Left>
                        <Right>
                            <Title>TELLIMUSE ANDMED</Title>
                            <Order>
                                <Headers>
                                    <SubTitle>TOODE</SubTitle>
                                    <SubTitle>VAHESUMMA</SubTitle>
                                </Headers>
                                <Hr />
                                {cart.products?.map((product, i) => (
                                    <div style={{width: "100%"}} key={i} name="products">
                                        <Headers>
                                            <Prod name="product" style={{ marginRight: "1rem" }}>{product.title}   <b>x {product.quantity}</b>
                                            </Prod>
                                            <Prod style={{ whiteSpace: "nowrap" }}>{(product.price * product.quantity).toFixed(2)} €</Prod>
                                        </Headers>
                                        <Hr />
                                    </div>
                                ))}
                                <Headers>
                                    <p>Vahesumma</p>
                                    <Subtotal>{cart.total.toFixed(2)} €</Subtotal>
                                </Headers>
                                <Hr />
                                <Headers>
                                    <p>Tarne</p>
                                    {checkShipping()}
                                </Headers>
                                <Hr />
                                <Headers style={{ fontSize: "1.2rem" }}>
                                    <p>Kokku</p>
                                    <Subtotal>
                                        <span style={{textAlignLast: "right", textAlign: "justify"}}>{Number(endTotal).toFixed(2)}</span> €<br />
                                        <Vat>
                                            (sisaldab <VatPrice>
                                                {(Number(endTotal) * 0.2)?.toFixed(2)}€</VatPrice> KM)
                                        </Vat>
                                    </Subtotal>
                                </Headers>
                            </Order>
                            <Text>Pärast tellimuse vormistamist saadetakse teile arveldusandmete jaotises märgitud e-posti aadressile tellimuse kinnitus koos arvega.</Text>
                            <Hr style={{ width: "calc(100% - 4rem)", margin: "1rem 0" }} />
                            <Text style={{ margin: "0" }}>Teie isikuandmeid kasutatakse teie tellimuse töötlemiseks, teie veebilehe kasutamise kogemuse parendamiseks ja muudel meie <PrivLink onClick={() => window.open("/privacy-policy", "_blank")}>privaatsuspoliitikas </PrivLink>kirjeldatud eesmärkidel.</Text>
                            <Hr style={{ width: "calc(100% - 4rem)", margin: "1rem 0" }} />
                            
                            {!!errors.checkbox ? 
                            <div style={{border: "1px solid red"}}><Checkbox><input name="checkbox" {...register("checkbox")} type="checkbox" /><label htmlFor="ckbox" style={{ float: "right", padding: "0 1rem" }}>Olen läbi lugenud ja nõustun veebisaidi <PrivLink onClick={() => window.open("/terms-and-conditions", "_blank")}>tingimustega</PrivLink><span style={{ color: "red" }}>*</span></label></Checkbox><div style={{alignSelf: "start", color: "red", padding: "0 2rem 0 3.8rem"}}>Peate veebilehe tingimustega nõustuma!</div></div> 
                            :
                            <Checkbox><input name="checkbox" {...register("checkbox")} type="checkbox" /><label htmlFor="ckbox" style={{ float: "right", padding: "0 1rem" }}>Olen läbi lugenud ja nõustun veebisaidi <PrivLink onClick={() => window.open("/terms-and-conditions", "_blank")}>tingimustega </PrivLink><span style={{ color: "red" }}>*</span></label></Checkbox>}
                            <Button type="submit">ESITA TELLIMUS</Button>
                        </Right>
                    </Form>
                </Wrapper>
            )
        }
    }

    return (
        <motion.div 
        initial={{opacity: 0}} 
        animate={{opacity: 1}} 
        exit={{opacity: 0, transition: {duration: 0.05}}}>
        <Container>
            <Announcement />
            <Alert variant="filled" severity="error">
            Tähelepanu veebileht on testrežiimis. Teie tellimust ei töödelda
            </Alert>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <NavbarCommon toggle={toggle} scrolled={scrolled} />
            {loading ? <Blurred><BlurredMessage>Palun oodake, tellimust töödeldakse...</BlurredMessage>
            <Circle />
            </Blurred> : <>{checkCart()}</>}
            <Footer />
        </Container>
        </motion.div>
    )
}

export default Checkout