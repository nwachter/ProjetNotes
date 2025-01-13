import React, { useEffect, useState } from "react";
import { fetchAllNotesFromLS, getNotesByCreatorId,  migrateTagsInLocalStorage } from "../../services/notes";
import { checkConnectionAndGetInfo } from "../../utils/decryptJwt";
import { Link } from "react-router-dom";


const HomepageComponent = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = React.useState({});

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
    };
 
    fetchUserInfo(); 
 
  }, []);

  useEffect(() => {
    const getNotes = async () => {
      try {
        let data;
        if (!userData?.id) {
          data = await fetchAllNotesFromLS();
        } else {
          data = await getNotesByCreatorId(userData?.id);
        }
        setNotes(data);
      } catch (err) {
        setError("Failed to fetch notes.");
      } finally {
        setLoading(false);
      }
    };

    getNotes();
  }, [userData]);

  if (loading)
    return (
      <main className="px-6 py-8">
        <p>Loading...</p>
      </main>
    );

  if (error) return <main className="px-6 py-8">{error}</main>;

  return (
    <>
      <div>
        <main className="px-6 py-8">
          <div className="flex justify-center gap-4 flex-wrap mb-8">
            {["Value", "Value", "Value", "Value"].map((value, index) => (
              <button
                key={index}
                className="px-6 py-2 bg-teal-700 text-gray-100 rounded-full shadow hover:bg-teal-600 transition"
              >
                {value}
              </button>
            ))}
          </div>
          {    !userData &&
      <div className="px-6 py-8 block">
        <p className="text-center font-semibold text-2xl">
          You are not logged in
        </p>
      </div>
    }
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {notes.map((note, index) => (
              <div className="bg-[#1E272A]/50 block">
                <Link key={index} to={`/note/${note._id}`}>
                  <div className=" border-stroke/20 border-[1px] bg-gradient-to-t bg-opacity-[13%] from-glass-100/[7%] from-[100%] via-[0%] via-glass-200/0 to-glass-300/[40%] to-[0%] rounded-md p-4 shadow-md relative overflow-hidden">
                    <h3 className="text-lg font-reggae-one font-medium text-isabelline/80 mb-2">
                      {note.title}
                    </h3>
                    <p className="text-sm font-lora opacity-90 text-isabelline/90 mb-4">
                      {note.content}
                    </p>
                    <button className="absolute top-2 right-2 text-isabelline/90 hover:text-gray-300 transition">
                      ⋮
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default HomepageComponent;
