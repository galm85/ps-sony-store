import './App.css';
import { Route,Routes } from "react-router-dom";
import {Appbar,Footer} from './components'
import {Home,GamesCategories,ProductPage,Signin, Register, Cart, Checkout, HardwareCategories, Profile, SearchPage, WishList, Services, News, SingleArticle, Support, OrderAccepted} from './pages';
import {Dashboard} from './admin';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as React from 'react';



function App() {


  return (
   <div className="app">
     <Appbar/>
     
     <ToastContainer  />
     <div className="main">

      <div style={{position:'fixed',zIndex:'-2',opacity:'0.1'}}>
        <img src="/images/background.png" alt="background image" style={{width:'100%',height:'100%'}} />
      </div>
     
       <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/games" element={<GamesCategories/>} />
         <Route path="/games/:productTitle" element={<ProductPage/>} />
         <Route path="/hardware" element={<HardwareCategories/>} />
         <Route path="/cart" element={<Cart/>} />
         <Route path="/checkout" element={<Checkout/>} />
         <Route path="/signin" element={<Signin/>} />
         <Route path="/register" element={<Register/>} />
         <Route path="/profile" element={<Profile/>} />
         <Route path="/search/:value" element={<SearchPage/>} />
         <Route path="/wish-list" element={<WishList/>} />
         <Route path="/services" element={<Services/>} />
         <Route path="/news" element={<News/>} />
         <Route path="/news/:articleTitle" element={<SingleArticle/>} />
         <Route path="/support" element={<Support/>} />
         <Route path="/order-accepted" element={<OrderAccepted/>} />
         
         
         <Route path="/admin-panel/*" element={<Dashboard/>} />


       </Routes>
     </div>
     <Footer/>
   </div>
  );
}

export default App;
