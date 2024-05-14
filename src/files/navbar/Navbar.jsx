import { useState } from "react";
// import { close, logo, menu } from "../assets";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import MonochromePhotosIcon from "@mui/icons-material/MonochromePhotos";
import { Link, useNavigate } from "react-router-dom";

export const navLinks = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "about",
    title: "About",
  },
  {
    id: "login",
    title: "Logout"
  }
];


const Navbar = () => {
  const navigate = useNavigate()
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const Logout = (id) => {
    if (id == "login") {
      localStorage.removeItem("isActiveUser")
    }
  }
  return (
    <header className="bg-emerald-800 text-white">
      <nav className="w-xl/2 flex py-6 justify-between  text-white items-center navbar mx-10">
        {/* Logo */}
        <h1 className="text-3xl text-white font-serif"><Link to="/home">EmoTunes</Link></h1>

        {/* Desktop Navigation */}
        <ul className="list-none sm:flex hidden justify-end items-center flex-1">
          {navLinks.map((nav, index) => (
            <Link to={`/${nav.id}`} key={nav.id} onClick={() => {
              Logout(nav.id)
            }}>
              <li
                key={nav.id}
                className={`font-poppins cursor-pointer text-[20px] hover:underline active-font-bold
                ${active === nav.title ? "text-white font-bold" : "text-dimWhite  "
                  } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
                onClick={() => setActive(nav.title)}
              >
                {nav.title}
              </li>
            </Link>
          ))}
        </ul>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex flex-1 justify-end items-center ">
          <img
            src={toggle ? "https://img.icons8.com/material-sharp/24/000000/delete-sign.png" : "https://img.icons8.com/ios-glyphs/30/000000/menu--v3.png"}
            alt="menu"
            className="w-[28px] h-[28px] object-contain "
            onClick={() => setToggle(!toggle)}
          />

          {/* Sidebar */}
          <div
            className={`${!toggle ? "hidden" : "flex"
              } p-6 bg-white absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col">
              {navLinks.map((nav, index) => (
                <Link to={`/${nav.id}`} key={nav.id} onClick={() => {
                  Logout(nav.id)
                }}>
                  <li
                    key={nav.id}
                    className={`font-poppins font-medium cursor-pointer text-[16px] hover:underline ${
                      active === nav.title ? "text-black text-bold" : "text-black"
                      } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                    onClick={() => setActive(nav.title)}
                  >
                    {nav.title}
                    {/* <a href={`#${nav.id}`}>{nav.title}</a> */}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
