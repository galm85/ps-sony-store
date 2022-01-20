import './App.css';
import { Route,Routes } from "react-router-dom";

import {Appbar,Footer} from './components'
import {Home,GamesCategories,ProductPage,Signin, Register, Cart, Checkout, HardwareCategories, Profile, SearchPage, WishList} from './pages';
import {Dashboard} from './admin';


function App() {
  return (
   <div className="app">
     
     <Appbar/>
     <div className="main">
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
         
         
         <Route path="/admin-panel/*" element={<Dashboard/>} />


       </Routes>
     </div>
     <Footer/>
   </div>
  );
}

export default App;
