
import Header from "./Header";
import { logout } from "../../services/auth";
import SigninModal from "../modals/Signin/SigninModal";
import SignupModal from "../modals/Signup/SignupModal";
import { login, register } from '../../services/auth';
import { useState } from "react";
import Modal from "../modals/Modal";
const Layout = ({ children }) => {
    const [signInModalOpen, setSignInModalOpen] = useState(false);
    const [signUpModalOpen, setSignUpModalOpen] = useState(false);

    return (
        <>  
        <div className="min-h-screen bg-gradient-to-b from-custom-default-800 to-custom-default-900 text-gray-300 font-sans">
            <Header logout={logout} toggleSignInModal={() => setSignInModalOpen((prev) => !prev)} toggleSignUpModal={() => setSignUpModalOpen((prev) => !prev)}/>
            {children}
        </div> 
     { signInModalOpen &&   <Modal isOpen={() => setSignInModalOpen(true)} onClose={() => setSignInModalOpen(false)}>  <SigninModal login={login}/>  </Modal>}
     { signUpModalOpen &&  
     <Modal isOpen={() => setSignUpModalOpen(true)} onClose={() => setSignUpModalOpen(false)}> 
        <SignupModal register={register}/> 
     </Modal>}
        </>
    );
};

export default Layout;