import "./OrderHistoryComponent.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import moment from "moment";

export default function OrderHistoryTest() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  const [updateAllShow, setUpdateAllShow] = useState(false);
  const [userId, setUserId] = useState("");
  const [deleteTrigger, setDeleteTrigger] = useState("");
  const [cartId, setCartId] = useState("");
  const currentDate = moment();

  const user = useSelector((state) => state.user.currentUser._id);
  const URL = `http://localhost:5000/api/v1/orders/find/${user}`;

  // IP address of local machine - 192.168.8.187
  useEffect(() => {
    setUserId(user.toString());
    // console.log(userId);

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
        // console.log(json);
        compareDate();
        // setLoading(false);
      } catch (error) {
        alert(error);
      }
    };
    userData();
  }, [deleteTrigger]);

  const compareDate = () => {
    // let future = moment("2022-08-07T15:35:20.624+00:00").format("HH:mm:ss");
    // let future = moment("2022-08-06T15:35:20.624+00:00").fromNow().toString();
    // console.log(future);
    let dataSet = moment("2022-08-07T15:35:20.624+00:00").format("HH:mm:ss");
    console.log(dataSet);
    // var date1 = new Date('2022-08-07T15:35:20.624+00:00');
    // console.log(date1.getTime());
    // data.map((item) => {
    let future = moment("2022-08-20T15:35:20.624+00:00");
    let future1 = moment("2022-08-04T15:35:20.624+00:00");
    let timeLeft = moment(future.diff("2022-08-09T15:35:20.624+00:00")).format(
      "d"
    );
    // let range = moment().range(future, future1);
    // console.log(range);
    var given = moment("2018-03-10", "YYYY-MM-DD");
    var current = moment().startOf("day");

    //Difference in number of days
    let result = moment.duration(currentDate.diff(future1)).asDays();
    console.log(result);
    console.log(current);
    //   // console.log(dateCompare);
    // });
  };

  // const URL = `http://localhost:5000/api/v1/carts/${cartId}`;

  const URl_Update = `http://localhost:5000/api/v1/orders/${cartId}`;

  const updateConfirm = async () => {
    // console.log("Update");
    try {
      let response = await fetch(URl_Update, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // token: token,
        },
        body: JSON.stringify({
          isCancel: true,
        }),
      });
      let json = await response.json();
      setDeleteTrigger(json);
      // console.log(json);
      setUpdateShow(false);
    } catch (error) {
      alert(error);
    }
  };

  const deleteCancel = () => {
    setShow(false);
    setUpdateShow(false);
  };

  const columns = [
    { field: "_id", headerName: "Order ID", width: 220 },
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
              >
                {params.row.status}
              </button>
            ) : params.row.status === "Accepted" ? (
              <button
                className="userListEdit"
                style={{ backgroundColor: "#87DD44" }}
              >
                {params.row.status}
              </button>
            ) : params.row.status === "In Warehouse" ? (
              <button
                className="userListEdit"
                style={{ backgroundColor: "#DD9A44" }}
              >
                {params.row.status}
              </button>
            ) : params.row.status === "Shipped" ? (
              <button
                className="userListEdit"
                style={{ backgroundColor: "#44A1DD" }}
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
            {/* {moment(params.row.createdAt).format('L')} */}
            {/* {moment(params.row.createdAt).format("L") + 2} */}
            {/* {moment(moment(params.row.createdAt).diff(currentDate)).format("HH:mm:ss") <= "24:00:00" ? ( */}
            {/* {moment(params.row.createdAt).fromNow() <= moment().format("L") ? ( */}
            {moment.duration(currentDate.diff(params.row.createdAt)).asDays() <= 2 ? (
              !params.row.isCancel ? (
                <button
                  className="userListEdit"
                  onClick={() => {
                    setUpdateShow(true);
                    setCartId(params.row._id);
                  }}
                  style={{ backgroundColor: "red" }}
                >
                  Cancel
                </button>
              ) : (
                <button
                  className="userListEdit"
                  style={{ backgroundColor: "red" }}
                >
                  Request Send
                </button>
              )
            ) : (
              <button
                className="userListEdit"
                style={{ backgroundColor: "grey" }}
                disabled
              >
                Expired
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
      {/* <SweetAlert
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
      </SweetAlert> */}

      <SweetAlert
        show={updateShow}
        warning
        showCancel
        confirmBtnText="Yes, Cancel Order!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={updateConfirm}
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
