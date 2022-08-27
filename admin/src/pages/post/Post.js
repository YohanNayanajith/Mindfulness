// import React, { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import { DataGridPro } from "@mui/x-data-grid-pro";
// import { useDemoData } from "@mui/x-data-grid-generator";
import "./Post.css";

// const Post = () => {

//   const [userAboutData,setUserAboutData] = useState([]);

//   useEffect(()=>{
//     const userData = async () => {
//       try {
//         let response = await fetch("http://localhost:5000/api/v1/user", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             // token: token,
//           },
//         });
//         let json = await response.json();
//         setUserAboutData(json);
//         console.log(json);
//         // setLoading(false);
//       } catch (error) {
//         alert(error);
//       }
//     }
//     userData();
//   },[]);

//   const { data } = useDemoData({
//     dataSet: "Commodity",
//     rowLength: 100000,
//     editable: true,
//   });

//   return (
//     <div className="postContainer">
//       <Box sx={{ height: 520, width: "100%" }}>
//         <DataGridPro
//           {...data}
//           loading={data.rows.length === 0}
//           rowHeight={38}
//           checkboxSelection
//           disableSelectionOnClick
//         />
//       </Box>
//     </div>
//   );
// };

// export default Post;

import React from 'react'

const Post = () => {
  return (
    <div className='postContainer'>Post</div>
  )
}

export default Post
