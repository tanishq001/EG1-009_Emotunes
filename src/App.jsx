import {BrowserRouter as Router,
  Routes,
  Route,
  Navigate} 
  from "react-router-dom";
import Login from "./files/login/Login"
import Register from './files/register/Register'
import Home from './files/home/Home'
import Navbar from './files/navbar/Navbar';
import { AboutUs } from "./files/about_us/AboutUs";
import { useContext, createContext, useState, useEffect } from "react";
import { CleaningServices } from "@mui/icons-material";


let UserContext = createContext({
  isAuthenticated:false,
  username: "",
  email: "",
  setIsAuthenticated: () => {},
})


const ProtectedRoute = ({children}) => {
  const user = useContext(UserContext);

  if(!user.isAuthenticated) {
      return <Navigate to="/login" replace />
  }
  
  return children

};


function App() {
  const [isActive, setIsActive] = useState(true)
const [userac, setUserac] = useState(false)



  useEffect(()=>{
    setUserac(localStorage.getItem("isActiveUser"))
    console.log(userac)
  })
  return (

    <div className="App">
      <UserContext.Provider value = {{isAuthenticated: isActive, setIsAuthenticated: setIsActive}}>
     <Router>
      <Routes>
      { userac ? <Route  path="/" element ={<Navigate to='/home'/>} /> :
      <Route path="/" element={<Login/>}/>}
   
   <Route path ='/login' element ={ <Login/>} />
   <Route path = '/register' element ={<Register/> } />

   { userac ? <Route path= '/home' element={<Home/>}/>
   : <Route path= '/home' element={<Login/>}/>}
   
   <Route path= '/about' element={<AboutUs/>}/>
   {/* <Route path= '' */}
   </Routes>
  </Router> 
  </UserContext.Provider>
    </div>
  );
}

export default App;
