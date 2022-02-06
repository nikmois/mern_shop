import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Shop from "./pages/Shop";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import { useSelector } from "react-redux";
import Cabinet from "./pages/Cabinet";


function App() {
  const user = useSelector(state=>state.user.currentUser);
  return ( 
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products/:category' element={<ProductList/>}/>
        <Route path='/signIn' element={user ? <Navigate to = "/" /> : <Login />}/>
        <Route path='/register' element={user ? <Navigate to = "/" /> : <Register />}/>
        <Route path='/cabinet' element={!user ? <Navigate to = "/" /> : <Cabinet />}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/product/:id' element={<Product/>}/>
        <Route path='/shop' element={<Shop/>}/>
      </Routes>
    </Router>
  );
};

export default App;