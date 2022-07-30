import newsletter from '../images/newsletter.jpg';
import styled from 'styled-components';
import { useState } from 'react';
import { useHttp } from '../hooks/http.hook';


const Cont = styled.div`
    height: 60vh;
    background-image: url(${newsletter});
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin-top: 3rem;
    /* Create the parallax scrolling effect */
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;

    @media screen and (max-width: 850px) {
        height: 70vh;
    }
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 1100px;
    height: 500px;

    @media screen and (max-width: 650px) {
        flex-direction: column;
    }
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 60px 0 20px;
    color: white;

    @media screen and (max-width: 850px) {
        padding: 15px;
        margin: 0;
    }
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px 0 60px;

    @media screen and (max-width: 850px) {
        padding: 30px 10px 30px 10px;
        
    }
`;

const Title = styled.h2`
    font-size: 50px;
    margin: 10px 15px 10px 15px;

    @media screen and (max-width: 850px) {
        font-size: 30px;
        text-align: center;
        padding-top: 25px;
    }
`;

const Message = styled.h2`
    font-size: 50px;
    margin: 10px 15px 10px 15px;
    text-align: center;
    color: white;

    @media screen and (max-width: 850px) {
        font-size: 30px;
        padding-top: 25px;
    }
`;

const Desc = styled.div`
    font-size: 24px;
    font-weight: 300;
    margin: 0 15px 20px 15px;

    @media screen and (max-width: 850px) {
        font-size: 20px;
        text-align: center;
        padding: 0 15px;
    }
`;

const RightContainer = styled.div`
    background-color: #eeededc3;
    width: 100%;
    height: 140px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    position: relative;

    @media screen and (max-width: 850px) {
        width: 260px;
        height: 120px;
    }
`;

const InputContainer = styled.div`
    width: 90%;
    height: 40px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgrey;
    margin: 10px;
    @media screen and (max-width: 850px) {
        height: 35px;
    }
`;

const Input = styled.input`
    border: none;
    flex: 8;
    padding-left: 20px;
`;

const Button = styled.button`
    padding: 10px 40px;
    font-size: 20px;
    position: absolute;
    background-color: rgba(238, 152, 82, 0.747);
    &:hover{
        background-color: rgba(252, 137, 42, 0.918);
    }
    box-sizing: border-box;
    border-radius: 5px;
    left: 5%;
    bottom: 10%;
    cursor: pointer;
    color: white;

    @media screen and (max-width: 850px) {
        padding: 7px 30px;
        font-size: 16px;
    }
`;


const Newsletter = () => {
    const [pressed, setPressed] = useState(false)
    const [message, setMessage] = useState("")
    const [email, setEmail] = useState("")
    const {request} = useHttp();

    const registerHandler = async () => {
        setPressed(true)
        try {
            const data = await request('/api/newsletter', 'POST', {"email": email})
            setMessage(data.message)
        } catch (e) {
            setMessage(e.message)
        }
    };
    return (
        <Cont>
        <Container>
            {!pressed ?
            (
            <>
            <Left>
            <Title>Liituge meie uudiskirjaga</Title>
            <Desc>Hankige õigeaegseid värskendusi oma lemmiktoodetest.</Desc>
            </Left>
            <Right>
            <RightContainer>
            <InputContainer>
                <Input type="email" placeholder="Teie e-mail" onChange={(e)=>setEmail(e.target.value)}/>
            </InputContainer>
            <Button onClick={registerHandler}>LIITUDA</Button>
            </RightContainer>
            </Right>
            </>)
            :
            <Message>
                {message || "Midagi läks valesti palun proovige hiljem uuesti"}
            </Message>
            }
        </Container>
        </Cont>
    )
}

export default Newsletter
