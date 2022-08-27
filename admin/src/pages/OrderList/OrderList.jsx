import React from "react";
import "./OrderList.css";

import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function OrderList() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("Pending");
  const [isCancelStatus, setIsCancelStatus] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  const [updateActivate, setUpdateActivate] = useState("");
  const [updateAllShow, setUpdateAllShow] = useState(false);
  //   const [userId, setUserId] = useState("");
  const [userId, setUserId] = useState("");
  const [deleteTrigger, setDeleteTrigger] = useState([]);
  const [cartId, setCartId] = useState("");

  //   const user = useSelector((state) => state.user.currentUser._id);
  const URL = `http://192.168.8.187:5000/api/v1/orders/`;
  // const URL = `http://192.168.8.187:5000/api/v1/carts/find/${user}`;
  // const [data, setData] = useState(userRows);

  // IP address of local machine - 192.168.8.187
  useEffect(() => {
    const userData = async () => {
      try {
        let response = await fetch(URL, {
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

  // const URL = `http://localhost:5000/api/v1/carts/${cartId}`;

  const URl_Update = `http://localhost:5000/api/v1/orders/${cartId}`;

  const updateConfirm = async (keyPair,value) => {
    console.log("Update");
    // setUpdateActivate(keyPair);
    let jsonObject;
    if(keyPair === "status"){
        jsonObject = {"status":value}
    }else if(keyPair === "isCancel"){
        jsonObject = {"isCancel":value}
    }
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
    } catch (error) {
      alert(error);
    }
  };

  const orderUpdate = () => {
    setShow(false);
    if(status === "Pending"){
        setStatus("Accepted");
    }else if(status === "Accepted"){
        setStatus("In Warehouse");
    }else if(status === "In Warehouse"){
        setStatus("Shipped");
    }else if(status === "Shipped"){
        setStatus("Completed");
    }else {
        setStatus("Cancel");
    }
    updateConfirm("status",status);
  }

  const deleteCancel = () => {
    setShow(false);
    setUpdateShow(false);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "title",
      headerName: "Product Name",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={params.row.img}
              alt="category Icon"
            />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "quantity", headerName: "Quantity", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    {
      field: "staus",
      headerName: "Order Status",
      width: 220,
      renderCell: (params) => {
        return (
          <>
            {params.row.status === "Pending" ? (
              <button
                className="userListEdit"
                style={{ backgroundColor: "#bdba2c" }}
                onClick={() => {
                  setCartId(params.row._id);
                  setStatus("Accepted");
                  setShow(true);
                }}
              >
                {params.row.status}
              </button>
            ) : params.row.status === "Accepted" ? (
              <button
                className="userListEdit"
                style={{ backgroundColor: "#87DD44" }}
                onClick={() => {
                    setCartId(params.row._id);
                    setStatus("In Warehouse");
                    setShow(true);
                  }}
              >
                {params.row.status}
              </button>
            ) : params.row.status === "In Warehouse" ? (
              <button
                className="userListEdit"
                style={{ backgroundColor: "#DD9A44" }}
                onClick={() => {
                    setStatus("Shipped");
                    setCartId(params.row._id);
                    setShow(true);
                  }}
              >
                {params.row.status}
              </button>
            ) : params.row.status === "Shipped" ? (
              <button
                className="userListEdit"
                style={{ backgroundColor: "#44A1DD" }}
                onClick={() => {
                    setCartId(params.row._id);
                    setStatus("Completed");
                    setShow(true);
                  }}
              >
                {params.row.status}
              </button>
            ) : params.row.status === "Completed" ? (
              <button
                className="userListEdit"
                style={{ backgroundColor: "#69DD44" }}
              >
                {params.row.status}
              </button>
            ) : (
              <button
                className="userListEdit"
                style={{ backgroundColor: "red" }}
              >
                {params.row.status}
              </button>
            )}
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            {!params.row.isCancel ? (
              <button
                className="userListEdit"
                onClick={() => {
                  setUpdateShow(true);
                  setCartId(params.row._id);
                  setIsCancelStatus(false);
                }}
                style={{ backgroundColor: "red" }}
              >
                Cancel
              </button>
            ) : (
              <button
                className="userListEdit"
                style={{ backgroundColor: "red" }}
                onClick={() => {
                    setUpdateShow(true);
                    setCartId(params.row._id);
                    setIsCancelStatus(true);
                  }}
              >
                Request Received
              </button>
            )}
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
        pageSize={10}
        checkboxSelection
        autoHeight
      />
      <SweetAlert
        show={show}
        warning
        showCancel
        confirmBtnText="Yes, Update it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={orderUpdate}
        onCancel={deleteCancel}
        focusCancelBtn
      >
        You will not be able to recover this imaginary file!
      </SweetAlert>

      <SweetAlert
        show={updateShow}
        warning
        showCancel
        confirmBtnText="Yes, Cancel Order!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={() => {
            if(isCancelStatus === true){
                updateConfirm("status","Cancel");
            }else {
                updateConfirm("isCancel",true);
            }
            
        }}
        onCancel={deleteCancel}
        focusCancelBtn
      >
        You will not be able to recover this imaginary file!
      </SweetAlert>

      {/* <SweetAlert
        show={allShow}
        success
        title="Successfully delete!"
        // text="SweetAlert in React"
        onConfirm={() => setAllShow(false)}
      ></SweetAlert> */}

      <SweetAlert
        show={updateAllShow}
        success
        title="Request Send!"
        // text="SweetAlert in React"
        onConfirm={() => setUpdateAllShow(false)}
      ></SweetAlert>
    </div>
  );
}
