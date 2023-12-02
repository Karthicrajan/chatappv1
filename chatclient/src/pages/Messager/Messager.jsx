import React, { useEffect, useState } from 'react'
import Conversation from '../../component/conversation/Convesation/Conversation'
import Message from '../../component/conversation/Message/Message'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, setUser } from '../../app/features/userAuth/userAuthSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { setSearchResult, setchatrooms } from '../../app/features/userAuth/chat';
import Search from '../../component/conversation/Search/Search';
import io from "socket.io-client";
import EmptyMessage from '../../component/conversation/Message/EmptyMessage';
function Messager() {
  const user = useSelector(state => state.userAuth.user);
  const chats = useSelector(state => state.chat.chatrooms);
  const selectedChat = useSelector(state => state.chat.currentchat);
  const sidebarVisible = useSelector((state) => state.chat.showSide);
  const [searchval, setSearchVal] = useState();
  const [showCon,setShowCon] = useState(true);
  const dispatch = useDispatch();
  console.log(user.token);
  var socket;
  const ENDPOINT = "http://localhost:5000";
  const [socketConnection,setSocketConnected] = useState(false);
  socket = io(ENDPOINT);
  useEffect(() =>{
    socket.emit("setup",user);
    socket.on("connected",() =>{setSocketConnected(true)}); 
    
  },[])
  const handleSearch = (value) =>{
    console.log(value.target.value);
    setSearchVal(value.target.value);
   
    if(value.target.value.length >= 3){
    
    
    
    setShowCon(false);
    try{
      axios.get(`http://localhost:5000/api/auth/?search=${searchval}`,{
        headers:{
          'Authorization' : `Bearer ${user.token}`
        }
      }).then(res => {
        dispatch(setSearchResult(res.data));
      // console.log(res);
    })
    }catch(err){
      console.log(err);
    }
  }
    if(value.target.value.length  === 0){
      setShowCon(true);
    }
  }
  // console.log(chats);
  useEffect(() =>{
    const fetchAllCon = async () =>{
      try{
        axios.get(`http://localhost:5000/api/chat/fetch?userId=${user._id}`).then(res =>{
          dispatch(setchatrooms(res.data));
        })
      }catch(err){
        console.log(err);
      }
    }
    fetchAllCon();
  },[]);
  
  const handleLogOut = () =>{
    dispatch(logoutUser);
    dispatch(setUser(null));
    toast("Logout Successfully",{type:"success"})
    localStorage.removeItem("user");
  }
  
  return (
    <div>
    <div class="hidden lg:block">
      <div className='flex'>
      
      <div className='flex-1   flex-initial h-screen w-[30%] border-r-[1px] border-gray bg-[#f1f3f5]'>
        <div className='header  border-b-[1px] border-gray pl-[10px] pr-[10px] pt-[10px] pb-[10px] cursor-pointer'>
            <div className='flex gap-[10px]'>
              <div>
                
              </div>
              <img src={user.pic} className='rounded-full w-[46px] h-[46px]'/>
              <div>
                  <h1 className='text-lg '>{user.name}</h1>
                  <span className=' text-sm'>You</span>
              </div>
              <button type='submit' onClick={handleLogOut} className='block ring-gray-300 rounded-none bg-[#FF6000] h-fit p-[5px] text-white'>logout</button>
            </div>
            
        </div>
        <div className='pl-[10px] pr-[10px] pt-[10px] pb-[10px] border-b-[1px] border-gray'>
        <input placeholder='search' value={searchval} onChange={handleSearch} className='pl-[10px] block w-full rounded-md border-0 ring-inset ring-gray-300 ring-1 p-[5px]' type='text'></input>  
        </div>
        {/* userList */}
        <div> 
        <div className='h-[85vh] overflow-auto '>
         {showCon ? <Conversation/> : <Search/> } 
          
        </div>
        </div>
      </div>
      
      
      <div className='flex-1 relative'>
        {selectedChat != null ? <Message/> : <EmptyMessage/>}
        
      </div>

    </div>
    </div>
      
    <div className='lg:hidden'>
    <div className='flex flex-col lg:flex-row h-screen'>
      {/* Sidebar */}
      {sidebarVisible && (
        <div className='lg:w-[30%] w-full border-r-[1px] border-gray'>
          <div className='header border-b-[1px] border-gray pl-[10px] pr-[10px] pt-[10px] pb-[10px] cursor-pointer'>
          
            <div className='flex gap-[10px]'>
              <div>
                <img src={user.pic} className='rounded-full w-[46px] h-[46px]' alt='user-pic' />
              </div>
              <div>
                <h1 className='text-lg'>{user.name}</h1>
                <span className='text-sm'>You</span>
              </div>
              <button
                type='button'
                onClick={handleLogOut}
                className='block ring-gray-300 rounded-none bg-[#FF6000] h-fit p-[5px] text-white'
              >
                Logout
              </button>
            </div>
          </div>


          <div className='pl-[10px] pr-[10px] pt-[10px] pb-[10px] border-b-[1px] border-gray'>
            <input
              placeholder='Search'
              value={searchval}
              onChange={handleSearch}
              className='pl-[10px] block w-full rounded-md border-0 ring-inset ring-gray-300 ring-1'
              type='text'
            />
          </div>
          <div className='h-[85vh] overflow-auto'>{showCon ? <Conversation  /> : <Search />}</div>
        </div>
      )}

      {/* Main Content */}
      {!sidebarVisible && 
        <div className='flex-1 relative'>
        {selectedChat != null ? <Message /> : <EmptyMessage />}
      </div>
      }
      
    </div>
  

    </div>
    </div>
  )
}

export default Messager
