 import React ,{ useEffect }from "react";
 import  {Routes, Route, useLocation } from "react-router-dom";
 import  {Home} from "./screens/Home";
import {Register} from "./screens/Register";
import {Login} from "./screens/Login";
import {Header} from "./components/common/Header";
import {Footer} from "./components/common/Footer";
import {Cart} from "./screens/Cart";
import {Profile} from "./screens/Profile";
import {Contact} from "./components/homeScreen/Contact";
import {NotFoundPage} from "./screens/NotFoundPage";
import { Logout } from "./screens/Logout";  
import { Books } from "./screens/Books";  
import{About } from "./components/homeScreen/About";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./redux/slices/authSlice";
import {Favourites} from "./components/Profile/Favourites"
import {Settings} from "./components/Profile/Settings"
import {UserOrderHistory} from "./components/Profile/UserOrderHistory"

 function App() {
  const dispatch=useDispatch();
  const role=useSelector((state)=>state.auth.role);
  console.log(role)
  useEffect(()=>{
    if(
      localStorage.getItem("userId")&&
      localStorage.getItem("token")&&
      localStorage.getItem("role")
    ){
      dispatch(authActions.setUser());
      dispatch(authActions.changeRole(localStorage.getItem("role")));

    }
  },[]);
   const location = useLocation();
    const excludedPaths = [
      "/login",
      "/register"
    ]
    const hideFooter = !excludedPaths.includes(location.pathname);
  return (
     <>
       {hideFooter && <Header />} 
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/register" element={<Register />} />
         <Route path="/login" element={<Login />} />
         <Route path="/contact" element={<Contact />} />
         <Route path="*" element={<NotFoundPage />} />
         <Route path="/books" element={<Books />} />
         <Route path="/logout" element={<Logout />} />
         <Route path="/about" element={<About />} />
         <Route path="/cart" element={<Cart />} />
         <Route path="/profile" element={<Profile />} >
         <Route index element={<Favourites/>}/>{/*By default move to favourites page*/}
         <Route path="/profile/orderHistory" element ={<UserOrderHistory/>}/>
         <Route path="/profile/settings" element ={<Settings/>}/>

         </Route>
         <Route path="view-book-details/:id" element={<ViewBookDetails />} />
       </Routes>
       {hideFooter && <Footer />} 
     </>
   );
 }
 export default App;
  //directly export then have to accept it like an object.





 
