import React from 'react';

// // import components

// export function Home() {
//     return (
//         <div>
//             <Profile />
//             <AllPosts />
//             <Friends />
//             <Chat />
//         </div>
//     );
// }
//import { div, useMediaQuery } from "@mui/material";
//import { useSelector } from "react-redux";


const HomePage = () => {
  //const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  //const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <div>
     <header> Catch Up Home Page </header>
     <nav>
    <a href="#">Notifications </a>
    <a href="#">Messages </a>
    <a href="#">Friends </a>
    <input type="search" id="search" placeholder='search for friends'></input>
   
   </nav>
   </div>
   
  );
};

export default HomePage;