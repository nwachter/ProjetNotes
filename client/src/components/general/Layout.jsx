
import { decryptToken } from "../../utils/decryptJwt";
import Header from "./Header";
const Layout = ({ children }) => {
    const userData = decryptToken('token');

    return (
        <div className="min-h-screen bg-gradient-to-b from-custom-default-800 to-custom-default-900 text-gray-300 font-sans">
            <Header username={userData?.username} />
            {children}
        </div>
    );
};

export default Layout;