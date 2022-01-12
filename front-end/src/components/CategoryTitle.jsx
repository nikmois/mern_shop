import styled from "styled-components"

const Container = styled.div`
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 15vh 0 0 0;
`;

const Title1 = styled.div`
    font-size: clamp(27px, 5vw, 45px);
    font-weight: 500;
    color: #df754c;
`;

const Title2 = styled.div`
    font-size: clamp(22px, 5vw, 40px);
    font-weight: 600;
    color: #585858;
`;

const Hr = styled.hr`
    background-color: #f4a384;
    border: none;
    width: 8vw;
    min-width: 100px;
    padding: 1px;
    margin: 2rem 0 9rem 0;
`;

const CategoryTitle = () => {
    return (
        <Container>
            <Title1>Shop our collection</Title1>
            <Title2>Featured Categoties</Title2>
            <Hr />
        </Container>
    )
}

export default CategoryTitle
