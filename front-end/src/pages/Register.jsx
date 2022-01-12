import styled from "styled-components";
import regPic from "../images/register.jpg";

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
    max-height: 90vh;
    background-color: white;
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

const Register = () => {
    return (
        <Container bgImage={regPic}>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder="name" />
                    <Input placeholder="last name" />
                    <Input placeholder="username" />
                    <Input placeholder="email" />
                    <Input placeholder="password" />
                    <Input placeholder="confirm password" />
                    <Agreement>By creating an account, I consent to the processing of my personal data 
                        in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button>CREATE</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register