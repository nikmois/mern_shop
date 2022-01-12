import React from 'react'
import styled from "styled-components";
import { Link as LinkR } from 'react-router-dom';
import { ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from '@material-ui/core';

const Car = styled.div`
  display: none;

  @media screen and (max-width: 1150px) {
    position: fixed;
    display: flex;
    bottom: 0;
    margin: 0;
    width: 100%;
    left: 0;
    height: 4rem;
    background-color: #ffffff;
    z-index: 1000000;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.5);
    }
  
`;

const CartButton = styled(LinkR)`
    box-sizing: border-box;
    border: 3px solid #f7a140;
    padding-top: 0.8rem;
    margin: 0 3vw;
    width: 40vw;
    text-align: center;
`;

const Checkout = styled(LinkR)`
    box-sizing: border-box;
    border: 3px solid #f7a140;
    background-color: #f7a140;
    color: white;
    padding: 0.6rem 0;
    margin: 0 3vw;
    width: 40vw;
    font-weight: 600;
    text-align: center;
    text-decoration: none;
`;

const Cart = styled.div`
    color: #f7a140;
    transform: scale(1.4);
    &:hover{
        color: #f7a140;
        transform: scale(1.6);
    }
`;

const MobileCart = () => {
    return (
        <Car>
            <CartButton to='/cart'>
                <Badge badgeContent={4} color="primary">
                    <Cart><ShoppingCartOutlined /></Cart>
                </Badge></CartButton>
            <Checkout to='/checkout'>CHECKOUT</Checkout>
        </Car>
    )
}

export default MobileCart
