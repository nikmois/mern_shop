import { useState } from "react";
import "./newProduct.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs(prev=>{
      return {...prev, [e.target.name]:e.target.value}
    })
  }
  const handleCat = (e) => {
    setCat(e.target.value)
  }

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
  uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
          default:
      }
    }, 
    (error) => {
      // Handle unsuccessful uploads
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        const product = {...inputs, img1:downloadURL, categories: cat};
        addProduct(product,dispatch);
      });
    }
  );
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Фото 1</label>
          <input type="file" id="file" onChange={e=>setFile(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Фото 2</label>
          <input type="file" id="file" />
        </div>
        <div className="addProductItem">
          <label>Фото 3</label>
          <input type="file" id="file" />
        </div>
        <div className="addProductItem">
          <label>Фото 4</label>
          <input type="file" id="file" />
        </div>
        <div className="addProductItem">
          <label>Фото 5</label>
          <input type="file" id="file" />
        </div>
        <div className="addProductItem">
          <label>Фото 6</label>
          <input type="file" id="file" />
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
        <button onClick={handleClick} className="addProductButton">Добавить</button>
      </form>
    </div>
  );
}
