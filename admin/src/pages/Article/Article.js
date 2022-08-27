import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import "../user/user.css";
import SweetAlert from "react-bootstrap-sweetalert";

export default function Article() {
  const location = useLocation();
  const articleId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const [data, setData] = useState([]);
  const [formSaveData, setFormSaveData] = useState([]);
  const [show, setShow] = useState(false);

  const URL = `http://localhost:5000/api/v1/article/find/${articleId}`;

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
  }, []);

  const URL_update = `http://localhost:5000/api/v1/article/${articleId}`;

  const updateUser = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formNewData = {
      title: formData.get("title"),
      desc: formData.get("desc"),
      img: formData.get("img"),
      categories: ["all",formData.get("categories")],
    };
    console.log(formNewData);
    setFormSaveData(formNewData);
    setShow(true);
  };

  const updateConfirm = async () => {
    setShow(false);
    if (!formSaveData.title) {
      formSaveData.title = data.title;
    } 
    if (!formSaveData.desc) {
      formSaveData.desc = data.desc;
    } 
    if (!formSaveData.img) {
      formSaveData.img = data.img;
    }
    try {
      let response = await fetch(URL_update, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // token: token,
        },
        body: JSON.stringify({
          title: formSaveData.title,
          desc: formSaveData.desc,
          img: formSaveData.img,
          categories: formSaveData.categories,
        }),
      });
      let json = await response.json();
      setData(json);
      console.log(json);
      // setLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  const updateCancel = () => {
    setShow(false);
    console.log("Update cancel");
  };

  return (
    <div className="userArticle">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit Article</h1>
        <div className="userTitleButtons">
          <Link to={"/article"}>
            <button
              className="userAddButton"
              style={{ marginRight: "20px", backgroundColor: "darkblue" }}
            >
              Back
            </button>
          </Link>

          <Link to={"/newarticle"}>
            <button className="userAddButton">Create</button>
          </Link>
        </div>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://gravatar.com/avatar/932f2d2e75e2483baab6befb7860b327?s=400&d=robohash&r=x"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{data.title}</span>
              <span className="userShowUserTitle">
                {data.isActivate ? "Active" : "Not Active"}
              </span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{data.title}</span>
            </div>
            {/* <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">{data.dateOfBirth}</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">{data.phoneNo}</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{data.email}</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">{data.address}</span>
              </div> */}
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={updateUser}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Title of Article</label>
                <input
                  name="title"
                  id="title"
                  type="text"
                  placeholder={data.title}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Description</label>
                <input
                  name="desc"
                  id="desc"
                  type="text"
                  placeholder={data.desc}
                  className="userUpdateInput"
                />
              </div>
              {/* <div className="userUpdateItem">
                <label>Activate Article</label>
                <select
                  className="userUpdateInput"
                  name="isActivate"
                  id="isActivate"
                  // placeholder={data.isActivate}
                >
                  <option value="true">Active</option>
                  <option value="false">Not Active</option>
                </select>
              </div> */}
              <div className="userUpdateItem">
                <label>Video Link</label>
                <input
                  name="img"
                  id="img"
                  type="text"
                  placeholder={data.img}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Category</label>
                <select
                  className="userUpdateInput"
                  name="categories"
                  id="categories"
                  required
                  // placeholder={data.categories}
                >
                  <option value="Books">Books</option>
                  <option value="Instructor Sessions">Instructor Sessions</option>
                  <option value="CDS/DVDs">CDS/DVDs</option>
                  <option value="Essential Oils">Essential Oils</option>
                  <option value="Incense Sticks">Incense Sticks</option>
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
              {/* <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div> */}
              <button className="userUpdateButton" style={{padding:10}} type={"submit"}>
                Update
              </button>
              <SweetAlert
                show={show}
                warning
                showCancel
                confirmBtnText="Yes, update it!"
                confirmBtnBsStyle="danger"
                title="Are you sure?"
                onConfirm={updateConfirm}
                onCancel={updateCancel}
                focusCancelBtn
              >
                You will not be able to recover this imaginary file!
              </SweetAlert>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
