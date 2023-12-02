import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setShow, setsltmessage } from '../../../app/features/userAuth/chat';
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000/";
// const ENDPOINT = "http://192.168.139.133:5000/";
var socket = io(ENDPOINT);
function Message() {
  const sidebarVisible = useSelector((state) => state.chat.showSide);
  const currentct = useSelector(state => state.chat.currentchat);
  const user = useSelector(state => state.userAuth.user);
  const sltmsg = useSelector(state => state.chat.messageSlt);
  const [message,setMessage] = useState();
  const dispatch = useDispatch();

  const fetchSelectMsg = async() =>{
    try{
        axios.get(`http://localhost:5000/api/message/fetchmessage?chatId=${currentct._id}`).then(res =>{
          
          dispatch(setsltmessage(res.data));
        })
      
    }catch(err){
      console.log(err);
    }
  }
    useEffect(()=>{
    
      
     fetchSelectMsg();
    
    
    },[currentct])
   
   const sendHandler = async () =>{
    console.log(message);
    try{
      
      const res = await axios.post("http://localhost:5000/api/message/createmessage",{
        userId : user._id,
        message : message,
        chatId : currentct._id
      })
      socket.emit("newMessage",currentct._id);
      
      fetchSelectMsg();
      
      setMessage("");
      console.log(res);
    }catch(err){
      console.log(err);
    }
   }
 
  useEffect(() =>{
    socket.emit("joinRoom",currentct._id);
    socket.on('recevedMessage', () => {
      console.log('Message received');
      fetchSelectMsg();
    });

    
    
  },[currentct])
  const messageContainerRef = useRef(null);
  useEffect(() => {
    // Scroll to the latest message when messages change
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [currentct]);
  return (
    <div className='msg-pg'>
          <div className='header border-b-[1px] border-gray pl-[10px] pr-[10px] pt-[10px] pb-[10px]'>
          <i class="lg:hidden fa-solid fa-arrow-left" onClick={() => dispatch(setShow(!sidebarVisible))}></i>
          {currentct.users.map((i,index) => {
            if(i._id != user._id) {
              return (
                
              <div key={index} className='flex gap-[10px]'>
                
              <img src={i.profile} className='rounded-full w-[46px] h-[46px] object-cover'/>
              <div>
                <h1 className='text-lg font-medium'>{i._id !== user._id ? i.userName : ""}</h1>
                <span className='text-sm'>online</span>
              </div>
              </div>
              )
            }else{
              <h1>help</h1>
            }
            
          })}
          </div>
          <div className='h-[82vh] overflow-auto' >
          {sltmsg !== null ? (
          sltmsg.map((item,index) => {
            if(item.content){
                if(item.sender._id === user._id){
                  return (
                    <div key={index} className='msg-container pr-[25px] pl-[25px] mt-[10px] flex justify-end'>
                    <div className='m-w[85%] bg-[#F5F7F8] w-fit p-[10px]'>
                      <h1>{item.content}</h1>
                    </div>
                  </div>
                  )
                }else{
                  return (
                    <div key={index} className='messages max-h-[80vh] overflow-auto'>
                    <div className='msg-container pr-[25px] pl-[25px] mt-[10px]'>
                      <div className='m-w[85%] bg-[#FFE6C7] w-fit p-[10px]'>
                        <h1>{item.content}</h1>
                      </div>
                    </div>
                  </div>
                  )
                }
              
            }
          })
          ): <h1></h1>
          }
           </div>
          
          <div className='sender  bg-gray absolute w-[100%] bottom-0 p-[16px] pt-0 flex border-t-[1px] gap-[10px]'>
            <input type='text' value={message} onChange={(e) => setMessage(e.target.value)} className='w-[100%]  block w-full rounded-md border-0 ring-inset ring-gray-300 ring-1 p-[10px]' placeholder='Type message'></input>
            <button type='submit' onClick={sendHandler}  className='block ring-gray-300 rounded-none bg-[#FF6000]  p-[10px] text-white'>Send</button>
          </div>
    </div>
  )
}

export default Message
