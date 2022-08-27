import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useForm } from "react-hook-form";
import "../newUser/newUser.css";
import "../user/user.css";

export default function NewArticle() {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const [data, setData] = useState([]);
  const [formSaveData, setFormSaveData] = useState([]);
  const [show, setShow] = useState(false);
  const [allShow, setAllShow] = useState(false);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  // const URL = `http://localhost:5000/api/v1/user/find/${userId}`;

  // useEffect(() => {
  //   const userData = async () => {
  //     try {
  //       let response = await fetch(URL, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           // token: token,
  //         },
  //       });
  //       let json = await response.json();
  //       setData(json);
  //       console.log(json);
  //       // setLoading(false);
  //     } catch (error) {
  //       alert(error);
  //     }
  //   };
  //   userData();
  // }, []);

  const URL_create = "http://localhost:5000/api/v1/article";

  const createUser = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
    const formNewData = {
      title: formData.get("title"),
      desc: formData.get("desc"),
      img: formData.get("img"),
      categories: ["all", formData.get("categories")],
    };
    setFormSaveData(formNewData);
    setShow(true);
    // createConfirm();
  };

  const createConfirm = async () => {
    setShow(false);
    try {
      let response = await fetch(URL_create, {
        method: "POST",
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
      setAllShow(true);
      // setLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  const createCancel = () => {
    setShow(false);
    console.log("Update cancel");
  };

  return (
    <div className="newUser">
      {/* <h1 className="newUserTitle">New User</h1> */}

      <div className="userTitleContainer">
        <h1 className="userTitle">New Article</h1>
        <div className="userTitleButtons">
          <Link to={"/article"}>
            <button className="userAddButton">Back</button>
          </Link>
        </div>
      </div>

      {/* <form onSubmit={handleSubmit(onSubmit)} className="newUserForm">
      <div className="newUserItem">
          <label>Username</label>
          <input {...register("firstName", { required: true, maxLength: 20 })} />
        </div>
        
        <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
        <input type="number" {...register("age", { min: 18, max: 99 })} />
        <input type="submit" />
      </form> */}

      <SweetAlert
        show={allShow}
        success
        title="Successfully added!"
        // text="SweetAlert in React"
        onConfirm={() => setAllShow(false)}
      ></SweetAlert>

      <form className="newUserForm" onSubmit={createUser}>
        <div className="newUserItem">
          <label>Title of Article</label>
          <input
            name="title"
            id="title"
            type="text"
            placeholder="Legend of Five"
            required
          />
        </div>
        <div className="newUserItem">
          <label>Description</label>
          <textarea
            name="desc"
            id="desc"
            type="text"
            placeholder="There is something...."
            required
          />
        </div>
        <div className="newUserItem">
          <label>Video Link</label>
          <input
            name="img"
            id="img"
            type="text"
            placeholder="https://youtu.be/8P0vKLHbtMg?list=RD8P0vKLHbtMg"
            required
          />
        </div>

        <div className="newUserItem">
          <label>Category</label>
          <select
            className="newUserSelect"
            name="categories"
            id="categories"
            required
          >
            <option value="mindfulnesss">Mindfulnesss</option>
            <option value="yoga">Yoga</option>
            {/* <option value="CDS/DVDs">CDS/DVDs</option>
            <option value="Essential Oils">Essential Oils</option>
            <option value="Incense Sticks">Incense Sticks</option> */}
          </select>
        </div>

        <button type="submit" className="newUserButton">
          Create
        </button>
        <SweetAlert
          show={show}
          warning
          showCancel
          confirmBtnText="Yes, Create it!"
          confirmBtnBsStyle="danger"
          title="Are you sure?"
          onConfirm={createConfirm}
          onCancel={createCancel}
          focusCancelBtn
        >
          You will not be able to recover this imaginary file!
        </SweetAlert>
      </form>
    </div>
  );
}
