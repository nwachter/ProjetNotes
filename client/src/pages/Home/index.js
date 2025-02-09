import React, { useEffect, useState } from "react";
import {
  fetchAllNotesFromLS,
  getNotesByCreatorId,
  migrateTagsInLocalStorage,
} from "../../services/notes";
import { checkConnectionAndGetInfo } from "../../utils/decryptJwt";
import { Link } from "react-router-dom";
import Draggable from "react-draggable";

const HomepageComponent = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = React.useState({});
  const [positions, setPositions] = useState({});

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
        // Initialize positions from localStorage or set to empty object
        const savedPositions =
          JSON.parse(localStorage.getItem("notePositions")) || {};
        setPositions(savedPositions);
      } catch (err) {
        setError("Failed to fetch notes.");
      } finally {
        setLoading(false);
      }
    };

    getNotes();
  }, [userData]);

  const handleDragStop = (e, ui, noteId) => {
    const newPositions = {
      ...positions,
      [noteId]: { x: ui.x, y: ui.y },
    }
    setPositions(newPositions)
    localStorage.setItem("notePositions", JSON.stringify(newPositions))
  }


  if (loading)
    return (
      <main className="px-6 py-8">
        <p>Loading...</p>
      </main>
    );

  if (error) return <main className="px-6 py-8">{error}</main>;

  return (
    <div className="min-h-screen ">
      <main className="container mx-auto px-4 py-12 z-10">
        <div className="flex justify-center gap-4 flex-wrap mb-12">
          {["All Notes", "Favorites", "Recent", "Tags"].map((value, index) => (
            <button
              key={index}
              className="px-6 py-2 bg-persian-green/80 text-isabelline rounded-full shadow-lg hover:bg-persian-green transition-colors duration-300 font-roboto text-sm tracking-wide"
            >
              {value}
            </button>
          ))}
        </div>

        {!userData && (
          <div className="mb-12 p-8 bg-arsenic/30 backdrop-blur-md rounded-lg shadow-xl border border-stroke/20">
            <p className="text-center font-lora font-semibold text-2xl text-saffron">
              You are not logged in
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {notes.map((note, index) => (
       <Draggable
       key={note._id}
       defaultPosition={positions[note._id] || { x: 0, y: 0 }}
       onStop={(e, ui) => handleDragStop(e, ui, note._id)}
       bounds="parent"
     >
              <div className="cursor-move">
                {/* <Link key={index} to={`/note/${note._id}`} className="group"> */}
                <div className="h-full bg-arsenic/30 backdrop-blur-lg border relative border-stroke/10 rounded-lg p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-arsenic/40 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-persian-green/10 via-teal-200/10 to-obsidian/10 opacity-50"></div>
                  <h3 className="text-xl font-reggae-one font-medium text-saffron mb-3 truncate">
                    {note.title}
                  </h3>
                  <p className="text-sm font-lora text-isabelline/80 mb-4 line-clamp-3">
                    {note.content}
                  </p>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="text-persian-green hover:text-saffron transition-colors duration-300">
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
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* </Link> */}
              </div>
            </Draggable>
          ))}
        </div>

        {notes.length === 0 && (
          <div className="mt-12 p-8 bg-arsenic/50 backdrop-blur-md rounded-lg shadow-xl text-center">
            <p className="font-lora text-xl text-isabelline/80">
              No notes found. Start creating your first note!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomepageComponent;
