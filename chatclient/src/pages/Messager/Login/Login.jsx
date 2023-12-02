import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUser } from '../../../app/features/userAuth/userAuthSlice';

function Login() {
  const[username,setUsername] = useState("");
  const[isload,setload] = useState(false);
  const[password,setPassword] = useState();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    setload(true);
    try{
      const res = await axios.post("http://localhost:5000/api/auth/login",{
        userName : username,
        password: password,
      });
      dispatch(setUser(res.data));
      localStorage.setItem('user', JSON.stringify(res.data));
      toast("Login Successfull",{type:'success'});
      setload(false);
    }catch(err){
      toast("Username or password wroung",{type:'error'});
      setload(false);
      console.log(err);
    }
  }
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
    
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6">
      <div>
        <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input id="email" name="email" value={username} onChange={(e) => setUsername(e.target.value)} type="email" autocomplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          {/* <div className="text-sm">
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div> */}
        </div>
        <div className="mt-2">
          <input id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" autocomplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <button type="submit" onClick={handleSubmit}  className={`flex w-full justify-center rounded-md ${
          isload ? 'bg-gray-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'
        } px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`} disabled={isload}>Sign in</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <Link to="/Register"  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Create account</Link>
      {/* <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Create account</a> */}
      
    </p>
  </div>
</div>
  )
}

export default Login
