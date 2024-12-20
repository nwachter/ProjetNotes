
import { createNote, createNoteInLS } from "../../services/notes";
import { decryptToken } from "../../utils/decryptJwt";
import Header from "./Header";
import { logout } from "../../services/auth";
const Layout = ({ children }) => {
    const userData = decryptToken('token');
    console.log("User Data : ", userData);
    const handleCreateNote = async (data) => {
        //if user not logged, add to LS
        if(!userData) {
           const note = await createNoteInLS(data);

        }
        else {
            try {
                const createdNote = await createNote({
                    creator_id: userData._id,
                    ...data
                });
       
            }
            catch(error) {
                console.error(error);
            }

        }

    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-custom-default-800 to-custom-default-900 text-gray-300 font-sans">
            <Header username={userData?.username} logout={logout} onCreateNote={handleCreateNote}/>
            {children}
        </div>
    );
};

export default Layout;