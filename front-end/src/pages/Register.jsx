import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { useHttp } from "../hooks/http.hook";
import regPic from "../images/register.jpg";
import { Link, useNavigate } from "react-router-dom";
import {IoHomeOutline} from 'react-icons/io5';
import '../css/auth.css';
import {motion} from 'framer-motion/dist/framer-motion';


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(#b6b6b692,#272727a9), url(${props=>props.bgImage});
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const Wrapper = styled.div`
    padding: 20px;
    width: 90vw;
    max-width: 500px;
    max-height: 90vh;
    background-color: white;
`;

const Home = styled(Link)`
    position: absolute;
    top: 3%;
    left: 5%;
`;

const Icon = styled(IoHomeOutline)`
    color: white;
    font-size: 2rem;
`;

const Title = styled.h1`
    font-size: clamp(15px, 2vw, 24px);
    font-weight: 300;
`;

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`;

const Input = styled.input`
    flex: 1;
    width: 10rem;
    margin: 20px 10px 0 0;
    padding: clamp(3px, 2%, 13px);
`;
const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0;
`;
const Button = styled.button`
    width: 50%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
`;

const Route = styled(Link)`
    margin: 7px 0;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
    color: black;
`;

const Text = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const PrivLink = styled.span`
    text-decoration: none;
    color: black;
    font-weight: 600;
    cursor: pointer;
`;


const Register = () => {

    const {loading, request, error, clearError} = useHttp()
    

    const [form, setForm] = useState({
        firstName:'', lastName:'', email: '', phone:'', password:'', pass:''
    });

    const [notice, setNotice] = useState()
    
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    };

    const history = useNavigate()
    

    const useMessage = () => {
    return useCallback(text => {
        if (text) {
            myFunction(text)
        }
    }, [])
    }

    const message = useMessage()

    

    function myFunction(text) {

        
        // Get the snackbar DIV
        var x = document.getElementById("snackbar");
      
        // Add the "show" class to DIV
        x.className = "show";
      
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        
        setNotice(text)
    };

    useEffect(() => {
        message(error)
        clearError()
      }, [error, message, clearError])

    

    const registerHandler = async () => {
        try {
            const data = await request('https://baby-pingviin.herokuapp.com/api/auth/register', 'POST', {...form})
            message(data.message)
            history('/signIn')
        } catch (e) {}
    };


    return (
        <motion.div 
        initial={{opacity: 0}} 
        animate={{opacity: 1}} 
        exit={{opacity: 0, transition: {duration: 0.05}}}>
        <Container bgImage={regPic}>
            <Wrapper>
                <Title>LOO UUS KONTO</Title>
                <Form>
                    <Input placeholder="Eesnimi" id="firstName" type="text" value={form.firstName} name="firstName" onChange={changeHandler}/>
                    <Input placeholder="Perekonnanimi" id="lastName" type="text" value={form.lastName} name="lastName" onChange={changeHandler}/>
                    <Input placeholder="Email" id="email" type="text" value={form.email} name="email" onChange={changeHandler}/>
                    <Input placeholder="Telefoninumber" id="phone" value={form.phone} type="tel" name="phone" onChange={changeHandler}/>
                    <Input placeholder="Salasõna" id="pass" value={form.pass} type="password" name="pass" onChange={changeHandler}/>
                    <Input placeholder="Kinnita salasõna" id="confirmedPassword" value={form.password} type="password" name="password" onChange={changeHandler}/>
                    
                    <Agreement>Konto loomisega kinnitan, et lugesin BABYPINGVIIN <PrivLink onClick={()=> window.open("/privacy-policy", "_blank")}>privaatsuspoliitikat</PrivLink> ja nõustun sellega.
                    </Agreement>
                    <Text>
                    <Button onClick={registerHandler} disabled={loading}>LOO KONTO</Button>
                    <Route to="/signIn">MUL JUBA ON KONTO OLEMAS</Route>
                    </Text>
                </Form>
            </Wrapper>
            <div id="snackbar">{notice}</div>
            <Home to="/">
                <Icon />
            </Home>
        </Container>
        </motion.div>
    )
}

export default Register