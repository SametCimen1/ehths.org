// import React from 'react'
// import {useEffect, useState} from 'react';
// import Logo from '../../../img/logo.png'
// import style from './shortpost.module.scss'

// export default function ShortPost({post}) {
//     const [img, setImg] = useState("")

//     const getImg = async() => {
//       const data = await fetch("/user/getimg", {
//         method:"POST",
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         redirect: 'follow',
//         credentials: 'include',
//         body:JSON.stringify({
//             userid:post.userid
//         })
//       });

//       const response = await data.json();
//       if(response.ownimg === false){
//         setImg("")
//       }
//       else{
//         setImg(response.image)
//       }
      
//     }

//     useEffect(()=>{
//       getImg();
//     },[])
//     return (
//         <div className = {style.postContainer}>
//             <div className = {style.userInformation}>
//             {img === "" ? <img className = {`${style.img} ${"profileImg"}`} src = {Logo}></img> : <img className = {`${style.img} ${"profileImg"}`} src = {`/img/${img}`}></img>}
              
//               <p>{post.username}</p>
//             </div>
//             <div className = {style.paragraph}>
//                 <p className = {style.subject}><span>Subject</span>: {post.subject}</p>
//                 <p className = {style.text}>{post.paragraph}</p>
//             </div>
//         </div>
//     )
// }
