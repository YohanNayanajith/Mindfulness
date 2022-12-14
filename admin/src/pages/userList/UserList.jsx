import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import { useEffect, useState } from "react";

export default function UserList() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [allShow, setAllShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  const [updateAllShow, setUpdateAllShow] = useState(false);
  const [keyData, setKeyData] = useState("");
  const [valueData, setValueData] = useState("");
  const [userId, setUserId] = useState("");
  const [deleteTrigger, setDeleteTrigger] = useState([]);
  const [updateActivate, setUpdateActivate] = useState(false);
  // const [data, setData] = useState(userRows);

  // IP address of local machine - 192.168.8.187
  useEffect(() => {
    const userData = async () => {
      try {
        let response = await fetch("http://localhost:5000/api/v1/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // token: token,
          },
        });
        let json = await response.json();
        setData(json);
        console.log(json);
        // setLoading(false);
      } catch (error) {
        alert(error);
      }
    };
    userData();
  }, [deleteTrigger]);

  const URL = `http://localhost:5000/api/v1/user/${userId}`;

  const URl_Update = `http://localhost:5000/api/v1/user/${userId}`;

  const updateConfirm = async (key,value) => {
    let jsonObject;
    if(key === "isActivated"){
      jsonObject = {"isActivated":value}
    }else if(key === "isAdmin"){
      jsonObject = {"isAdmin":value}
    }
    console.log(jsonObject);
    try {
      let response = await fetch(URl_Update, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // token: token,
        },
        body: JSON.stringify(jsonObject),
      });
      let json = await response.json();
      setDeleteTrigger(json);
      console.log(json);
      setUpdateShow(false);
      // setLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  const deleteConfirm = async () => {
    setShow(false);
    try {
      let response = await fetch(URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // token: token,
        },
      });
      let json = await response.json();
      setDeleteTrigger(json);
      console.log(json);
      setAllShow(true);
      // handleDelete();
      // setLoading(false);
    } catch (error) {
      alert(error);
    }
  };
  const deleteCancel = () => {
    setShow(false);
    setUpdateShow(false);
  };

  const handleDelete = (id) => {
    setUserId(id);
    // setData(data.filter((item) => item.id !== id));
  };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "username",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {/* <img className="userListImg" src={params.row.avatar} alt="" /> */}
            <img
              className="userListImg"
              src={
                "https://gravatar.com/avatar/932f2d2e75e2483baab6befb7860b327?s=400&d=robohash&r=x"
              }
              alt="User Icon"
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 220 },
    {
      field: "isAdmin",
      headerName: "Admin or Not",
      width: 170,
      renderCell: (params) => {
        return (
          <>
            {params.row.isAdmin ? (
              <button
                className="userListEdit"
                onClick={() => {
                  setKeyData("isAdmin");
                  setValueData(false);
                  setUpdateShow(true);
                  setUpdateActivate(false);
                  setUserId(params.row._id);
                }}
                style={{ backgroundColor: "#87DD44" }}
              >
                True
              </button>
            ) : (
              <button
                className="userListEdit"
                onClick={() => {
                  setKeyData("isAdmin");
                  setValueData(true);
                  setUpdateShow(true);
                  setUpdateActivate(true);
                  setUserId(params.row._id);
                }}
                style={{ backgroundColor: "#bdba2c" }}
              >
                False
              </button>
            )}
          </>
        );
      },
    },
    {
      field: "isActivated",
      headerName: "User Activation",
      width: 170,
    },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <Link to={"/newUser"}>
              <button
                className="userListEdit"
                style={{ backgroundColor: "darkblue" }}
              >
                Create
              </button>
            </Link>
            {params.row.isActivated ? (
              <button
                className="userListEdit"
                onClick={() => {
                  setKeyData("isActivated");
                  setValueData(false);
                  setUpdateShow(true);
                  setUpdateActivate(false);
                  setUserId(params.row._id);
                }}
                style={{ backgroundColor: "red" }}
              >
                Deactivate
              </button>
            ) : (
              <button
                className="userListEdit"
                onClick={() => {
                  setKeyData("isActivated");
                  setValueData(true);
                  setUpdateShow(true);
                  setUpdateActivate(true);
                  setUserId(params.row._id);
                }}
                style={{ backgroundColor: "red" }}
              >
                Activate
              </button>
            )}
            <DeleteOutline
              className="userListDelete"
              onClick={() => {
                handleDelete(params.row._id);
                setShow(true);
              }}
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
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
      <SweetAlert
        show={show}
        warning
        showCancel
        confirmBtnText="Yes, Delete it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={deleteConfirm}
        onCancel={deleteCancel}
        focusCancelBtn
      >
        You will not be able to recover this imaginary file!
      </SweetAlert>

      <SweetAlert
        show={updateShow}
        warning
        showCancel
        confirmBtnText="Yes, Update it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={()=>{updateConfirm(keyData,valueData)}}
        onCancel={deleteCancel}
        focusCancelBtn
      >
        You will not be able to recover this imaginary file!
      </SweetAlert>

      <SweetAlert
        show={allShow}
        success
        title="Successfully delete!"
        // text="SweetAlert in React"
        onConfirm={() => setAllShow(false)}
      ></SweetAlert>

      <SweetAlert
        show={updateAllShow}
        success
        title="Successfully update!"
        // text="SweetAlert in React"
        onConfirm={() => setUpdateAllShow(false)}
      ></SweetAlert>
    </div>
  );
}
