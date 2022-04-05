import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state)=> state.product.products);

  useEffect(()=>{
    getProducts(dispatch);
  },[dispatch]);

  const handleDelete = (id) => {
    deleteProduct(id,dispatch)
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Продукт",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img1} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "На складе", width: 200 },
    {
      field: "price",
      headerName: "Цена",
      width: 160,
    },
    {
      field: "action",
      headerName: "Действие",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Изменить</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
    <div className="productList">
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row)=>row._id}
        pageSize={10}
      />
    </div>
    <Link to="/newproduct">
    <button className="productAddNewButton">Добавить товар</button>
    </Link>
    </>
  );
}
