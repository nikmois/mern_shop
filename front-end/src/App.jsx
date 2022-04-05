import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Shop from "./pages/Shop";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import Cabinet from "./pages/Cabinet";
import Error404 from "./pages/Error404";
import { useEffect } from "react";
import { isJwtExpired } from 'jwt-check-expiration';
import { logOut } from "./redux/apiCalls";
import Checkout from "./pages/Checkout";



function App() {
  const user = useSelector(state=>state.user.currentUser);
  const token = user?.accessToken;
  const dispatch = useDispatch();

  useEffect(()=>{
    if (token){
      if (isJwtExpired(token)){
        logOut(dispatch);
      }
    } else{
      return
    }
  },[token,dispatch]);

  return ( 
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products/:category' element={<ProductList/>}/>
        <Route path='/signIn' element={user ? <Navigate to = "/" /> : <Login />}/>
        <Route path='/register' element={user ? <Navigate to = "/" /> : <Register />}/>
        <Route path='/cabinet' element={<Cabinet />}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/product/:id' element={<Product/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='*' element={<Error404/>}/>
      </Routes>
    </Router>
  );
};

export default App;