import styled from "styled-components"

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 10vh 0 0 0;
`;

const Title1 = styled.div`
    font-size: clamp(22px, 5vw, 45px);
    font-weight: 500;
    color: #df754c;
    text-align: center;
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


const LatestProducts = ({latest, popular}) => {

    const checkTitle = () => {
        if(latest){
            return(
                <>
                <Title1>Check Our Latest Products</Title1>
                <Title2>Latest Products</Title2>
                <Hr />
                </>
            )
        } else if (popular){
            return(
                <>
                <Title1>Check Our Most Popular Products</Title1>
                <Title2>Popular Products</Title2>
                <Hr />
                </>
            ) 
        } else {
            return;
        }
    }

    return (
        <Container>
            {checkTitle()}
        </Container>
    )
}

export default LatestProducts
