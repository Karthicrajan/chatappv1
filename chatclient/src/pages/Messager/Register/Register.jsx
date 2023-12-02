import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from "../../../app/features/userAuth/userAuthSlice";
function Register() {
  const[username,setUserName] = useState("");
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[profile,setProfile] = useState();
  const[pic,setPic] = useState();
  const[isload,setload] = useState(false);

  const dispatch = useDispatch();
  const uploadimg = (file) =>{
    setload(true);
    if(file == undefined){
      toast("Upload image",{type : 'warning'});
    }
    if(file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'){
      
      const data = new FormData();
      data.append("file",file);
      data.append("upload_preset", "chat-app");

      data.append("cloud_name","karthicchat");
      console.log(data);
      fetch("https://api.cloudinary.com/v1_1/karthicchat/image/upload",{
        method:"post",
        body:data,
      }).then((res) => res.json())
      .then((data) =>{
        console.log(data.url.toString());
        setPic(data.url.toString());
        setload(false);
      })
      console.log(file);
    }
      

}
const handleSubmit = async (e) =>{
  e.preventDefault();
  setload(true);
  try{
    const res = await axios.post("http://localhost:5000/api/auth/register",{
      userName : username,
      password: password,
      email:email,
      profile: pic
    });
    console.log(res);   
    setload(false);

    dispatch(setUser(res.data));

    localStorage.setItem('user', JSON.stringify(res.data));
  }catch(err){
    console.log(err);
    setload(false);
  }
  console.log(profile);
}
  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm ">
    
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up</h2>
  </div>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div class="mt-2">
          <input id="email" name="email" onChange={(e) => {setEmail(e.target.value)}} value={email} type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div>
        <label for="username" class="block text-sm font-medium leading-6 text-gray-900">User Name</label>
        <div class="mt-2">
          <input id="text" name="username"  onChange={(e) => {setUserName(e.target.value)}} value={username} type="text" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Create Password</label>
        </div>
        <div class="mt-2">
          <input id="password" name="password" type="password"  onChange={(e) => {setPassword(e.target.value)}} value={password} autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Upload Profile</label>
        </div>
        <div class="mt-2">
          <input id="profile" name="profile" type="file" accept='image/*'  onChange={(e) => {uploadimg(e.target.files[0])}}  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div>
      <button type="submit"  className={`flex w-full justify-center rounded-md ${
          isload ? 'bg-gray-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'
        } px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`} disabled={isload}>Sign up</button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm text-gray-500">
      Have an account?
      <Link to="/Login"  class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign in</Link>
      {/* <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Create account</a> */}
      
    </p>
  </div>
</div>
  )
}

export default Register
