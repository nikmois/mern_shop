import "./userList.css";
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
    await userRequest.delete(`/users/${id}`)
  };

  useEffect(()=>{
    const getUsers = async ()=>{
      try{
        const res = await userRequest.get("users")
        setData(res.data);
      }
      catch{}
    };
    getUsers();
  }, []);

  
  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "user",
      headerName: "Пользователь",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.img || "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg"} alt="" />
            {params.row.fullname}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 250 },
    { field: "phone", headerName: "phone", width: 150 },
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
            <Link to={"/user/" + params.row._id}>
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
