import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault()
        login(dispatch, {email, password});
    };

    const user = useSelector(state=>state.user.currentUser);


    const userCheck = () => {
        if (!user) {
            return(
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", flexDirection: "column"}}>
            <input style={{padding: 10, marginBottom: 20}} type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
            <input style={{padding: 10, marginBottom: 20}} type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={handleClick} style={{padding: 10, width: 100}}>Login</button>
                </div>  
            )
        } else {
            return(
                <a href="/">
                <button style={{display: "flex", fontSize:"2rem", backgroundColor: "lightgreen", alignItems: "center", justifyContent: "center", width: "500px", height: "100px"}}>To admin panel</button>
                </a>
            )
        }
    };

  return (
        
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
        {userCheck()}   
        </div>
        
  )
};

export default Login;
