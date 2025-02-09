import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Logo.png";
import headerBg from "../../assets/backgrounds/header_bg.png";
import newIcon from "../../assets/icons/new_icon.svg";
import { checkConnectionAndGetInfo } from "../../utils/decryptJwt";


const Header = ({ logout, toggleSignInModal, toggleSignUpModal }) => {
  const [userData, setUserData] = useState(null); // Initialize as null

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // const info = await getUserInfo();
        const data = await checkConnectionAndGetInfo();
        const user = data.user;
        console.log("USER : ", user);
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(false);
      }
    }

    fetchUserInfo();

  }, []);


  const handleLogout = () => {
    localStorage.setItem('isConnected', false);
    logout();
  };


  return (
    <header
      className="relative px-6 py-4 rounded-3xl bg-cover bg-no-repeat shadow-md"
      style={{
        backgroundImage: `url(${headerBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-obsidian/30 backdrop-blur-sm"></div>
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <img src={logo || "/placeholder.svg"} alt="Logo" className="w-[174px] h-[81px]" />
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-isabelline hover:text-saffron transition-colors duration-200 font-roboto">
              Notes
            </Link>
            <Link
              to="/new"
              className="flex items-center space-x-2 text-isabelline hover:text-saffron transition-colors duration-200 font-roboto"
            >
              <img
                src={newIcon || "/placeholder.svg"}
                alt="New note icon"
                className="w-6 h-6 filter brightness-0 invert"
              />
              <span>New Note</span>
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {userData === false || !userData?.username ? (
            <>
              <button
                onClick={toggleSignInModal}
                className="px-4 py-2 text-isabelline hover:text-saffron transition-colors duration-200 font-roboto"
              >
                Connexion
              </button>
              <button
                onClick={toggleSignUpModal}
                className="px-4 py-2 bg-saffron/20 hover:bg-saffron/30 text-isabelline rounded-full transition-colors duration-200 font-roboto"
              >
                Inscription
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-carmine/20 hover:bg-carmine/30 text-isabelline rounded-full transition-colors duration-200 font-roboto"
            >
              Déconnexion {userData?.username}
            </button>
          )}
        </div>
      </div>
      <div className="relative z-10 mt-4">
        <blockquote className="text-saffron font-lora italic text-center text-sm">
          "The discipline of writing something down is the first step toward making it happen." – Lee Iacocca
        </blockquote>
      </div>
    </header>
  )
};

export default Header;
