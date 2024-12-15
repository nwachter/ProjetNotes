
import Header from "./Header";
const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-300 font-sans">
            <Header />
            {children}
        </div>
    );
};

export default Layout;