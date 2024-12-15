import React, { useEffect, useState } from "react";
import { fetchAllNotes } from "../../services/notes";

const HomepageComponent = ({ notesData }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const data = await fetchAllNotes();
        setNotes(data);
      } catch (err) {
        setError("Failed to fetch notes.");
      } finally {
        setLoading(false);
      }
    };

    getNotes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {/* <div>
            <h1>All Notes</h1>
            <ul>
                {notes.map(note => (
                    <li key={note.id}>
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                        <small>Created At: {new Date(note.createdAt).toLocaleString()}</small>
                        <p>Tags: {note.tags.join(', ')}</p>
                    </li>
                ))}
            </ul>
        </div> */}
      <div>
      
        {/* <header
          className="px-6 py-4 flex bg-cover bg-no-repeat flex-col shadow-md"
          style={{
            backgroundImage: `url(${headerBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex items-center justify-between ">
            <div className="flex items-center">
              <img src={logo} alt="Logo" className="w-[174px]  h-[81px]" />
              <h1 className="text-2xl sr-only font-bold text-gray-100">
                Glass Notes
              </h1>
              <button className="px-4 py-2 opacity-80 bg-transparent text-slate-100  font-semibold mr-2">
                Notes
              </button>
              <button className="px-4 py-2 font-semibold opacity-80 bg-transparent text-slate-100  mr-2">
                Tags
              </button>
            </div>

            <div>
              <button className="px-4 py-2 opacity-80 bg-transparent text-slate-100 font-semibold  mr-2">
                Connexion
              </button>
              <button className="px-6 py-3 rounded-full border-[1px] border-slate-100  font-semibold opacity-80 bg-transparent text-slate-100  mr-2">
                Inscription
              </button>
            </div>
          </div>
          <blockquote className="text-custom-yellow-200 opacity-20 italic text-center text-lg mb-8">
            "The discipline of writing something down is the first step toward
            making it happen." – Lee Iacocca
          </blockquote>
          <div className="flex justify-center gap-4 flex-wrap mb-8">
            {["Value", "Value", "Value", "Value"].map((value, index) => (
              <button
                key={index}
                className="px-6 py-2 bg-teal-700 text-gray-100 rounded-md shadow hover:bg-teal-600 transition"
              >
                {value}
              </button>
            ))}
          </div>
        </header> */}

        <main className="px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note, index) => (
              <div
                key={index}
                className="bg-gray-800 border-[#F5F1ED]/20 border-[1px] bg-gradient-to-t bg-opacity-[13%] from-gray-100/5 to-gray-100/10 rounded-md p-4 shadow-md relative overflow-hidden"
              >
                <h3 className="text-lg reggae-one-regular font-semibold text-teal-400 mb-2">
                  {note.title}
                </h3>
                <p className="text-sm font-roboto text-gray-400 mb-4">
                  {note.content}
                </p>
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 transition">
                  ⋮
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default HomepageComponent;
