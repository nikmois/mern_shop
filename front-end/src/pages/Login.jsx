import { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import regPic from "../images/register.jpg";
import { login } from "../redux/apiCalls";
import '../css/auth.css';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(#b6b6b692,#272727a9), url(${props=>props.bgImage});
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    padding: 20px;
    width: 90vw;
    max-width: 500px;
    background-color: white;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;

const Route = styled(Link)`
    margin: 5px 0;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
    color: black;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin: 15px 0 10px 0;
    &:disabled{
        color: green;
        cursor: not-allowed;
    }
`;

const Home = styled(Link)`
    position: absolute;
    top: 3%;
    left: 5%;
`;

const Icon = styled(IoHomeOutline)`
    color: white;
    font-size: 6vh;
`;


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const {isFetching,error} = useSelector((state)=>state.user);
    const [notice, setNotice] = useState()


    

    function myFunction() {

        if (error){// Get the snackbar DIV
            var x = document.getElementById("snackbar");
            
            // Add the "show" class to DIV
            x.className = "show";
            
            // After 3 seconds, remove the show class from DIV
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            
            setNotice("Wrong email or password, please try again..")}
    };


    

    const handleClick = (e) => {
        e.preventDefault()
        login(dispatch, {email,password});
        myFunction();
    }

    return (
        <Container bgImage={regPic}>
        <Wrapper>
            <Title>SIGN IN</Title>
            <Form>
                <Input placeholder="e-mail" id="email" type="text" name="email" onChange={(e)=>setEmail(e.target.value)} />
                <Input placeholder="password" id="password" name="password" type="password" onChange={(e)=>setPassword(e.target.value)}/>          
                <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
                <Route to="/register">CREATE A NEW ACCOUNT</Route>
            </Form>
        </Wrapper>
        <div id="snackbar">{notice}</div>
        <Home to="/">
                <Icon />
        </Home>
    </Container>
    )
}

export default Login
