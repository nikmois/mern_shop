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
import {motion} from 'framer-motion/dist/framer-motion';
import { Alert } from "@material-ui/core";


const Cont = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    max-width: 1300px;
    margin-top: 5vh;
    margin-left: auto;
    margin-right: auto;
`;

const Left = styled.div`
    display: flex;
    margin-left: 20px;
    width: 20%;
    justify-content: flex-start;
    flex-direction: column;
    @media screen and (max-width: 800px) {
        display: none;
    }
`;

const Right = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    @media screen and (max-width: 800px) {
        width: 100%;
    }
`;

const Title = styled.h1`
    margin: 15px 0 25px;
    display: flex;
    font-weight: 500;
    font-size: clamp(2rem, 1.5vw, 2.5rem);
`;

const MobileTitle = styled.h1`
    display: none;

    @media screen and (max-width: 800px) {
        font-size: clamp(1.5rem, 1.5vw, 2.5rem);
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
    transition: all 1s ease-out;
`;

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1.5px;
    width: 90%;
    margin: 20px 0;
`;

const Option = styled.option`
    transition: all 0.5s ease-in;
    padding: 0.5rem 0;
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
        if (value === "DEFAULT") {
            setFilters({});
            return;
        }
        setFilters({
            ...filters,
            [e.target.name]: value,
        })
    }

    let catName;
    if (cat === "tableware"){
        catName = "SILIKOONIST BEEBI NÕUD"
    }else if(cat === "educational-toys"){
        catName = "ARENDAVAD MÄNGUASJAD"
    }else if(cat === "silicone-toys"){
        catName = "SILICONE TOYS FOR CHILDREN"
    }



    return (
        <>    
        <motion.div 
        initial={{opacity: 0}} 
        animate={{opacity: 1}} 
        exit={{opacity: 0, transition: {duration: 0.05}}}>
            <Announcement />
            <Alert variant="filled" severity="error">
            Tähelepanu veebileht on testrežiimis. Teie tellimust ei töödelda
            </Alert>
            <Sidebar isOpen={isOpen} toggle={toggle}/>
            <NavbarCommon toggle={toggle} scrolled={scrolled}/>
            <Cont>
            <Left>
                <Title>{catName}</Title>
                <Hr />
                <LeftContent>
                <Title2>KATEGOORIAD</Title2>
                <Categories>
                    <Cat to="/products/tableware" style={{color: cat === "tableware" && "#ff9d1d"}}>Silikoonist Beebi Nõud</Cat>
                    <Cat to="/products/educational-toys" style={{color: cat === "educational-toys" && "#ff9d1d"}}>Arendavad Mänguasjad</Cat>
                    <Cat to="/products/silicone-toys" style={{color: cat === "silicone-toys" && "#ff9d1d"}}>Silikoonist Mänguasjad</Cat>
                </Categories>
                <Hr />
                <Title2>FILTER VÄRVI JÄRGI</Title2>
                <Select name="color" defaultValue={'DEFAULT'} onChange={handleFilters}>
                    <Option value="DEFAULT">Kõik värvid</Option>
                    <Option value="White">Valge</Option>
                    <Option value="Blue">Sinine</Option>
                    <Option value="Green">Roheline</Option>
                    <Option value="Red">Punane</Option>
                    <Option value="Black">Must</Option>
                    <Option value="Beige">Beež</Option>
                    <Option value="Purple">Lilla</Option>
                    <Option value="Yellow">Kollane</Option>
                    <Option value="Orange">Oranž</Option>

                </Select>           
                </LeftContent>
            </Left>
            <Right>
            <MobileTitle>
                {catName}
            </MobileTitle>
            <FilterContainer>
                <Filter><FilterText>Sorteeri tooteid:</FilterText>
                <Select onChange={e=>setSort(e.target.value)}>
                 <Option value="newest">Uusimad</Option>
                 <Option value="asc">Hind (kõrge)</Option>
                 <Option value="desc">Hind (madal)</Option>
                </Select>
                </Filter>
            </FilterContainer>
            <Products cat={cat} filters={filters} sort={sort}/>
            </Right>
            </Cont>
            <Newsletter />
            <Footer />
            <MobileCart />
            </motion.div>
        </>
    )
}

export default ProductList
