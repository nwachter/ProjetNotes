import React, { useEffect, useState } from "react";
import { checkConnectionAndGetInfo } from "../../utils/decryptJwt";
import {  updateNote, updateNoteInLS, getNoteById, getNoteByIdFromLS } from "../../services/notes";
import { useParams } from "react-router-dom";

const UpdateNoteComponent = () => {
  const noteId = useParams().id;
  const [note, setNote] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      setError("Please fill in both title and content");
      return;
    }
  
    try {
      let updatedNote;
      const noteData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
      };
  
      if (!userData) {
        updatedNote = await updateNoteInLS(noteId, noteData);
      } else {
        updatedNote = await updateNote(noteId, {
          ...noteData,
          image: "", //Attention, a completer!
        });
      }
  
      setNote(updatedNote);
      setError(updatedNote ? null : "Failed to update note. Please try again."); // Set error message based on update success or failure (null);
    } catch (error) {
      console.error(error);
      setError("Failed to update note. Please try again.");
    }
  };

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

  useEffect(() => {
    const fetchNoteById = async () => {
      let errorMessage = null;
      let fetchedNote = null;

      if (!noteId) {
        errorMessage = "Note ID is missing.";
      }  else {
        try {
          if (!userData) {
            fetchedNote = await getNoteByIdFromLS(noteId);
            console.log("Fetched note from local storage:", fetchedNote);
          } 
          else if(userData?.id) {
            fetchedNote = await getNoteById(noteId);
            console.log("Fetched note from db:", fetchedNote);
          } 
          else {
            errorMessage = "Unknown user data";
            
          } 

          setNote(fetchedNote);
          setFormData({
            title: fetchedNote.title || '',
            content: fetchedNote.content || '',
            tags: fetchedNote.tags ? (Array.isArray(fetchedNote.tags) ? fetchedNote.tags.join(', ') : fetchedNote.tags) : '',
          });
        } catch (err) {
          console.error("Error fetching note:", err);
          errorMessage = "Failed to fetch the note. Please try again.";
        }
      }

      setNote(fetchedNote);
      setError(errorMessage);
      setLoading(false);
      return fetchedNote;
    };


      const note = fetchNoteById();

  }, [noteId, userData]);

  if (loading)
    return (
      <main className="px-6 py-8">
        <div className="text-center">Loading...</div>
      </main>
    );
  if (error)
    return (
      <main className="px-6 py-8">
        <div className="text-red-500">{error}</div>
      </main>
    );

  return (

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
          <div className="border-stroke/20 border-[1px] bg-gradient-to-t from-glass-100/[7%] from-[100%] via-[0%] via-glass-200/0 to-glass-300/[40%] to-[0%] rounded-md p-4 shadow-md relative overflow-hidden">
            <form onSubmit={handleUpdateNote}>
              <input
                name="title"
                type="text"
                value={formData.title}
      
                onChange={handleInputChange}
                placeholder="Note Title"
                className="text-lg font-medium bg-black/5 text-isabelline/80 h-12 w-full mb-2 p-2 rounded border border-gray-700 focus:outline-none focus:border-teal-500"
              />

              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Write your note here..."
                className="text-sm h-[40vh] w-full opacity-90 bg-black/5 text-isabelline/90 mb-4 p-2 rounded border border-gray-700 focus:outline-none focus:border-teal-500"
              />

              <input
                name="tags"
                type="text"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Tags"
                className="text-lg font-medium bg-black/5 text-isabelline/80 h-12 w-full mb-2 p-2 rounded border border-gray-700 focus:outline-none focus:border-teal-500"
              />

              <button
                type="submit"
                onClick={handleUpdateNote}
                className=" bg-teal-500 rounded-3xl text-white h-12 w-24 py-2 px-4 top-2 right-2 hover:text-teal-400 transition"
                title="Update Note"
              >
                Modifier
              </button>
            </form>
          </div>
        </div>
      </main>

  );
};

export default UpdateNoteComponent;
