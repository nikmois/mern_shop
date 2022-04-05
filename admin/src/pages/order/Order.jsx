import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { userRequest } from "../../requestMethods";
import "./order.css";

export default function User() {

  const [data, setData] = useState({});
  const location = useLocation();
  const orderId = location.pathname.split("/")[2];
  const [inputs, setInputs] = useState({});
  let order = {};

  const handleChange = (e) => {
    setInputs(prev=>{
      return {...prev, [e.target.name]:e.target.value}
  })
  }

  useEffect(()=>{
    const getUsers = async ()=>{
      try{
        const res = await userRequest.get("orders/" + orderId)
        setData(res.data);
      }
      catch{}
    };
    getUsers();
  }, [orderId]);

  const handleClick = async (e,id) => {
    e.preventDefault();
    order = {...inputs};
    await userRequest.put(`/orders/${id}`, order)
    //updateUser(id,user);
    alert("Заказ изменен, чтобы увидеть измененный заказ обнови страницу")
  };

  console.log(data.products);
  const productsCheck = () => {
    return(
    data.products?.map((product, i)=>(
      <div className="oneProd" key={i}>
        <div className="userUpdateItem">
          <label>ID продукта</label>
          <input
            type="text"
            className="userUpdateInput"
            defaultValue={product._id}
          />
        </div>
        <div className="userUpdateItem">
          <label>Название продукта</label>
          <input
            type="text"
            placeholder={product.title}
            className="userUpdateInput"
            onChange={handleChange}
            name="title"
          />
        </div>
        <div className="userUpdateItem">
          <label>Кол-во продукта</label>
          <input
            type="text"
            placeholder={product.quantity}
            className="userUpdateInput"
            onChange={handleChange}
            name="quantity"
          />
        </div>
        <div className="userUpdateItem">
          <label>Цвет продукта</label>
          <input
            type="text"
            placeholder={product.color}
            className="userUpdateInput"
            onChange={handleChange}
            name="color"
          />
        </div>
      </div>
    )))
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Редактировать заказ</h1>
      </div>
      <div className="userContainer">
        <div className="userUpdate">
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>ID заказа</label>
                <input
                  type="text"
                  defaultValue={data._id}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Сумма заказа</label>
                <input
                  type="text"
                  defaultValue={data.amount}
                  className="userUpdateInput"
                  onChange={handleChange}
                  name="amount"
                />
              </div>
              <div className="userUpdateItem">
                <label>Статус заказа (pending, approved, declined)</label>
                <input
                  type="text"
                  placeholder={data.status}
                  className="userUpdateInput"
                  onChange={handleChange}
                  name="status"
                />
              </div>
              <div className="userUpdateItem">
                <label>Имя покупателя</label>
                <input
                  type="text"
                  placeholder={data.fullname}
                  className="userUpdateInput"
                  onChange={handleChange}
                  name="fullname"
                />
              </div>
              <div className="userUpdateItem">
                <label>ID покупателя (если зарегистрирован)</label>
                <input
                  type="text"
                  defaultValue={data.userId}
                  className="userUpdateInput"
                  onChange={handleChange}
                  name="userId"
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
                <label>Адрес заказа</label>
                <input
                  type="text"
                  placeholder={data.address || "Не указан"}
                  className="userUpdateInput"
                  onChange={handleChange}
                  name="address"
                />
              </div>
              {productsCheck()}
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
              </div>
              <button onClick={(e) => handleClick(e,orderId)} className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
