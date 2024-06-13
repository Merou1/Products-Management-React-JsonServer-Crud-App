import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Home from './Components/Home';
import New from './Components/New';
import Products from './Components/Products';
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet, Link } from "react-router-dom";
import { useState } from 'react';

function App() {
  const [currentRoute,setCurrentRoute]=useState("");


  return (
    <BrowserRouter>
    <nav className='p-1 m-1 border border-info'>
      <ul className='nav na-pills'>
        <li>
          <Link className={currentRoute=="Home"?"btn btn-info ms-1":"btn btn-outline-info ms-1"}  onClick={() => setCurrentRoute("Home")} to={"/Home"}>Home</Link>
        </li>
        <li>
          <Link className={currentRoute=="Products"?"btn btn-info ms-1":"btn btn-outline-info ms-1"} onClick={() => setCurrentRoute("Products")} to={"/Products"}>Products</Link>
        </li>
      </ul>
    </nav>
    <Routes>
      <Route path="/Home" element={<Home />}></Route>
      <Route path="/New" element={<New />}></Route>
      <Route path="/Products" element={<Products />}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
