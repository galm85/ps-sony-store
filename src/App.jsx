import './App.css';
import { Route,Routes } from "react-router-dom";

import {Appbar,Footer} from './components'
import {Home,GamesCategories,ProductPage,Signin, Register} from './pages'


function App() {
  return (
   <div className="app">
     
     <Appbar/>
     <div className="main">
       <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/games" element={<GamesCategories/>} />
         <Route path="/games/:productTitle" element={<ProductPage/>} />
         <Route path="/signin" element={<Signin/>} />
         <Route path="/register" element={<Register/>} />
       </Routes>
     </div>
     <Footer/>
   </div>
  );
}

export default App;
