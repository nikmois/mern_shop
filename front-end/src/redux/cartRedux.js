import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity:0,
        total:0,
        isFetching: false,
        error: false,
    },
    reducers:{
        addProduct:(state,action)=>{
            const productIndex = state.products.findIndex(
                (product) => product._id === action.payload._id
            );
            if (productIndex >= 0 ){
                console.log(state.products[productIndex].quantity);
                console.log(action.payload.color);
            }
            if (productIndex >= 0 && state.products[productIndex].color === action.payload.color) {
                state.products[productIndex].quantity += 1;   
            } else {
                state.products.push(action.payload);
                state.quantity += 1;
            }
            state.total += action.payload.price*action.payload.quantity;
        },
        addOneProduct:(state, action)=>{
            const productIndex = state.products.findIndex(
                (product) => product._id === action.payload._id && product.color === action.payload.color && product.quantity === action.payload.quantity
            );
            state.products[productIndex].quantity += 1;
            state.total += action.payload.price
        },
        removeOneProduct:(state, action)=>{
            const productIndex = state.products.findIndex(
                (product) => product._id === action.payload._id && product.color === action.payload.color && product.quantity === action.payload.quantity
            );
            if(state.products[productIndex].quantity === 1){
                return
            }
            state.products[productIndex].quantity -= 1;
            state.total -= action.payload.price
        },
        setColor:(state, action)=>{
            const productIndex = state.products.findIndex(
                (product) => product._id === action.payload.product._id && product.color === "" && product.quantity === action.payload.product.quantity
            );
            state.products[productIndex].color = action.payload.color;
        },
        removeFromCart(state,action){
            state.products.splice(
                state.products.findIndex((item)=>
                item._id === action.payload._id && item.quantity === action.payload.quantity && item.color === action.payload.color
                ),1
            );
            state.quantity = state.quantity - 1;
            state.total = Number(state.total) - Number(action.payload.price)*Number(action.payload.quantity);
        }
    },
});

export const {setColor, removeFromCart, addProduct,addOneProduct,removeOneProduct} = cartSlice.actions
export default cartSlice.reducer;