import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Shop from "./pages/Shop";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import Cabinet from "./pages/Cabinet";
import Error404 from "./pages/Error404";
import { useEffect } from "react";
import { isJwtExpired } from 'jwt-check-expiration';
import { logOut } from "./redux/apiCalls";
import Checkout from "./pages/Checkout";
import SuccessOrder from "./pages/SuccessOrder";
import { AnimatePresence } from "framer-motion/dist/framer-motion";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ReturnPolicy from "./pages/ReturnPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";



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
  const location = useLocation();

  return ( 
    <>
      <ScrollToTop />
      <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <Route path='/' element={<Home/>}/>
        <Route path='/products/:category' element={<ProductList/>}/>
        <Route path='/signIn' element={user ? <Navigate to = "/" /> : <Login />}/>
        <Route path='/register' element={user ? <Navigate to = "/" /> : <Register />}/>
        <Route exact path='/cabinet' element={<Login />}/>
        <Route path={'/cabinet/:userId'} element={<Cabinet />}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
        <Route path='/return-policy' element={<ReturnPolicy/>}/>
        <Route path='/terms-and-conditions' element={<TermsAndConditions/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/product/:id' element={<Product/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='*' element={<Error404/>}/>
        <Route path='/successOrder' element={<SuccessOrder/>}/>
      </Routes>
      </AnimatePresence>
      </>
  );
};

export default App;