import React, { useEffect, useState } from "react";
import { checkConnectionAndGetInfo } from "../../utils/decryptJwt";
import { createNote, createNoteInLS } from "../../services/notes";
import { migrateLocalStorageNotes } from "../../services/notes";

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
        if (formData.tags.length > 0)
          formData.tags = formData.tags.split(",").map((tag) => tag.trim());
        console.log("Not connected, creating note in local storage:", formData);

        createdNote = await createNoteInLS(formData);
      } else {
        if (formData.tags.length > 0)
          formData.tags = formData.tags.split(",").map((tag) => tag.trim());
        console.log("Connected, creating note in database:", formData);
        createdNote = await createNote({
          // creator_id: userData.id, //creator_id maintenant ajouté dans le back pour plus de sécurité
          image: "", //Attention, a completer!
          ...formData,
        });
      }
      console.log("Created note:", createdNote);

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
const migrateNotes = async () => {
  try {
    const result = await migrateLocalStorageNotes();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
    // const data = migrateNotes();
    // console.log("Data migrate : ", data)
  
  }, [])
  

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
      <div className="min-h-screen  text-isabelline">
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="old:bg-arsenic/30 bg-gradient-to-br from-glass-100/10 via-glass-100/5 to-arsenic/10 backdrop-blur-md rounded-lg p-8 shadow-xl">
              <form onSubmit={handleCreateNote} className="space-y-6">
                <input
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Note Title"
                  className="w-full px-0 py-2 bg-transparent text-2xl text-saffron placeholder-saffron/50 border-b border-stroke/20 focus:outline-none focus:border-saffron/50 transition duration-300 font-reggae-one"
                />
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Write your note here..."
                  className="w-full h-64 px-0 py-2 bg-transparent text-isabelline placeholder-isabelline/50 focus:outline-none font-lora resize-none"
                />
                <div className="flex items-center space-x-4">
                  <input
                    name="tags"
                    type="text"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="Add tags..."
                    className="flex-grow px-0 py-2 bg-transparent text-sm text-persian-green placeholder-persian-green/50 border-b border-stroke/20 focus:outline-none focus:border-persian-green/50 transition duration-300 font-roboto"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-saffron/80 text-obsidian rounded-full shadow-md hover:bg-saffron transition-colors duration-300 font-roboto font-bold text-sm"
                  >
                    Save Note
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    )
};

export default NewNoteComponent;
