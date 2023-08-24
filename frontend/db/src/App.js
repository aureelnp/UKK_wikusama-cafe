import React from "react";
import Menu from "./pages/menu";
import Login from "./pages/login";
import Transaksi from "./pages/transaksi";
import { Router, Routes, BrowserRouter, Route } from "react-router-dom";
import Middleware from "./pages/middleware";
import Sidebar from "./pages/sidebar";
import Meja from "./pages/Meja";
import User from "./pages/user";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/menu" element={
          <Middleware roles={[`admin`, 'manajer']}><Sidebar title="Daftar Menu"><Menu /></Sidebar></Middleware>
        }></Route>

        <Route path="/login" element={<Login />}></Route>

        <Route path="/transaksi" element={
          <Middleware roles={[`kasir`,'manajer']}><Sidebar title="Daftar Transaksi"><Transaksi /></Sidebar></Middleware>
        }></Route>

        <Route path="/test" element={<Sidebar />}></Route>

        <Route path="/meja" element={
          <Middleware roles={[`admin`, 'manajer']}><Sidebar title="Daftar Meja"><Meja /></Sidebar></Middleware>
        }></Route>

        <Route path="/user" element={
          <Middleware roles={[`admin`, 'manajer']}><Sidebar title="Daftar User"><User /></Sidebar></Middleware>
        }></Route>
      </Routes>

    </BrowserRouter>
  )
}





















// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
