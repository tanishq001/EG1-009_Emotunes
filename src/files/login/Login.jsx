import {React, useState} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
// import { toast,ToastContainer } from "react-toastify"
import toast, { Toaster } from 'react-hot-toast';
import "react-toastify/dist/ReactToastify.css"

const Login=() =>{
  const navigate=useNavigate()
    const [inputs, setInputs] = useState({
      username:"",
      password:"",
    });

    const [password,setPassword] = useState('');
    const [username,setUsername] = useState('');
    const [toggle, setToggle] = useState(false);

    const handleChange = (e) =>{
      setInputs((previousState) => ({
        ...previousState,
        [e.target.name]: e.target.value,
      }));
    };

    const sendRequest = async () => {
      // add your api endpoint for login 
      console.log(username,password)
    try {
      const response = await fetch(`http://localhost:8000/api/signinuser?username=${username}&password=${password}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
      });
      let data=await response.json()
      if(response.ok){
        console.log(data.message);  
        localStorage.setItem("isActiveUser", true)
        if(localStorage.getItem("isActiveUser")){
          toast.success(data.message)
          navigate("/home")      
        }
      }
      else
      {
        toast.error(data.message)
        console.log(data.message);
      }
    } 
    catch(error) {
      console.error('Error :',error)
    }
    };
  

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(inputs);
      sendRequest();
  };

  return (
    <>
    <div><Toaster
  position="top-right"
  reverseOrder={false}
/></div>
    <div className="bg-emerald-800 h-screen w-screen">
    <div className="flex justify-center items-center h-screen ">
      <div className="max-w-md w-full px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white ">EmoTunes</h1>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl mb-4 font-semibold text-white text-center">Sign In</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="username"
                placeholder="Enter Your Username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
                name="username"
                // value={inputs.username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='relative'>
              <input
                type={!toggle ? "password" : "text"}
                placeholder="Enter Your Password"
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
              Sign In
            </button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-gray-400">New to Emotunes? </span>
            <Link to="/register" ><b className="text-emerald-500 cursor-pointer">Sign up Now!</b></Link>
  
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}
export default Login;