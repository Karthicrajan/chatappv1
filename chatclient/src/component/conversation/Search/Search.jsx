import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setShow,  } from '../../../app/features/userAuth/chat';
import { setcurrentChat } from '../../../app/features/userAuth/chat';
function Search() {
    const conData = useSelector(state => state.chat.searchResult);
    const user = useSelector(state => state.userAuth.user);
    const sidebarVisible = useSelector((state) => state.chat.showSide);
    const dispatch = useDispatch();
    console.log(conData);
    const handleClick = async (val) =>{
      dispatch(setShow(!sidebarVisible))
        try{
            const res = await axios.post("http://localhost:5000/api/chat/accesschat",{
                user_id : user._id,
                userId : val._id
            })
            console.log(res);
            dispatch(setcurrentChat(res.data));
        }catch(err){
            console.log(err);
        }
    }
  return (
    <>
    {conData !== null ? (
        conData.map((item, index) => (
          <div key={item._id} value={item} onClick={() => handleClick(item)} className='conver pl-[10px] pr-[10px] pt-[10px] pb-[10px]  border-b-[1px] border-gray pl-[10px] cursor-pointer'>
                  <div key={index} className='flex gap-[10px]'>
                    <img src={item.profile} alt='User Profile' className='rounded-full w-[50px] h-[50px] object-cover ' />
                    <div>
                      <h1 className='text-lg font-medium'>{ item.userName }</h1>
                      <span className='text-sm'>{item.email}</span>
                    </div>
                  </div>
        
          </div>
        ))
      ) : (
        <h1>Search the person</h1>
      )}
      </>
  )
}

export default Search
