import React, { useState } from "react";
import styled from "styled-components"
import Announcement from "../components/Announcement";
import NavbarCommon from "../components/NavbarCommon";
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Products from '../components/Products';
import Sidebar from "../components/Sidebar";
import MobileCart from "../components/MobileCart";
import { useLocation, Link } from "react-router-dom";

const Cont = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    max-width: 1300px;
    margin-left: auto;
    margin-right: auto;
`;

const Left = styled.div`
    display: flex;
    margin-left: 20px;
    justify-content: flex-start;
    flex-direction: column;
    flex:1;
    @media screen and (max-width: 800px) {
        display: none;
    }
`;

const Right = styled.div`
    display: flex;
    flex-direction: column;
    flex: 4;
`;

const Title = styled.h1`
    margin: 15px 0 25px;
    display: flex;
    font-weight: 500;
`;

const MobileTitle = styled.h1`
    display: none;

    @media screen and (max-width: 800px) {
        margin: 25px;
        font-weight: 500;
        display: flex;
    }
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    @media screen and (max-width: 800px) {
        display: none;
    }
`;

const Filter = styled.div`
    margin: 20px;
`;

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
`;

const LeftContent = styled.div`
    margin-bottom: 15vh;
`;

const Categories = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title2 = styled.p`
    font-size: 1.3rem;
    margin-bottom: 30px; 
`;

const Cat = styled(Link)`
    color: #575757;
    font-size: 1.1rem;
    margin-bottom: 25px;
    transition: all 0.3s ease;
    cursor: pointer;
    text-decoration: none;
    :hover{
        transform: scale(1.1);
        color: black;

    }
`;

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    min-width: 9rem;
`;

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1.5px;
    width: 90%;
    margin: 20px 0;
`;

const Option = styled.option`

`;

const ProductList = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [scrolled] = useState(true);


    const toggle = () => {
        setIsOpen(!isOpen)
    };

    const location = useLocation();
    const cat = location.pathname.split("/")[2];
    const [filters,setFilters] = useState({});
    const [sort,setSort] = useState("newest");

    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]: value,
        })
    }

    let catName;
    if (cat === "tableware"){
        catName = "SILICONE BABY TABLEWARE"
    }else if(cat === "educational-toys"){
        catName = "EDUCATIONAL TOYS FOR CHILDREN"
    }else if(cat === "silicone-toys"){
        catName = "SILICONE TOYS FOR CHILDREN"
    }

    return (
        <>    
            <Announcement />
            <Sidebar isOpen={isOpen} toggle={toggle}/>
            <NavbarCommon toggle={toggle} scrolled={scrolled}/>
            <Cont>
            <Left>
                <Title>{catName}</Title>
                <Hr />
                <LeftContent>
                <Title2>CATEGORIES</Title2>
                <Categories>
                    <Cat to="/products/tableware">Silicone Baby Tableware</Cat>
                    <Cat to="/products/educational-toys">Educational Toys For Children</Cat>
                    <Cat to="/products/silicone-toys">Silicone Toys For Children</Cat>
                </Categories>
                <Hr />
                <Title2>FILTER BY COLOR</Title2>
                <Select name="color" defaultValue={'DEFAULT'} onChange={handleFilters}>
                    <Option value="DEFAULT" disabled hidden>Color</Option>
                    <Option>White</Option>
                    <Option>Blue</Option>
                    <Option>Green</Option>
                    <Option>Red</Option>
                    <Option>Black</Option>
                    <Option>Beige</Option>
                </Select>           
                </LeftContent>
            </Left>
            <Right>
            <MobileTitle>
                {catName}
            </MobileTitle>
            <FilterContainer>
                <Filter><FilterText>Sort Products:</FilterText>
                <Select onChange={e=>setSort(e.target.value)}>
                 <Option value="newest">Newest</Option>
                 <Option value="asc">Price (asc)</Option>
                 <Option value="desc">Price (desc)</Option>
                </Select>
                </Filter>
            </FilterContainer>
            <Products cat={cat} filters={filters} sort={sort}/>
            </Right>
            </Cont>
            <Newsletter />
            <Footer />
            <MobileCart />
        </>
    )
}

export default ProductList
