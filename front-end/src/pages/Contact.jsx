import React, { useState } from 'react'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import NavbarCommon from '../components/NavbarCommon'
import Sidebar from '../components/Sidebar'
import styled from 'styled-components'
import {motion} from 'framer-motion/dist/framer-motion';
import { Home,  MailOutline, Phone} from "@material-ui/icons";
import Input from '../components/Input';
import { Alert, TextField } from '@material-ui/core';
import { useForm} from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import emailjs from "emailjs-com"
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Helmet } from 'react-helmet'

const Container = styled.div`

`;

const Wrapper = styled.div`
max-width: 1300px;
margin: 5vh auto 10vh auto;
display: flex;
gap: 5rem;

@media screen and (max-width: 750px){
flex-direction: column;
}
`;

const Contacts = styled.div`
  display: flex;
  align-items: start;
  flex: 1;
  flex-direction: column;
  padding: 1rem;
`;

const Button = styled.button`
    width: 50%;
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

const Title = styled.h3`
    margin-bottom: 25px;
    font-size: 1.2rem;
    @media screen and (max-width: 830px) {
        margin-bottom: 15px;
    }
`;

const ContactItem = styled.div`
margin-bottom: 20px;
display: flex;
align-items: center;
`;

const Form = styled.form`
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1rem;
`;



const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled] = useState(true);

  const toggle = () => {
      setIsOpen(!isOpen)
  };
  const [open, setOpen] = useState(false);

  const schema = yup.object().shape({
    firstName: yup.string().matches(/^([^0-9]*)$/, "Eesnimi ei pea sisaldama numbreid").required("Eesnimi on kohustuslik väli").matches(/^[a-zA-Z]+$/, "Eesnimi väli peab sisaldama ainult ladina tähestiku tähti"),
    lastName: yup.string().matches(/^([^0-9]*)$/, "Perekonnanimi ei pea sisaldama numbreid").required("Perekonnanimi on kohustuslik väli").matches(/^[a-zA-Z]+$/, "Perekonnanimi väli peab sisaldama ainult ladina tähestiku tähti"),
    email: yup.string().email("Palun sisestage korrektne email").required("Email on kohustuslik väli"),
    message: yup.string().required("Sõnum on kohustuslik väli"),
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data,e) => {
        await emailjs.sendForm('service_ol4oenj', 'template_ryyolwf', e.target, 'wtvxnifgpEu55__-J')
        .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
        console.log('FAILED...', error);
        });
        e.target.reset()
        setOpen(true)
}
const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};

const action = (
  <React.Fragment>
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  </React.Fragment>
);

  return (
    <motion.div 
        initial={{opacity: 0}} 
        animate={{opacity: 1}} 
        exit={{opacity: 0, transition: {duration: 0.05}}}>
        <Helmet>
        <title>BabyPingviin Kontaktid</title>
        <meta name="description" content="BabyPingviin on 2021. aastal loodud pereettevõte, mis pakub kvaliteetseid lauanõusid nii beebidele kui ka väikelastele ning arendavaid mänguasju mitmes vanuses mudilastele. 
                Meie tooted sobivad ideaalselt teie lastele, sest need on valitud hoolivate ja armastavate vanemate poolt. Meie visiooniks on pakkuda taskukohase hinnaga laste- ja beebitooteid ning erinevaid tarbeid,
                mis aitaks säästa pere eelarvet jättes seeläbi ruumi tõeliselt suurte unistuste jaoks." />
        <meta name="keywords" content="lastepood e-pood mänguasjad lastenõud beebitooted babypingviin BabyPingviin kvaliteetsed tooted arendavad mänguasjad nõusid" />
        </Helmet>
        <Announcement />
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <NavbarCommon toggle={toggle} scrolled={scrolled} />
        <Container>
        <Wrapper>
          <Form noValidate onSubmit={handleSubmit(onSubmit)}>

          <Title>KONTAKTIVORM</Title>
          <Input {...register("firstName")} id="firstName" type="text" label="Eesnimi" name="firstName" required error={!!errors.firstName} helperText={errors?.firstName?.message} />
          <Input {...register("lastName")} id="lastName" type="text" label="Perekonnanimi" name="lastName" required error={!!errors.lastName} helperText={errors?.lastName?.message} />
          <Input {...register("email")} id="email" type="email" label="E-mail" name="email" required error={!!errors.email} helperText={errors?.email?.message} />
          <TextField
            {...register("message")}
            id="outlined-multiline-static"
            label="Teie sõnum"
            name="message"
            multiline
            required 
            error={!!errors.message}
            minRows={5}
            variant="outlined"
            style={{margin: "1rem 0"}}
            />
          <Button type="submit">SAADA SÕNUMIT</Button>
          </Form>
          <Contacts>
          <Title>KONTAKTID</Title>
                <ContactItem><Home style={{marginRight:"10px"}}/>
                Eesti, Narva<br/>
                Arkona Grupp OÜ<br/>
                Reg nr.: 10854223
                </ContactItem>
                <ContactItem><Phone style={{marginRight:"10px"}}/>
                    +372 53737427
                </ContactItem>
                <ContactItem><MailOutline style={{marginRight:"10px"}}/>
                    babypingviin@gmail.com
                </ContactItem>
          </Contacts>
        </Wrapper>
        </Container>
        <Footer />
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            action={action}
            sx={{ bottom: { xs: 90, sm: 50 } }}
            >
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Teie sõnum on saadetud!
        </Alert>
        </Snackbar>
    </motion.div>
  )
}

export default Contact