import "./OrderList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethods";

export default function UserList() {
  const [data, setData] = useState([]);

  const handleDelete = async (id) => {
    setData(data.filter((item) => item._id !== id));
    await userRequest.delete(`/orders/${id}`)
  };


  useEffect(()=>{
    const getOrders = async ()=>{
      try{
        const res = await userRequest.get("orders")
        setData(res.data);
      }
      catch{}
    };
    getOrders();
  }, []);

  
  const columns = [
    { field: "_id", headerName: "Order ID", width: 200 },
    { 
      field: "amount", 
      headerName: "Сумма заказа", 
      width: 140, 
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {`${params.row.amount.toFixed(2)} €`}
          </div>
        );
      },
    },
    {
      field: "fullname",
      headerName: "Покупатель",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {`${params.row.firstName} ${params.row.lastName}`}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Телефон", width: 150 },
    { field: "container", headerName: "Адрес доставки", width: 230 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/order/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row)=>row._id}
        pageSize={20}
      />
    </div>
  );
}
