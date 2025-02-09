
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
    <div className="min-h-screen bg-gradient-to-br from-obsidian to-arsenic text-isabelline relative overflow-hidden">
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-persian-green/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 bg-saffron/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-carmine/10 rounded-full blur-3xl"></div>
      </div>
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