import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { userRequest } from "../../requestMethods";
import "./user.css";

export default function User() {

  const [data, setData] = useState({});
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const [inputs, setInputs] = useState({});
  let user = {};

  const handleChange = (e) => {
    setInputs(prev=>{
      return {...prev, [e.target.name]:e.target.value}
  })
  }

  useEffect(()=>{
    const getUsers = async ()=>{
      try{
        const res = await userRequest.get("users/find/" + userId)
        setData(res.data);
      }
      catch{}
    };
    getUsers();
  }, [userId]);

  const handleClick = async (e,id) => {
    e.preventDefault();
    user = {...inputs};
    await userRequest.put(`/users/${id}`, user)
    //updateUser(id,user);
    alert("Пользователь изменен, чтобы увидеть измененного пользователя обнови страницу")
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Изменить пользователя</h1>
      </div>
      <div className="userContainer">
        <div className="userUpdate">
          <span className="userUpdateTitle">Редактировать</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Полное имя</label>
                <input
                  type="text"
                  placeholder={data.fullname}
                  className="userUpdateInput"
                  onChange={handleChange}
                  name="fullname"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={data.email}
                  className="userUpdateInput"
                  onChange={handleChange}
                  name="email"
                />
              </div>
              <div className="userUpdateItem">
                <label>Номер телефона</label>
                <input
                  type="text"
                  placeholder={data.phone}
                  className="userUpdateInput"
                  onChange={handleChange}
                  name="phone"
                />
              </div>
              <div className="userUpdateItem">
                <label>Адрес</label>
                <input
                  type="text"
                  placeholder={data.address || "Не указан"}
                  className="userUpdateInput"
                  onChange={handleChange}
                  name="address"
                />
              </div>
              <div className="userUpdateItem">
                <label>Заказы</label>
                <input
                  type="text"
                  placeholder={data.orders?.length > 1 ? data.orders : "Нет заказов"}
                  className="userUpdateInput"
                  name="orders"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={data.img}
                  alt=""
                />
              </div>
              <button onClick={(e) => handleClick(e,userId)} className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
