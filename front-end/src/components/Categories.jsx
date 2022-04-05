import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    margin-top: 3vh;
    
    @media screen and (max-width: 800px) {
        flex-direction: column;
        gap: 2rem;
        max-width: 75vw;
    }
`;



const Categories = () => {
    return (
        <Container>
            {categories.map(item=>(
                
                <CategoryItem item={item} key={item.id}/>
                
            ))}
        </Container>
    )
}

export default Categories
