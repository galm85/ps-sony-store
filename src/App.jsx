import './App.css';
import Appbar from './components/appbar';
import { Route,Routes } from "react-router-dom";
import Home from './pages/home';
import Footer from './components/footer';

function App() {
  return (
   <div className="app">
     
     <Appbar/>
     <div className="main">
       <Routes>
         <Route path="/" element={<Home/>} />
       </Routes>
     </div>
     <Footer/>
   </div>
  );
}

export default App;
