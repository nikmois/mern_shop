import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import regPic from "../images/register.jpg";
import { login } from "../redux/apiCalls";

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

const Link = styled.a`
    margin: 5px 0;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
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

const Error = styled.span`
    color: red;
    margin: 10px 0;
`;

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const {isFetching,error} = useSelector((state)=>state.user);

    const handleClick= (e) => {
        e.preventDefault()
        login(dispatch, {username,password});
    }

    return (
        <Container bgImage={regPic}>
        <Wrapper>
            <Title>SIGN IN</Title>
            <Form>
                <Input placeholder="username" onChange={(e)=>setUsername(e.target.value)} />
                <Input placeholder="password" type="password" onChange={(e)=>setPassword(e.target.value)}/>          
                <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
                {error && <Error>Wrong username or password!</Error>}
                <Link>FORGOT YOUR PASSWORD?</Link>
                <Link>CREATE A NEW ACCOUNT</Link>
            </Form>
        </Wrapper>
    </Container>
    )
}

export default Login
