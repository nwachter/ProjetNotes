import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Logo.png";
import headerBg from "../../assets/backgrounds/header_bg.png";
import newIcon from "../../assets/icons/new_icon.svg";

const Header = ({ username, logout, onCreateNote }) => {
  return (
    <header
      className="px-6 py-4 flex bg-cover bg-no-repeat flex-col shadow-md"
      style={{
        backgroundImage: `url(${headerBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center pr-[2vw] justify-between ">
        <div className="flex gap-[5vw]  font-dm-sans items-center">
          <img src={logo} alt="Logo" className="w-[174px]  h-[81px]" />
          <h1 className="text-2xl sr-only font-bold text-gray-100">
            Glass Notes
          </h1>
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="list"
            >
              <button className="px-4 py-2 font-dm-sans opacity-80 bg-transparent text-slate-100  font-semibold mr-2">
                Notes
              </button>
            </Link>
            <img src={newIcon} alt="New note icon" className="w-auto hover:filter active:filter hover:brightness-125 active:brightness-90 transition-all  h-auto" />

            {/* <Link
            to="/tags"
            className="list"
          > */}
            {/* <button className="px-4 py-2 font-dm-sans font-semibold opacity-80 bg-transparent text-slate-100  mr-2">
              Tags
            </button> */}
            {/* </Link> */}

          </div>

        </div>

        {username === undefined ? <div className="flex items-center gap-6">
          <Link
            to="/signin"
            className="list"
          >
            <button className="px-4 font-dm-sans py-2 opacity-80 bg-transparent text-slate-100 font-semibold  mr-2">
              Connexion
            </button>
          </Link>
          <Link
            to="/signup"
            className="list"
          >
            <button className="px-6 font-dm-sans py-3 rounded-full border-[1px] border-slate-100  font-semibold opacity-80 bg-transparent text-slate-100  mr-2">
              Inscription
            </button>
          </Link>
        </div>
          :          
          <button  onClick={logout} className="px-6 font-dm-sans py-3 rounded-full border-[1px] border-slate-100  font-semibold opacity-80 bg-transparent text-slate-100  mr-2">
           Deconnexion
          </button>
  
        }
      </div>
      <blockquote className="text-custom-yellow-200 font-lora opacity-20 italic text-center text-lg mb-8">
        "The discipline of writing something down is the first step toward
        making it happen." – Lee Iacocca
      </blockquote>
    </header>
  );
};

export default Header;
