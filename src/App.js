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
import { useEffect, useState } from 'react';

function App() {
  const [currentRoute,setCurrentRoute]=useState("");
  useEffect(()=>{
    let path=window.location.pathname.toLocaleLowerCase()
    setCurrentRoute(path.slice(1,path.length))
  },[])

  return (
    <BrowserRouter>
    <nav className='p-1 m-1 border border-info'>
      <ul className='nav na-pills'>
        <li>
          <Link className={currentRoute=="home"?"btn btn-info ms-1":"btn btn-outline-info ms-1"}  to={"/home"}>Home</Link>
        </li>
        <li>
          <Link className={currentRoute=="products"?"btn btn-info ms-1":"btn btn-outline-info ms-1"}  to={"/products"}>Products</Link>
        </li>
      </ul>
    </nav>
    <Routes>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/new" element={<New />}></Route>
      <Route path="/products" element={<Products />}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
