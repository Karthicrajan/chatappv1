import logo from './logo.svg';
import './App.css';
import Messager from './pages/Messager/Messager';
import Login from './pages/Messager/Login/Login';
import { BrowserRouter, Route, Router, Routes, json } from 'react-router-dom';
import Register from './pages/Messager/Register/Register';
import Message from './component/conversation/Message/Message';
import 'react-toastify/dist/ReactToastify.css';
import { setUser } from "../src/app/features/userAuth/userAuthSlice";
// Import the necessary components in your React component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setcurrentChat } from './app/features/userAuth/chat';

function App() {
  const user = useSelector(state => state.userAuth.user);
  const dispatch = useDispatch();
  const userData = localStorage.getItem('user');
  useEffect(() =>{
    console.log("from may store ");
    dispatch(setcurrentChat(null));
    dispatch(setUser(JSON.parse(userData)));
 
  },[userData]);
   console.log(user);
  return (
    <BrowserRouter>
    <ToastContainer />
    <Routes>
      <Route path='/' element={ user ? <Messager/> :  <Login/>}/>
      <Route path='/login' element={ user ? <Messager/> :  <Login/>}/>
      <Route path='/Register' element={!user ? <Register/> : <Messager/>}/>
      <Route path='/home' element={!user ? <Login/> : <Messager/>}/>
    </Routes> 
    </BrowserRouter>
    
    // <Login/>
  );
}

export default App;
