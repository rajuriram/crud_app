import React from "react";
import './App.css';
import { BrowserRouter,Link,Route, Routes } from 'react-router-dom';
import ShowData from './ShowData';
import Create from './Create';
import Home from './Home';
import Modify from "./Modify";

export default function App() {
 

  return ( <React.Fragment>
    <BrowserRouter>
    
      <nav className="navbar navbar-dark bg-dark">
        <span  className='navbar-brand'><Link to="/" >Home</Link></span>
        
      
        <span className='navbar-brand'>
        <Link to="/create" >Create Data</Link>
        </span>
        <span className='navbar-brand'>
        <Link to="/showData">Show Data</Link>
        </span>

      </nav>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/showData' element={<ShowData/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/modify/:userName/:userId" element={<Modify/>}/>
      </Routes>
    
    </BrowserRouter>
  </React.Fragment>
    
  );
}