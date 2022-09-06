import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    flex: 1;
    align-items: center;
    display: flex;
    overflow: hidden;
    margin: 0 10px;
    border-radius: 10px;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
`;

const Image = styled.img`
    width: 100%;
    height: 35vh;
    min-height: 10rem;
    object-fit: cover;
    @media screen and (max-width: 450px) {
        height: 30vh;
    }
`;
const Button = styled.button`
    position: absolute;
    border: none;
    padding: 10px;
    background-color: rgba(231, 162, 105, 0.863);
    color: #f7f3ef;
    cursor: pointer;
    font-size: clamp(.8rem, 3vw, 1.2rem);
    font-weight: 600;
    width: 100%;
    justify-content: center;
    align-items: center;
    align-content: center;
`;

const Cont = styled(Link)`
    position: relative;
    display: flex;
    object-fit: cover;
    align-items: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
    &:hover ${Image}{
        transform: scale(1.1); 
        filter: brightness(70%);
        transition: all ease 0.5s;
    }
    &:hover ${Button}{
        color: #fcfcfc;
        background-color: rgba(233, 168, 115, 0.911);
    }
`;


const CategoryItem = ({item}) => {
    return (
        <Container>
            <Cont to={`/products/${item.cat}`}>
            <Image src={item.img} alt={item.title} />
            <Button>{item.title}</Button>
            </Cont>
        </Container>
    )
}

export default CategoryItem
