import React, { useEffect, useState } from "react";
import { fetchAllNotesFromLS, getNotesByCreatorId } from "../../services/notes";
import { decryptToken } from "../../utils/decryptJwt";

const HomepageComponent = ({ notesData }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("");
  const token = decryptToken("token");

  //Get cookie named "token"
  const tokenFromCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
  if (tokenFromCookie !== undefined) {
    console.log("Cookie : ", tokenFromCookie);
  }
  console.log("Token : ", token);



  useEffect(() => {
    let updatedUserId = userId;

    if (token) {
      updatedUserId = token.id;
    }
    setUserId(updatedUserId);


  }, [token])

  useEffect(() => {
    const getNotes = async () => {
      try {
        let data;
        if (!userId) {
          data = await fetchAllNotesFromLS();
        }
        else {
          data = await getNotesByCreatorId(userId);
        }
        setNotes(data);
      } catch (err) {
        setError("Failed to fetch notes.");
      } finally {
        setLoading(false);
      }
    };

    getNotes();
  }, [userId]);


  if (loading) return <main className="px-6 py-8"><p>Loading...</p></main>;
  if (!userId) return <main className="px-6 py-8"><p className="text-center font-semibold text-2xl">You are not logged in</p></main>;
  if (error) return <main className="px-6 py-8">{error}</main>;

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note, index) => (
              // <div
              //   key={index}
              //   className="bg-gray-800 border-[#F5F1ED]/20 border-[1px] bg-gradient-to-t bg-opacity-[13%] from-gray-100/5 to-gray-100/10 rounded-md p-4 shadow-md relative overflow-hidden"
              // >
              <div className="bg-[#1E272A]/50">
                <div
                  key={index}
                  className=" border-stroke/20 border-[1px] bg-gradient-to-t bg-opacity-[13%] from-glass-100/[7%] from-[100%] via-[0%] via-glass-200/0 to-glass-300/[40%] to-[0%] rounded-md p-4 shadow-md relative overflow-hidden"
                >
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

              </div>

            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default HomepageComponent;
