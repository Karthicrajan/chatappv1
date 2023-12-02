import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setShow, setcurrentChat } from '../../../app/features/userAuth/chat';
import io from "socket.io-client";
const ENDPOINT = "http://localhost:5000";
var socket = io(ENDPOINT);
function Conversation() {
  const dispatch = useDispatch();
  const conData = useSelector(state => state.chat.chatrooms);
  const user = useSelector(state => state.userAuth.user);
  const sidebarVisible = useSelector((state) => state.chat.showSide);
 const handleClick = (item) =>{
  dispatch(setcurrentChat(item));
  dispatch(setShow(!sidebarVisible))
  console.log(sidebarVisible)
  console.log(item);
  // socket.emit("joinRoom",item._id);
 }
  
  return (
    <>
      {conData !== null ? (
        conData.map((item, index) => (
          <div key={index} onClick={() => handleClick(item)} className='conver pl-[10px] pr-[10px] pt-[10px] pb-[10px]  border-b-[1px] border-gray pl-[10px] cursor-pointer'>
            {item.users.map((i, innerIndex) => {
              if (i._id !== user._id) {
                return (
                  <div key={innerIndex} className='flex gap-[10px]'>
                    <img src={i.profile} alt='User Profile' className='rounded-full w-[50px] h-[50px] object-cover' />
                    <div>
                      <h1 className='text-lg font-medium'>{ i.userName }</h1>
                      <span className='text-sm'>{i.email}</span>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))
      ) : (
        <h1>Search the persons</h1>
      )}
    </>
  );
}

export default Conversation
