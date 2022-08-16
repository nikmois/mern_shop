import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import NavbarCommon from '../components/NavbarCommon'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import parseISO from 'date-fns/parseISO'
import Sidebar from '../components/Sidebar';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import format from 'date-fns/format'
import PersonPinIcon from '@mui/icons-material/PersonPin';
import TextField from '@mui/material/TextField';
import ShopIcon from '@mui/icons-material/Shop';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { userRequest } from "../requestMethods";
import { useLocation } from 'react-router-dom';
import {motion} from 'framer-motion/dist/framer-motion';



const Container = styled.div`

`;

const NoUser = styled.div`
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Wrapper = styled.div`
  max-width: 1300px;
  margin: 2vh auto 10vh auto;
  min-height: 50vh;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.281);
  @media screen and (max-width: 1300px){
    margin: 2vh 1rem 10vh 1rem;
  }
`;

const First = styled.form`
  display: flex;
  padding: 1rem;
  align-items: start;
  justify-content: center;
  flex-direction: column;
`;

const Inputs = styled.div`
  display: flex;
  align-items: start;
  width: 100%;
  justify-content: center;
  @media screen and (max-width: 750px){
    flex-direction: column;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5;
  width: 100%;
  margin-right: 1rem;
  @media screen and (max-width: 750px){
    margin-right: 0;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5;
  width: 100%;
  margin-left: 1rem;
  @media screen and (max-width: 750px){
    margin-left: 0;
  }
`;

const Hr = styled.hr`
    background-color: #dbdbdb;
    border: none;
    height: 2px;
    width: 100%;
    margin: 1rem 2rem 1rem 2rem;
    align-self: center;
`;

const Order = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 4px solid #f7a64a;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

const OrderInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #a7a7a7;
  font-weight: 600;
  background-color: #e0e0e0;
  border: 1px solid grey;
  border-bottom: none;
  padding: 0 0.5rem;
  @media screen and (max-width: 700px){
    flex-direction: column;
  }
`;
const Products = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0.5rem;
  justify-content: center;
  border: 1px solid grey;
`;

const Product = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
font-size: 1.1rem;
padding: 0.6rem 0;
@media screen and (max-width: 700px){
    flex-direction: column;
  }
`;

const Header = styled.h2`

`;

const Message = styled.h1`
color: grey;
`
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  textAlign: 'center',
  p: 4,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box component="span">
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function Cabinet() {

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled] = useState(true);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const location = useLocation('');
  const userId = location.pathname.split("/")[2];
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [postcode, setPostcode] = useState('')
  const [userOrders,setUserOrders] = useState([]);

  const toggle = () => {
    setIsOpen(!isOpen)
  };

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleFirstName = (e) => {
    setFirstName(e.target.value)
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  const handleLastName = (e) => {
    setLastName(e.target.value)
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handlePhone = (e) => {
    setPhone(e.target.value)
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleCity = (e) => {
    setCity(e.target.value)
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  const handleAddress = (e) => {
    setAddress(e.target.value)
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  const handlePostcode = (e) => {
    setPostcode(e.target.value)
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleDateChange = (e) => {
    setBirthdate(e);
    setInputs(prev => {
      return { ...prev, "birthdate": e }
    })
  }

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users/find/" + userId)
        setUser(res.data || '');
        setFirstName(res.data.firstName || '')
        setLastName(res.data.lastName || '')
        setEmail(res.data.email || '')
        setBirthdate(res.data.birthdate || '')
        setPhone(res.data.phone || '')
        setCity(res.data.city || '')
        setAddress(res.data.address || '')
        setPostcode(res.data.postcode || '')
      }
      catch { }
    };
    getUsers();
  }, [userId]);

  useEffect(()=>{
    const getUserOrders = async () => {
      try {
        const res = await userRequest.get("orders/find/" + userId)
        setUserOrders(res.data)
      }
      catch { }
    };
    getUserOrders();
  }, [userId]);

  const [inputs, setInputs] = useState({});
  let userdata = {};
  const handleClick = async (e, id) => {
    e.preventDefault();
    userdata = { ...inputs };
    await userRequest.put(`/users/${id}`, userdata)

    //updateUser(id,user);
    handleOpen();
  };


  return (
    <motion.div 
        initial={{opacity: 0}} 
        animate={{opacity: 1}} 
        exit={{opacity: 0, transition: {duration: 0.05}}}>
    <Container>
      <Announcement />
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <NavbarCommon toggle={toggle} scrolled={scrolled} />
      {user ?
        <Wrapper>
          <Box component="span" sx={{ bgcolor: 'background.paper' }}>
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleTabChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab icon={<PersonPinIcon />} label="MINU KONTO" {...a11yProps(0)} />
                <Tab icon={<ShopIcon />} label="MINU TELLIMUSED" {...a11yProps(1)} />
                <Tab icon={<SettingsIcon />} label="SEADED" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} component="span" index={0} dir={theme.direction}>
                <First>
                  <Header>
                    Minu andmed
                  </Header>
                  <Hr />
                  <Inputs>
                    <Left>
                      <TextField
                        variant="outlined"
                        label="First name"
                        name="firstName"
                        InputLabelProps={{ shrink: true }}
                        value={firstName}
                        onChange={handleFirstName}
                        style={{ margin: "1rem 0" }}
                      />
                      <TextField
                        variant="outlined"
                        label="Last name"
                        name="lastName"
                        value={lastName}
                        onChange={handleLastName}
                        InputLabelProps={{ shrink: true }}
                        style={{ margin: "1rem 0" }}
                      />
                      <TextField
                        variant="outlined"
                        label="E-mail"
                        name="email"
                        value={email}
                        onChange={handleEmail}
                        InputLabelProps={{ shrink: true }}
                        style={{ margin: "1rem 0" }}
                      />
                      <LocalizationProvider name="birthdate" dateAdapter={AdapterDateFns}>
                        <DatePicker
                          value={birthdate}
                          onChange={e => handleDateChange(e)}
                          renderInput={(props) => (
                            <TextField {...props} label="Birtdate" style={{ margin: "1rem 0" }} />
                          )}
                        />
                      </LocalizationProvider>
                    </Left>
                    <Right>
                      <TextField
                        variant="outlined"
                        label="Phone number"
                        name="phone"
                        value={phone}
                        onChange={handlePhone}
                        InputLabelProps={{ shrink: true }}
                        style={{ margin: "1rem 0" }}
                      />
                      <TextField
                        variant="outlined"
                        label="City"
                        name="city"
                        value={city}
                        onChange={handleCity}
                        InputLabelProps={{ shrink: true }}
                        style={{ margin: "1rem 0" }}
                      />
                      <TextField
                        variant="outlined"
                        label="Address"
                        name="address"
                        value={address}
                        onChange={handleAddress}
                        InputLabelProps={{ shrink: true }}
                        style={{ margin: "1rem 0" }}
                      />
                      <TextField
                        variant="outlined"
                        label="Postcode"
                        name="postcode"
                        value={postcode}
                        onChange={handlePostcode}
                        InputLabelProps={{ shrink: true }}
                        style={{ margin: "1rem 0" }}
                      />
                    </Right>
                  </Inputs>
                  <Button style={{ marginTop: "2rem" }} size="large" variant="contained" endIcon={<SendIcon />} onClick={(e) => handleClick(e, user._id)}>
                    SALVESTA
                  </Button>
                </First>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <First>
                  <Header>
                    Minu tellimused
                  </Header>
                  <Hr />
                  {!userOrders ? 
                  <Header>
                    Tellimusi ei ole  
                  </Header>
                  :
                  userOrders.map((order, key)=>{
                    return(
                      <Order key={key}>
                        <h4>Tellimuse ID: {order._id}</h4>
                        <OrderInfo>
                          <span>{format(parseISO(order.createdAt), 'yyyy-MM-dd hh:mm')}</span>
                          <span>{order.status}</span>
                          <span style={{color: "#f7a64a", fontSize: "1.1rem"}}>{order.amount} €</span>
                        </OrderInfo>
                        <Products>
                        {order.products.map((product, key)=>{
                          return(
                            <Product key={key}>
                            <span>ID: <span style={{fontSize: "0.8rem"}}>{product._id}</span></span>
                            <span>{product.title.toUpperCase()}</span>
                            <span>värv: {product.color.toUpperCase() || "STANDARD"}</span>
                            <span>{product.quantity} tk</span>
                            <span>{product.price*product.quantity} €</span>
                            </Product>
                          )
                        })}
                        </Products>
                      </Order>
                    )
                  })}
                  </First>
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                Item Three
              </TabPanel>
            </SwipeableViews>
          </Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" style={{color: "green"}} variant="h6" component="h2">
                Your personal information has been successfully changed
                <DoneAllIcon style={{marginLeft: "1rem"}}/>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Please refresh the page to see changes
              </Typography>
            </Box>
          </Modal>
        </Wrapper>
        :
        <NoUser>
          <Message>Please sign in to your account or create one if you still don't have it</Message>
        </NoUser>
      }
      <Footer />
    </Container>
    </motion.div>
  );
};
