import { useState } from "react";
import "./newProduct.css";
import storage from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [imagePaths, setImagePaths] = useState([]);
  const [loading,setLoading] = useState(false)
  const [cat, setCat] = useState("");
  const [color, setColor] = useState([]);
  const dispatch = useDispatch();
  let product = {};
  

  const handleFile = (e) => {
    var file = e.target.files[0];
    file = new File([file], file.name + new Date().toLocaleString(), { type: file.type });
    uploadFiles(file);
    
  }


  async function uploadFiles(img) {
    setLoading(true)
    const storageRef = storage.ref();
    let fileRef = storageRef.child(img.name);
    await fileRef.put(img);
    const singleImgPath = await fileRef.getDownloadURL();
    var newStateArray = imagePaths.slice()
    newStateArray.push(singleImgPath);
    setImagePaths(newStateArray);
    setLoading(false)
  }

  const handleClick = async (e) => {
    e.preventDefault();
    product = {...inputs, category: cat, color: color};
    
    for (var i = 0; i < imagePaths.length; i++){
      product["img" + (i+1)] = imagePaths[i]
    }
    addProduct(product,dispatch);
    alert("Продукт добавлен")
  }
  
  const handleChange = (e) => {
    setInputs(prev=>{
      return {...prev, [e.target.name]:e.target.value}
    })
  }

  const handleCheckbox = (e) => {
    setInputs(prev=>{
      return {...prev, [e.target.name]:e.target.checked}
    })
  }

  const handleCat = (e) => {
    setCat(e.target.value)
  }

  const handleColor = (e) => {
    setColor(e.target.value.split(","))
  }

  const load = () => {
    if (loading === true){
      return(
        <div className="loading">Loading..</div>
      )
    }
  }

  return (
    <div className="newProduct">
      {load()}
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Фото 1</label>
          <input type="file" name="img1" onChange={handleFile}/>
        </div>
        <div className="addProductItem">
          <label>Фото 2</label>
          <input type="file" name="img2" onChange={handleFile}/>
        </div>
        <div className="addProductItem">
          <label>Фото 3</label>
          <input type="file" name="img3" onChange={handleFile}/>
        </div>
        <div className="addProductItem">
          <label>Фото 4</label>
          <input type="file" name="img4" onChange={handleFile}/>
        </div>
        <div className="addProductItem">
          <label>Фото 5</label>
          <input type="file" name="img5" onChange={handleFile}/>
        </div>
        <div className="addProductItem">
          <label>Фото 6</label>
          <input type="file" name="img6" onChange={handleFile}/>
        </div>
        <div className="addProductItem">
          <label>Название</label>
          <input name="title" type="text" placeholder="Название..." onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Категория (выбрать из "tableware", "silicone-toys", "educational-toys")</label>
          <input type="text" placeholder="Категория..." onChange={handleCat}/>
        </div>
        <div className="addProductItem">
          <label>Короткое описание (1-3 слова)</label>
          <input name="desc" type="text" placeholder="Короткое описание..." onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Длинное описание</label>
          <input name="longDesc" type="text" placeholder="Длинное описание..." onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Цвет (вписывать на английском с большой буквы, через запятую и без пробелов)</label>
          <input name="color" type="text" placeholder="Цвет" onChange={handleColor}/>
        </div>
        <div className="addProductItem">
          <label>Цена на данный момент (со скидкой) (обязательно)</label>
          <input name="price" type="number" placeholder="Цена..." onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Цена до уценки (не обязательно)</label>
          <input name="oldPrice" type="number" placeholder="Цена до скидки..." onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Количество на складе (всегда обновлять)</label>
          <input name="inStock" type="number" placeholder="Кол-во..." onChange={handleChange} />
        </div>
        <div className="addProductItem">
        <label>Размер товара, введи число<br />(от 0 до 33 - S)<br />(от 34 до 66 - М)<br />(от 64 до 100 - L)</label>
        <input type="number" name="shipping" onChange={handleChange} placeholder="от 0 до 100" />
        </div>
        <div className="addProductItem">
          <label>Выставлять на главную страницу</label>
          <input name="toHome" type="checkbox" placeholder="Кол-во..." onChange={handleCheckbox} />
        </div>
        <button onClick={handleClick} className="addProductButton">Добавить</button>
      </form>
    </div>
  );
}
