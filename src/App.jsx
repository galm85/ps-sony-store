import './App.css';
import { Route,Routes } from "react-router-dom";
import {Appbar,Footer} from './components'
import {Home,GamesCategories,ProductPage,Signin, Register, Cart, Checkout, HardwareCategories, Profile, SearchPage, WishList, Services, News, SingleArticle, Support} from './pages';
import {Dashboard} from './admin';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  


  return (
   <div className="app">
     <Appbar/>
     <ToastContainer  />
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
         <Route path="/services" element={<Services/>} />
         <Route path="/news" element={<News/>} />
         <Route path="/news/:articleTitle" element={<SingleArticle/>} />
         <Route path="/support" element={<Support/>} />
         
         
         <Route path="/admin-panel/*" element={<Dashboard/>} />


       </Routes>
     </div>
     <Footer/>
   </div>
  );
}

export default App;
