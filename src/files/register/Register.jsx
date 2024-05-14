import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom"
import {Link} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import "react-toastify/dist/ReactToastify.css"
import Navbar from '../navbar/Navbar';

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const [toggle, setToggle] = useState(false);
  const navigate=useNavigate()

  const sendRequest = async () => {
    // add your api endpoint for login 
  try {
    const response = await fetch(`http://localhost:8000/api/register?username=${userName}&email=${email}&password=${password}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userName, email, password }),
    });
    let data=await response.json()
    if(response.ok){
      console.log(data.message);
      console.log("Login Accepted");
      navigate('/login');
    }
    else
    {
      toast.error(data.message)
    }
  } 
  catch(error) {
    console.error('Error :',error)
  }
  };

  const handleStart = async (e) =>{
    e.preventDefault();
    sendRequest();
  }


  return (
    <>
    <div><Toaster
  position="top-right"
  reverseOrder={false}
/></div>
    <div className="bg-emerald-800 min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full px-6 py-8 rounded-lg ">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">Welcome to EmoTunes</h1>
          <h2 className="text-2xl font-semibold text-white">Harmony in Bytes</h2>
          <p className="text-white py-2">Enter your email to create or register</p>
        </div>
        {/* <div className='bg-gray-800 rounded-lg shadow-lg p-8'>
        <h2 className="text-2xl mb-4 font-semibold text-white text-center">Sign Up</h2>
        <div className='space-y-4'>
        <div className="flex flex-col gap-4 items-center">
            <input
              type="username"
              placeholder="User Name"
              ref={userNameRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
            />
            <input
              type="email"
              placeholder="Email Address"
              ref={emailRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
            />
            <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
            />

            <button
              className="w-full text-white bg-emerald-500 hover:bg-emerald-600 rounded-md px-4 py-3 dark:bg-emerald-500 dark:hover:bg-emerald-600 focus:outline-none dark:focus:ring-emerald-600"
              onClick={handleStart}
            >
              Get Started
            </button>
          </div>
        </div>
        <div className="mt-4 text-center">
            <span className="text-gray-400">Already have an account? </span>
            <Link to="/login" ><b className="text-emerald-500 cursor-pointer">Sign In Now!</b></Link>
  
          </div>
        </div> */}

<div className="bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl mb-4 font-semibold text-white text-center">Sign Up</h2>
          <form className="space-y-4" onSubmit={handleStart}>
            <div>
              <input
                type="username"
                placeholder="Username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
                name="username"
                // value={inputs.username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
                name="username"
                // value={inputs.username}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='relative'>
              <input
                type={!toggle ? "password" : "text"}
                placeholder=" Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
                name="password"
                // value={inputs.password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" class="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600" onClick={() => setToggle(!toggle)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z">
                    </path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z">
                  </path>
                </svg>
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-500  text-white py-3 px-4 rounded-md hover:bg-emerald-600 focus:outline-none focus:bg-emerald-600"
            >
              Get Started
            </button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-gray-400">Already have an account? </span>
            <Link to="/login" ><b className="text-emerald-500 cursor-pointer">Sign In Now!</b></Link>
  
          </div>
        </div>
      </div>
    </div>

    </>
  );
}
