import React, { useEffect, useState } from "react";
import { checkConnectionAndGetInfo } from "../../utils/decryptJwt";
import { createNote, createNoteInLS } from "../../services/notes";

const NewNoteComponent = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      setError("Please fill in both title and content");
      return;
    }

    try {
      let createdNote;
      if (!userData) {
        createdNote = await createNoteInLS(formData);
      } else {
        if(formData.tags.length > 0) formData.tags = formData.tags.split(',').map(tag => tag.trim());
        createdNote = await createNote({
          // creator_id: userData.id,
          image: "", //Attention, a completer!
          ...formData
        });
      }

      // Clear form after successful creation
      setFormData({ title: "", content: "" });
      setError(null);

      // You might want to add a success message or redirect here
    } catch (error) {
      console.error(error);
      setError("Failed to create note. Please try again.");
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
          <div className="border-stroke/20 border-[1px] bg-gradient-to-t from-glass-100/[7%] from-[100%] via-[0%] via-glass-200/0 to-glass-300/[40%] to-[0%] rounded-md p-4 shadow-md relative overflow-hidden">
            <form onSubmit={handleCreateNote}>
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
                className=" bg-teal-500 rounded-3xl text-white h-12 w-24 py-2 px-4 top-2 right-2 hover:text-teal-400 transition"
                title="Create Note"
              >
                Créer

              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewNoteComponent;