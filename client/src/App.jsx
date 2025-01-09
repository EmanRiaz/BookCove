
import React from "react";
import {  Routes, Route } from "react-router-dom";
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
 
function App(){     
  return (
    <>   
   <Header />

   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="*" element={<NotFoundPage/>}/>
    <Route path="/books" element={<Books/>}/>
    <Route path="/logout" element={<Logout/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="view-book-details/:id" element ={<ViewBookDetails/>}/>
   </Routes>
 <Footer />
    </>
  );
}

export default App;
 //directly export then have to accept it like an object.

 

/*

 import React from "react";
 import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
 import { Home } from "./screens/Home";
 import { Register } from "./screens/Register";
 import { Login } from "./screens/Login";
 import { Header } from "./components/common/Header";
 import { Footer } from "./components/common/Footer";
 import { Cart } from "./screens/Cart";
 import { Profile } from "./screens/Profile";
 import { Contact } from "./components/homeScreen/Contact";
 import { NotFoundPage } from "./screens/NotFoundPage";
 import { Logout } from "./screens/Logout";
 import { Books } from "./screens/Books";
 import { About } from "./components/homeScreen/About";
 import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
 
 function App() {
   const location = useLocation();
    // Hook should be used inside BrowserRouter
    const excludedPaths = [
      "/login",
      "/register"
    ]
    const hideFooter = !excludedPaths.includes(location.pathname);
 
   return (
     <>
        <BrowserRouter>

       <Header />
 
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
         <Route path="/profile" element={<Profile />} />
         <Route path="view-book-details/:id" element={<ViewBookDetails />} />
       </Routes>
 
       {hideFooter && <Footer />} 
       </BrowserRouter>

     </>
   );
 }
 
 export default App;
 
*/





 
 /*export default function AppWithRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}*/