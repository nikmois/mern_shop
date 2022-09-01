import { Link, useLocation } from "react-router-dom";
import "./product.css";
import storage from "../../firebase";
import { Publish } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts, updateProduct } from "../../redux/apiCalls";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const [color, setColor] = useState([]);
  const [inputs, setInputs] = useState({});
  const [loading,setLoading] = useState(false);
  let product = {};


  useEffect(()=>{
    getProducts(dispatch);
  },[dispatch]);

  const handleChange = (e) => {
    setInputs(prev=>{
      return {...prev, [e.target.name]:e.target.value}
  })
  }

  const handleColor = (e) => {
    setColor(e.target.value.split(","))
  }

  const handleFile = (e) => {
    var file = e.target.files[0];
    file = new File([file], file.name + new Date().toLocaleString(), { type: file.type });
    uploadFiles(file,e.target);
  }

  async function uploadFiles(img,e) {
    setLoading(true)
    const storageRef = storage.ref();
    let fileRef = storageRef.child(img.name);
    await fileRef.put(img);
    const singleImgPath = await fileRef.getDownloadURL();
    const name = e.name;
    setInputs(prev=>{
      return {...prev, [name]:singleImgPath}
    });
    setLoading(false)
  }

  const load = () => {
    if (loading === true){
      return(
        <div className="loading">Loading..</div>
      )
    }
  }


  const prevProduct = useSelector((state)=> 
    state.product.products.find((product)=>product._id === productId)
  );

  const handleClick = (e,id) => {
    e.preventDefault();
    product = {...inputs, color: color};
    updateProduct(id,product,dispatch);
    alert("Продукт изменен, чтобы увидеть измененный продукт обнови страницу")
  };

  const handleCheckbox = (e) => {
    setInputs(prev=>{
      return {...prev, [e.target.name]:e.target.checked}
    })
  }

  return (
    <>
    {load()}
    <div className="product">
      
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Добавить товар</button>
        </Link>
      </div>
      <div className="productTop">
          {/*<div className="productTopLeft">
              <Chart data={pStats} dataKey="Продажи" title="Продажи"/>
            </div>*/}
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={prevProduct.img1} alt="" className="productInfoImg" />
                  <span className="productName">{prevProduct.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{prevProduct._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">На складе:</span>
                      <span className="productInfoValue">{prevProduct.inStock}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Название товара</label>
                  <input type="text" name="title" onChange={handleChange} placeholder={prevProduct.title} />
                  <label>Короткое описание товара</label>
                  <input type="text" name="desc" onChange={handleChange} placeholder={prevProduct.desc} />
                  <label>Длинное описание товара</label>
                  <input type="text" name="longDesc" onChange={handleChange} placeholder={prevProduct.longDesc} />
                  <label>Категория</label>
                  <input type="text" name="category" onChange={handleChange} placeholder={prevProduct.category} />
                  <label>Цвета</label>
                  <input type="text" name="color" onChange={handleColor} placeholder={prevProduct.color} />
                  <label>Цена в данный момент (обязательно)</label>
                  <input type="double" name="price" onChange={handleChange} placeholder={prevProduct.price} />
                  <label>Цена перед уценкой (не обязательно)</label>
                  <input type="double" name="oldPrice" onChange={handleChange} placeholder={prevProduct.oldPrice} />
                  <label>Размер товара, введи число<br />(от 0 до 33 - S)<br />(от 34 до 66 - М)<br />(от 64 до 100 - L)</label>
                  <input type="double" name="shipping" onChange={handleChange} placeholder={prevProduct.shipping} />
                  <label>Количество на складе</label>
                  <input type="number" name="inStock" onChange={handleChange} placeholder={prevProduct.inStock} />
                  <label>Выставлять на главную страницу
                    {
                    prevProduct.toHome === true ? <b> (Выставлен на главную)</b> : <b> (Не выставлен на главную)</b>
                    }</label>
                  <input name="toHome" type="checkbox" onChange={handleCheckbox} />
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={prevProduct.img1} alt="" className="productUploadImg" />
                      <label htmlFor="img1">
                          <Publish/>
                          Image1
                      </label>
                      <input type="file" id="img1" name="img1" onChange={handleFile} style={{display:"none"}} />
                  </div>
                  <div className="productUpload">
                      <img src={prevProduct.img2} alt="" className="productUploadImg" />
                      <label htmlFor="img2">
                          <Publish/>
                          Image2
                      </label>
                      <input type="file" id="img2" name="img2" onChange={handleFile} style={{display:"none"}} />
                  </div>
                  <div className="productUpload">
                      <img src={prevProduct.img3} alt="" className="productUploadImg" />
                      <label htmlFor="img3">
                          <Publish/>
                          Image3
                      </label>
                      <input type="file" id="img3" name="img3" onChange={handleFile} style={{display:"none"}} />
                  </div>
                  <div className="productUpload">
                      <img src={prevProduct.img4} alt="" className="productUploadImg" />
                      <label htmlFor="img4">
                          <Publish/>
                          Image4
                      </label>
                      <input type="file" id="img4" name="img4" onChange={handleFile} style={{display:"none"}} />
                  </div>
                  <div className="productUpload">
                      <img src={prevProduct.img5} alt="" className="productUploadImg" />
                      <label htmlFor="img5">
                          <Publish/>
                          Image5
                      </label>
                      <input type="file" id="img5" name="img5" onChange={handleFile} style={{display:"none"}} />
                  </div>
                  <div className="productUpload">
                      <img src={prevProduct.img6} alt="" className="productUploadImg" />
                      <label htmlFor="img6">
                          <Publish/>
                          Image6
                      </label>
                      <input type="file" id="img6" name="img6" onChange={(e) => handleFile(e)} style={{display:"none"}} />
                  </div>
                  <button className="productButton" onClick={(e) => handleClick(e,productId)}>Update</button>
              </div>
          </form>
      </div>
    </div>
    </>
  );
}
