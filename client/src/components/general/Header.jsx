import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Logo.png";
import headerBg from "../../assets/backgrounds/header_bg.png";
import newIcon from "../../assets/icons/new_icon.svg";
import { checkConnectionAndGetInfo } from "../../utils/decryptJwt";
import { useNavigate } from "react-router-dom"
import { LogOut } from "lucide-react";



const Header = ({ logout, toggleSignInModal, toggleSignUpModal }) => {
  const [userData, setUserData] = useState(null); // Initialize as null
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()


  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // const info = await getUserInfo();
        const data = await checkConnectionAndGetInfo();
        const user = data.user;
        // console.log("USER : ", user);
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
    navigate("/")
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
      <div className="absolute inset-0 bg-obsidian/30 backdrop-blur-sm rounded-3xl"></div>
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/">
            <img src={logo || "/placeholder.svg"} alt="Glass Notes" className="w-[174px] h-[81px]" />
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-isabelline hover:text-persian-green transition-colors duration-200 font-roboto">
              Notes
            </Link>
            <Link
              to="/new"
              className="flex items-center space-x-2 group text-isabelline  font-roboto"
            >
              <img
                src={newIcon || "/placeholder.svg"}
                alt="New note icon"
                className="w-6 h-6 filter brightness-0 group-hover:brightness-100 invert group-hover:invert-0 transition-all duration-200"
              />
              <span className="text-isabelline group-hover:text-persian-green transition-all  duration-200 ">Nouvelle Note</span>
            </Link>
          </nav>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-isabelline hover:text-saffron transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Desktop Auth Buttons */}
        <div className="hidden pr-4 md:flex items-center space-x-4">
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
            <div className="flex items-center space-x-4">
              <span className="text-isabelline/80 font-roboto">{userData?.username}</span>
              <button
                onClick={handleLogout}
                className="px-2 py-1 bg-white/10 hover:bg-white/5 hover:shadow-md hover:shadow-isabelline/5 text-isabelline rounded-full transition-all duration-200 font-roboto"
              >
                <LogOut className="h-5 w-5 text-carmine/90 stroke-[1.5]" />

              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 p-4 bg-gradient-to-br from-glass-100/10 via-glass-100/5 to-arsenic/10 border-stroke/5 border-[1px] backdrop-blur-md  
rounded-lg shadow-xl border-stroke/10 border-[1px] backdrop-blur-md rounded-lg z-20 shadow-lg">
          <nav className="flex flex-col items-center space-y-4 mb-4">
            <Link
              to="/"
              className="text-isabelline hover:text-persian-green transition-colors duration-200 font-roboto py-2"
              onClick={() => setMenuOpen(false)}
            >
              Notes
            </Link>
            {/* {window.innerWidth >= 768 && userData?.id && 
            <Link
              to="/new"
              className="flex items-center space-x-2 text-isabelline hover:text-saffron transition-colors duration-200 font-roboto py-2"
              onClick={() => setMenuOpen(false)}
            >
              <img
                src={newIcon || "/placeholder.svg"}
                alt="New note icon"
                className="w-6 h-6 filter brightness-0 invert"
              />
              <span>Nouvelle Note</span>
            </Link>} */}
          </nav>

          <div className="border-t border-stroke/10 pt-4">
            {userData === false || !userData?.username ? (
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => {
                    toggleSignInModal()
                    setMenuOpen(false)
                  }}
                  className="w-full py-2 text-isabelline hover:text-saffron transition-colors duration-200 font-roboto"
                >
                  Connexion
                </button>
                <button
                  onClick={() => {
                    toggleSignUpModal()
                    setMenuOpen(false)
                  }}
                  className="w-full py-2 bg-saffron/20 hover:bg-saffron/30 text-isabelline rounded-full transition-colors duration-200 font-roboto"
                >
                  Inscription
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-3">
                <span className="text-isabelline/80 font-roboto py-2">{userData?.username}</span>
                <button
                  onClick={handleLogout}
                  className="px-2 py-1 bg-white/10  hover:bg-white/5 flex items-center justify-center gap-2 hover:shadow-md text-[13px] hover:shadow-isabelline/5 text-isabelline rounded-full transition-all duration-200 font-roboto"
                >
                  <LogOut className="h-5 w-5 text-carmine/90 stroke-[1.5]" /> <span>Déconnexion</span>

                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="relative z-10 mt-4">
        <blockquote className="text-saffron font-lora italic text-center text-sm">
          "The discipline of writing something down is the first step toward making it happen." – Lee Iacocca
        </blockquote>
      </div>
    </header>
  )
};

export default Header;
