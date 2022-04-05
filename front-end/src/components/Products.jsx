import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
    display: grid;
    padding: 0 5vw;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: calc(2em + 2vh) calc(1.5em + 1vmin);
    width: 100%;
    max-width: 1300px;
`;

const Products = ({cat,filters,sort,popular}) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(()=>{
        const getProducts = async () => {
            try{
                const res = await axios.get(
                    cat
                    ? `http://localhost:5000/api/products?category=${cat}`
                    : popular
                    ? "http://localhost:5000/api/products?home=home"
                    : "http://localhost:5000/api/products?new=new"
                    );
                    setProducts(res.data);
            }catch(err){}
        };
        getProducts();
    },[cat,popular]);

    useEffect(() => {
        cat && 
            setFilteredProducts(
                products.filter((item) => 
                    Object.entries(filters).every(([key, value]) =>
                        item[key].includes(value)
                    )
                )
            );
    }, [products, cat, filters]);


    useEffect(()=>{
        if(sort==="newest"){
            setFilteredProducts(prev=>
                [...prev].sort((a,b)=>(b.createdAt > a.createdAt) ? 1 : ((a.createdAt > b.createdAt) ? -1 : 0))
                )
        } else if(sort==="asc"){
            setFilteredProducts(prev=>
                [...prev].sort((a,b)=>a.price - b.price)
                )
        } else{
            setFilteredProducts(prev=>
                [...prev].sort((a,b)=>b.price - a.price)
                )
        }
    },[sort]);


    const productsCheck = () => {
        if (cat){
            return(
            filteredProducts.map((item, i) => (
                <Product item={item} key={i}/>
            )))
        } else if (popular){
            return(
                products.slice(0,9).map((item,i) => <Product item={item} key={i}/>
            ))
        } else{
            return(
            products.slice(0,3).map((item,i) => <Product item={item} key={i}/>
            ))}
    }

    return (
        <Container>
            {productsCheck()}
        </Container>
    )
}

export default Products
