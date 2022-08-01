import styled from "styled-components"

const Container = styled.div`
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 9vh 0 0 0;
    @media screen and (max-width: 600px){
        margin: 2vh 0 0 0;
    }
`;

const Title1 = styled.div`
    font-size: clamp(27px, 5vw, 45px);
    font-weight: 500;
    color: #df754c;
`;

const Title2 = styled.div`
    font-size: clamp(18px, 3vw, 30px);
    font-weight: 600;
    color: #585858;
`;

const Hr = styled.hr`
    background-color: #f4a384;
    border: none;
    width: 8vw;
    min-width: 100px;
    padding: 1px;
    margin: 1vh 0 2vh 0;
`;

const CategoryTitle = () => {
    return (
        <Container>
            <Title1>Tutvu Meie Toodetega</Title1>
            <Title2>Kategooriad</Title2>
            <Hr />
        </Container>
    )
}

export default CategoryTitle
