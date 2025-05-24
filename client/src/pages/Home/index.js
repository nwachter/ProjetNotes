"use client"

import { useEffect, useState, useMemo } from "react"
import { fetchAllNotesFromLS, getNotesByCreatorId, updateNote, updateNoteInLS } from "../../services/notes"
import { getAllTags } from "../../services/tags"
import { checkConnectionAndGetInfo } from "../../utils/decryptJwt"
import { Link } from "react-router-dom"
import Draggable from "react-draggable"
import FavoriteToggle from "../../components/ui/FavoriteToggle"
import { Move } from "lucide-react"

const HomepageComponent = () => {
  const [notes, setNotes] = useState([])
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userData, setUserData] = useState({})
  const [positions, setPositions] = useState({})
  const [activeFilter, setActiveFilter] = useState("Toutes")
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({ favorite: false })





  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await checkConnectionAndGetInfo()
        const user = data.user
        //console.log("USER : ", user)
        setUserData(user)
      } catch (error) {
        console.error("Error fetching user data:", error)
        setUserData(false)
      }
    }

    fetchUserInfo()
  }, [])

  useEffect(() => {
    const getNotes = async () => {
      try {
        let data
        if (!userData?.id) {
          data = await fetchAllNotesFromLS()
        } else {
          data = await getNotesByCreatorId(userData?.id)
        }
        setNotes(data)
        // Initialize positions from localStorage or set to empty object
        const savedPositions = JSON.parse(localStorage.getItem("notePositions")) || {}
        setPositions(savedPositions)
      } catch (err) {
        setError("Failed to fetch notes.")
      } finally {
        setLoading(false)
      }
    }

    // const getTags = async () => {
    //   try {
    //     let data
    //     // data = await getAllTags();
    //     console.log("getTags : ", data);
    //     setTags(data)

    //   } catch (err) {
    //     setTags([])
    //   } finally {
    //     setLoading(false)
    //   }
    // }

    const getTags = async (notes) => {
      try {
        let data
        // data = await getAllTags();
        console.log("getTags : ", data);
        const tags = notes?.filter((note) => { return (note.tags && note.tags.length > 0) });
        const uniqueTags = [...new Set(tags.flatMap(note => note.tags))];
        setTags(uniqueTags)

      } catch (err) {
        setTags([])
      } finally {
        setLoading(false)
      }
    }

    getNotes()
    getTags(notes)
  }, [userData, notes])

  //Favorite toggle handlers
  const handleFavoriteToggle = async (noteId) => {
    const updatedError = error;
    try {
      const noteToUpdate = notes.find(note => note._id === noteId);
      if (!noteToUpdate) return;

      const updatedNote = {
        ...noteToUpdate,
        favorite: !noteToUpdate.favorite
      };

      // Update in backend or local storage
      if (userData?.id) {
        await updateNote(noteId, updatedNote);
      } else {
        // await updateNoteInLS(noteId, updatedNote);
        updatedError = "Vous devez être connecté pour mettre à jour une note.";

      }

      setError(updatedError)
      if (updatedError) return false

      // Update local state
      setNotes(notes.map(note =>
        note._id === noteId ? updatedNote : note
      ));
    } catch (err) {
      console.log("Erreur lors de la mise à jour (favori) de la note : ", err)
    }
  }

  const getTagNameById = (id) => {
    const tag = allTags.find((tag) => tag._id === id)
    return tag?.name
  }

  const allTags = useMemo(() => {
    return [{ name: "Toutes", _id: "Toutes" }, { name: "Favorites", _id: "Favorites" }, { name: "Récentes", _id: "Récentes" }
      , ...tags
    ] ?? [];
  }, [tags])


  const handleDragStop = (e, ui, noteId) => {
    const newPositions = {
      ...positions,
      [noteId]: { x: ui.x, y: ui.y },
    }
    setPositions(newPositions)
    localStorage.setItem("notePositions", JSON.stringify(newPositions))
  }

  const filteredNotes = notes.filter((note) => {
    // Extract tag names from tag objects
    const tagNames = note.tags?.map((tag) => {
      // Handle both object tags and string tags for backwards compatibility
      if (typeof tag === 'object' && tag.name) {
        return tag.name
      } else if (typeof tag === 'string') {
        return getTagNameById(tag)
      }
      return null
    }).filter(Boolean) || []

    if (activeFilter === "Favorites") {
      if (!note.favorite) {
        return false
      }
    } else if (activeFilter === "Récentes") {
      if (!note.updatedAt) {
        return false
      }
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      const noteUpdatedAt = new Date(note.updatedAt)

      if (noteUpdatedAt < oneWeekAgo) {
        return false
      }
    } else if (activeFilter !== "Toutes") {
      if (!note.tags || !tagNames.includes(activeFilter)) {
        return false
      }
    }



    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        note.title.toLowerCase().includes(searchLower) ||
        note.content.toLowerCase().includes(searchLower) ||
        (note.tags && tagNames.some((tagName) => typeof tagName === "string" && tagName.toLowerCase().includes(searchLower)))
      )
    }

    return true
  })



  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-background p-8 rounded-lg">
          <div className="text-center text-isabelline/90 text-xl font-lora">Loading...</div>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-background p-8 rounded-lg">
          <div className="text-carmine text-xl font-lora">{error}</div>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto z-10">
        {/* Search Bar */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 bg-arsenic/50 text-isabelline/90 rounded-full border border-stroke/20 focus:outline-none focus:border-persian-green/50 transition duration-300 font-roboto"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-3.5 text-isabelline/60"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="h-16 overflow-x-scroll custom-scrollbar overflow-y-hidden">
          <div className="flex gap-3 items-center flex-nowrap mb-12">
            {[...allTags].map((tag, index) => (
              <button
                key={index}
                className={`px-5 py-2 rounded-full shadow-lg transition-colors duration-300 font-roboto text-sm tracking-wide ${activeFilter === tag.name
                  ? "bg-persian-green text-isabelline"
                  : "bg-persian-green/40 text-isabelline/80 hover:bg-persian-green/60"
                  }`}
                onClick={() => setActiveFilter(tag.name)}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        {!userData && (
          <div className="mb-12 p-8 glass-background rounded-lg shadow-xl text-center">
            <p className="text-center font-lora font-semibold text-2xl text-saffron mb-4">Vous n'êtes pas connecté</p>
            <p className="text-isabelline/80 font-lora">
              {/* Vos notes sont sauvegardées localement. Connectez-vous pour synchroniser vos notes sur tous vos appareils. */}
              Connectez-vous pour consulter vos notes et en créer de nouvelles.
            </p>
          </div>
        )}

        {/* Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {filteredNotes.length > 0 && userData ? (
            filteredNotes.map((note) => (
              <Draggable
                key={note._id}
                defaultPosition={positions[note._id] || { x: 0, y: 0 }}
                onStop={(e, ui) => handleDragStop(e, ui, note._id)}
                bounds="parent"
                handle=".drag-handle"
              >
                <div className="relative">
                  <div className="h-full bg-arsenic/30 backdrop-blur-lg border relative border-stroke/10 rounded-lg shadow-xl px-6 pt-10 pb-8 transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-arsenic/40 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-persian-green/10 via-teal-200/10 to-obsidian/10 opacity-50"></div>
                    {/* Favorite toggle with drag handle icon */}
                    <div className="absolute top-4 right-4 flex items-center gap-4 z-10">
                      <FavoriteToggle
                        isFavorite={note.favorite}
                        onToggle={() => handleFavoriteToggle(note._id)}
                        hoverBackground={false}
                      />

                      {/* Drag handle icon (crossed arrows) */}
                      <div className="drag-handle cursor-move">
                        <Move className="w-5 h-5 text-slate-200/10 hover:text-slate-200/20 transition-opacity" />
                      </div>
                    </div>

                    {/* Note content */}
                    <h3 className="text-xl font-reggae-one text-saffron mb-3 truncate">{note.title}</h3>

                    {/* Tags section */}
                    {note.tags && note.tags.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-2">
                        {note.tags && note.tags.length > 0 && (
                          <div className="mb-3 flex flex-wrap gap-2">
                            {Array.isArray(note.tags) ? (
                              note.tags.slice(0, 3).map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-0.5 bg-saffron/20 text-saffron text-xs rounded-full font-roboto"
                                >
                                  {typeof tag === 'object' && tag.name ? tag.name : (typeof tag === 'string' ? getTagNameById(tag) : 'Unknown')}
                                </span>
                              ))
                            ) : (
                              <span className="px-2 py-0.5 bg-saffron/20 text-saffron text-xs rounded-full font-roboto">
                                Random
                              </span>
                            )}
                            {Array.isArray(note.tags) && note.tags.length > 3 && (
                              <span className="px-2 py-0.5 text-isabelline/60 text-xs font-roboto">
                                +{note.tags.length - 3} plus
                              </span>
                            )}
                          </div>
                        )}          </div>
                    )}

                    <p className="text-sm font-lora text-isabelline/80 mb-4 line-clamp-3">{note.content}</p>

                    {/* "See more" link with eye icon at bottom right */}
                    <div className="absolute bottom-4 group right-4 flex items-center gap-1 group-hover:opacity-100 opacity-70 transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-isabelline/80 group-hover:text-isabelline/90 transition-all">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <Link
                        to={`/note/${note._id}`}
                        className="text-xs font-roboto text-isabelline/80 group-hover:text-isabelline/90 transition-all"
                        onClick={(e) => e.stopPropagation()} // Prevent drag interference
                      >
                        Voir plus
                      </Link>
                    </div>

                    {/* Date at bottom left */}
                    <div className="absolute bottom-4 left-4 text-xs text-isabelline/60 font-roboto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {note.createdAt &&
                        <span>
                          {new Date(note.createdAt).toLocaleDateString()} &agrave;{" "}
                          {new Date(note.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      }
                    </div>
                  </div>
                </div>
              </Draggable>
            ))
          ) : (
            <div className="col-span-full mt-8 p-8 glass-background rounded-lg shadow-xl text-center">
              {userData?.id && <p className="font-lora text-xl text-isabelline/80">
                {activeFilter === "Favorites"
                  ? "Aucune note favorite trouvée. Marquez des notes comme favorites pour les voir ici !"
                  : activeFilter === "Récentes"
                    ? "Aucune note récente trouvée. Les notes modifiées au cours de la dernière semaine apparaîtront ici."
                    : searchTerm
                      ? "Aucune note ne correspond à votre recherche"
                      : "Aucune note trouvée. Commencez en créant votre première note !"}
              </p>
                // : <p className="font-lora text-xl text-isabelline/80">
                //   Vous n'êtes pas connecté. Connectez-vous pour voir vos notes et en créer.
                // </p>
              }
            </div>
          )}
        </div>

        {/* New Note Button (Fixed) */}
        {window.innerWidth <= 768 && userData?.id && <Link
          to="/new"
          className="fixed bottom-8 right-8 w-14 h-14 bg-persian-green rounded-full flex items-center justify-center shadow-lg hover:bg-persian-green/80 transition-colors duration-300"
          title="Créer une nouvelle note"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-isabelline"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </Link>}
      </div>
    </div>
  )
}

export default HomepageComponent