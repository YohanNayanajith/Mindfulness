import { useState } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import { Link, useLocation } from "react-router-dom";
import "../user/user.css";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [color, setcolor] = useState([]);
  const [size, setSize] = useState([]);
  const [allShow, setAllShow] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };
  const handleColor = (e) => {
    setcolor(e.target.value.split(","));
  };
  const handleSize = (e) => {
    setSize(e.target.value.split(","));
  };

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
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
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
          const product = {
            ...inputs,
            img: downloadURL,
            categories: [...cat, "all"],
            color:color,
            size:size
          };
          addProduct(product, dispatch);
          setAllShow(true);
        });
      }
    );
  };

  return (
    <div className="newProduct">
      {/* <h1 className="addProductTitle">New Product</h1> */}
      <div className="userTitleContainer">
        <h1 className="addProductTitle">New Product</h1>
        <div className="userTitleButtons">
          <Link to={"/products"}>
            <button
              className="userAddButton"
              style={{ backgroundColor: "darkblue" }}
            >
              Back
            </button>
          </Link>
        </div>
      </div>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Apple Airpods"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Quantity</label>
          <input
            name="quantity"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input
            name="color"
            type="text"
            placeholder="red,green"
            onChange={handleColor}
          />
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input
            name="size"
            type="text"
            placeholder="XS,S,M,L"
            onChange={handleSize}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          {/* <input type="text" placeholder="jeans,skirts" onChange={handleCat} required /> */}
          <select name="category" onChange={handleCat}>
            <option value="all">All</option>
            <option value="books">Books</option>
            <option value="instructorSessions">Instructor Sessions</option>
            <option value="dvd">CDS/DVDs</option>
            <option value="essentialOils">Essential Oils</option>
            <option value="incenseSticks">Incense Sticks</option>
          </select>
        </div>
        <button onClick={handleClick} className="addProductButton" required>
          Create
        </button>
      </form>
      <SweetAlert
        show={allShow}
        success
        title="Successfully added!"
        // text="SweetAlert in React"
        onConfirm={() => setAllShow(false)}
      ></SweetAlert>
    </div>
  );
}
