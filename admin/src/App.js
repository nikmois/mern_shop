import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route, Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";

function App() {
  const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const currentUser = user && JSON.parse(user).currentUser;
  const admin = currentUser?.isAdmin;
  return (
    <Router>
      <Switch>
      <Route path="/login">
        <Login />
      </Route>
      {admin ? (
        <>
          <Topbar />
          <div className="container">
          <Sidebar />
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/users">
              <UserList />
            </Route>
            <Route path="/user/:userId">
              <User />
            </Route>
            <Route path="/newUser">
              <NewUser />
            </Route>
            <Route path="/products">
              <ProductList />
            </Route>
            <Route path="/product/:productId">
              <Product />
            </Route>
            <Route path="/newproduct">
              <NewProduct />
            </Route>
          </div>
        </>
      )
      :
      <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
        <a href="/login">
        <button style={{display: "flex", fontSize:"2rem", backgroundColor: "lightgreen", alignItems: "center", justifyContent: "center", width: "500px", height: "100px"}}>PLEASE LOG IN</button>
        </a>
      </div>
      }
      </Switch>
    </Router>
  );
}

export default App;
