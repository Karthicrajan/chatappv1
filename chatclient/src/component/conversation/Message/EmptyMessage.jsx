import React from 'react'

function EmptyMessage() {
  return (
    <div className='msg-pg'>
    <div className='header border-b-[1px] border-gray pl-[10px] pr-[10px] pt-[10px] pb-[10px]'>
    
    
    <div className='sender  bg-gray absolute w-[100%] bottom-0 p-[16px] flex border-t-[1px] gap-[10px]'>
      {/* <input type='text' value={message} onChange={(e) => setMessage(e.target.value)} className='w-[100%]  block w-full rounded-md border-0 ring-inset ring-gray-300 ring-1 p-[10px]' placeholder='Type message'></input>
      <button type='submit' onClick={sendHandler}  className='block ring-gray-300 rounded-none bg-[#FF6000] p-[10px] text-white'>Send</button> */}
      <h1>Select Any profiles</h1>
    </div>
    </div>
</div>
  )
}

export default EmptyMessage
