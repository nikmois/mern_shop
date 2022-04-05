import "./widgetSm.css";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethods";


export default function WidgetSm() {
  
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    const getUsers = async ()=>{
      try{
        const res = await userRequest.get("users/?new=true")
        setUsers(res.data);
      }
      catch{}
    };
    getUsers();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Новые пользователи</span>
      <ul className="widgetSmList">
        {users.map(user=>(
          <li className="widgetSmListItem" key={user._id}>
          <img
            src={user.img || "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg"}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.fullname}</span>
          </div>
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.email}</span>
          </div>
        </li>
        ))}
      </ul>
    </div>
  );
}
