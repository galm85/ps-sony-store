import './App.css';
import { Route,Routes } from "react-router-dom";
import {Appbar,Footer} from './components'
import {Home,GamesCategories,ProductPage,Signin, Register, Cart, Checkout, HardwareCategories, Profile, SearchPage, WishList, Services, News, SingleArticle, Support} from './pages';
import {Dashboard} from './admin';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as React from 'react';


const RenderBackgraund = ()=>{
  const shapes = ['tri','x','circle','square'];
  const images =[];

  for(let i = 1;i<10;i++){
    let randShape =  Math.floor(Math.random() * 4);
    let randomTop = ( i *10 );
    // let randomLeft = ( i *23 );
    // let randomTop =   (Math.floor(Math.random() *i *100));
    let randomLeft =   (Math.floor(Math.random() * 100));
    let shape = shapes[randShape];
    images.push({shape,randomTop,randomLeft});
  }
    console.log(images);
    return (
      <div style={{width:'100%',height:'100vh',position:'fixed',zIndex:'-2',opacity:'0.3'}}>
          {images.map((item,index)=>(
            <img key={index} src={`/images/${item.shape}.png`} style={{position:'absolute',top:`${item.randomTop}%`,left:`${item.randomLeft}%`,width:'500px'}}/>
          ))}
      </div>
    )
            
  
  
}


function App() {

  
React.useEffect(()=>{
  RenderBackgraund();
},[])

  return (
   <div className="app">
     <Appbar/>
     
     <ToastContainer  />
     <div className="main">

      <div style={{position:'fixed',zIndex:'-2',opacity:'0.1'}}>
        <img src="/images/background.png" alt="background image" style={{width:'100%',height:'100%'}} />
      </div>
     

       {/* <div id="background" style={{position:'fixed',width:'100%',height:'100%',zIndex:'-2'}}>

     <img src="/images/square.png" style={{position:'absolute',top:'56%',zIndex:'-5',left:'6%'}} />
     <img src="/images/x.png" style={{position:'absolute',top:'19%',zIndex:'-6',left:'53%'}} />
     <img src="/images/tri.png" style={{position:'absolute',top:'41%',zIndex:'-7',left:'13%'}} />
     <img src="/images/circle.png" style={{position:'absolute',top:'99%',zIndex:'-8',left:'26%'}} />
     <img src="/images/tri.png" style={{position:'absolute',top:'89%',zIndex:'-9',left:'69%'}} />
     <img src="/images/circle.png" style={{position:'absolute',top:'90%',zIndex:'-10',left:'90%'}} />
     <img src="/images/x.png" style={{position:'absolute',top:'57%',zIndex:'-11',left:'90%'}} />



       </div> */}
     
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
