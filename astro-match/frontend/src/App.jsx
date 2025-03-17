import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout/MainLayout";
import Home from "./pages/Home/home";
import Register from "./components/Register/register";
import Login from "./components/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Chat from "./pages/Chat/Chat";
import {ChatContextProvider} from "./context/chatContext"
import { useAuth } from "./context/AuthContext";
import AdminLayout from "./layout/AdminLayout/AdminLayout"
const App = () => {
  
  const {user} = useAuth()
  console.log("user",user);
  return (
    <ChatContextProvider user={user}>

  <Routes>
    <Route path="/" element={<MainLayout/>}>
      <Route index element={<Home/>}/>
      <Route path="/register" element={<Register />} />
      {/* <Route path="/register" element={u ser ?<Chat/> : <Register/>} /> */}
      <Route path="/Home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/chat" element={<Chat />} /> {/* Yeni Chat Route */}
    </Route>

    <Route path="/admin" element={<AdminLayout/>}></Route>

  </Routes>
    </ChatContextProvider>
  );
};

export default App;
