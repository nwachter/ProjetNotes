import React, { useEffect, useState } from "react";
import { checkConnectionAndGetInfo } from "../../utils/decryptJwt";
import { createNote, createNoteInLS, getNoteById, deleteNote, updateNote } from "../../services/notes";
import { useParams } from "react-router-dom";
import editIcon from "../../assets/icons/edit_icon.svg";
import deleteIcon from "../../assets/icons/delete_icon.svg";

const NewNoteComponent = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({});
  const [note, setNote] = useState({});
  const noteId = useParams().id;



  const handleDeleteNote = async (e) => {
    e.preventDefault();
    try {
      if (!userData) {
        console.error("No user data available for deletion.");
        setError("You must be logged in to delete a note.");
        return;
      }

      await deleteNote(noteId); // Pass the note ID to the deletion service
      // setNote(null); // Clear the note after deletion
      setError(null); // Reset errors
      // Optional: Redirect or success notification
    } catch (error) {
      console.error("Error deleting note:", error);
      setError("Failed to delete the note. Please try again.");
    }
  };

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    try {
      if (!userData) {
        console.error("No user data available for update.");
        setError("You must be logged in to update a note.");
        return;
      }
      await updateNote(noteId, note); // Pass the note ID and updated data to the update service
      setError(null); // Reset errors
      // Optional: Redirect or success notification
    } catch (error) {
      console.error("Error updating note:", error);
      setError("Failed to update the note. Please try again.");
    }
  };
  
  useEffect(() => {
    const fetchNoteById = async () => {
      let errorMessage = null;
      let fetchedNote = null;

      if (!noteId) {
        errorMessage = "Note ID is missing.";
      } else if (!userData?.id) {
        errorMessage = "User not logged in. Cannot fetch note.";
      } else {
        try {
          fetchedNote = await getNoteById(noteId);
        } catch (err) {
          console.error("Error fetching note:", err);
          errorMessage = "Failed to fetch the note. Please try again.";
        }
      }

      setNote(fetchedNote);
      setError(errorMessage);
      setLoading(false); // Always stop loading at the end
    };

    if (userData !== null) {
      // Ensure userData has resolved before attempting to fetch
      fetchNoteById();
    }
  }, [noteId, userData]);
  

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await checkConnectionAndGetInfo();
        const user = data.user;
        console.log("USER : ", user);
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) return <main className="px-6 py-8"><div className="text-center">Loading...</div></main>;
  if (error) return <main className="px-6 py-8"><div className="text-red-500">{error}</div></main>;

  return (
    <div>
      <main className="px-6 py-8">
        <div className="flex justify-center gap-4 flex-wrap mb-8">
          {["Personal", "Work", "Ideas", "Tasks"].map((value, index) => (
            <button
              key={index}
              className="px-6 py-2 bg-teal-700 text-gray-100 rounded-full shadow hover:bg-teal-600 transition"
            >
              {value}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 grid-rows-1 px-6 pb-6">
          <div className="border-stroke/20 p-4 border-[1px] bg-gradient-to-t from-glass-100/[7%] from-[100%] via-[0%] via-glass-200/0 to-glass-300/[40%] to-[0%] rounded-md p-4 shadow-md relative overflow-hidden">
          <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-reggae-one font-medium text-isabelline/80 mb-2">
                    {note.title}
                  </h3>
                  <div id="icons">
                  <button onClick={handleUpdateNote} className="text-isabelline/90 hover:text-gray-300 transition">
                     <img src={editIcon} alt="edit" className="" />
                    </button>
                    <button onClick={handleDeleteNote} className="text-isabelline/90 hover:text-gray-300 transition">
                    <img src={deleteIcon} alt="delete" className="" />

                    </button>
                  </div>
            </div> 
      

                  <p className="text-sm font-lora opacity-90 text-isabelline/90 mb-4">
                    {note.content}
                  </p>
                  <button className="absolute top-2 right-2 text-isabelline/90 hover:text-gray-300 transition">
                    ⋮
                  </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewNoteComponent;