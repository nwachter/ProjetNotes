
import Header from "./Header";
import { logout } from "../../services/auth";
const Layout = ({ children }) => {


    return (
        <div className="min-h-screen bg-gradient-to-b from-custom-default-800 to-custom-default-900 text-gray-300 font-sans">
            <Header logout={logout} />
            {children}
        </div>
    );
};

export default Layout;