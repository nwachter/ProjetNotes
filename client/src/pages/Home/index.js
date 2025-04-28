"use client"

import { useEffect, useState } from "react"
import { fetchAllNotesFromLS, getNotesByCreatorId } from "../../services/notes"
import { getAllTags } from "../../services/tags"
import { checkConnectionAndGetInfo } from "../../utils/decryptJwt"
import { Link } from "react-router-dom"
import Draggable from "react-draggable"

const HomepageComponent = () => {
  const [notes, setNotes] = useState([])
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userData, setUserData] = useState({})
  const [positions, setPositions] = useState({})
  const [activeFilter, setActiveFilter] = useState("All Notes")
  const [searchTerm, setSearchTerm] = useState("")

  // Get unique tags from all notes
  // const allTags = [...new Set(notes.flatMap((note) => (Array.isArray(note.tags) ? note.tags : [])))]
  // const allTags = [...new Set(tags.flatMap((tag) => (!!tag ? tag : {})))]
  const allTags = [...tags, { name: "All Notes", _id: "All Notes" }, { name: "Favorites", _id: "Favorites" }, { name: "Recent", _id: "Recent" }] ?? [];


  const getTagNameById = (id) => {
    const tag = allTags.find((tag) => tag._id === id)
    return tag?.name
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await checkConnectionAndGetInfo()
        const user = data.user
        console.log("USER : ", user)
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

    const getTags = async () => {
      try {
        let data
        // if (!userData?.id) {
        //   data = getTagsByCreatorId(userData?.id)
        // } else {
        //   data = await getTags();
        // }
        data = await getAllTags();
        console.log("getTags : ", data);
        setTags(data)

      } catch (err) {
        // setError("Failed to fetch tags.")
        setTags([])
      } finally {
        setLoading(false)
      }
    }

    getNotes()
    getTags()
  }, [userData])

  const handleDragStop = (e, ui, noteId) => {
    const newPositions = {
      ...positions,
      [noteId]: { x: ui.x, y: ui.y },
    }
    setPositions(newPositions)
    localStorage.setItem("notePositions", JSON.stringify(newPositions))
  }

  const filteredNotes = notes.filter((note) => {
    const fullTags = note.tags?.map((tag) => getTagNameById(tag)) || []
    // First apply tag filter if not "All Notes"
    if (activeFilter !== "All Notes" && activeFilter !== "Favorites" && activeFilter !== "Recent") {

      if (!note.tags || !fullTags.includes(activeFilter)) {
        return false
      }
    }

    // Then apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        note.title.toLowerCase().includes(searchLower) ||
        note.content.toLowerCase().includes(searchLower) ||
        (note.tags && fullTags.some((tag) => typeof tag === "string" && tag.toLowerCase().includes(searchLower)))
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
        <div className="flex justify-center gap-3 flex-wrap mb-12">
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

        {!userData && (
          <div className="mb-12 p-8 glass-background rounded-lg shadow-xl text-center">
            <p className="text-center font-lora font-semibold text-2xl text-saffron mb-4">Vous n'êtes pas connecté</p>
            <p className="text-isabelline/80 font-lora">
              Vos notes sont sauvegardées localement. Connectez-vous pour synchroniser vos notes sur tous vos appareils.
            </p>
          </div>
        )}

        {/* Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <Draggable
                key={note._id}
                defaultPosition={positions[note._id] || { x: 0, y: 0 }}
                onStop={(e, ui) => handleDragStop(e, ui, note._id)}
                bounds="parent"
              >
                <div className="cursor-move">
                  <Link to={`/note/${note._id}`} className="block h-full">
                    <div className="h-full bg-arsenic/30 backdrop-blur-lg border relative border-stroke/10 rounded-lg p-6 shadow-xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-arsenic/40 group">
                      <div className="absolute inset-0 bg-gradient-to-br from-persian-green/10 via-teal-200/10 to-obsidian/10 opacity-50"></div>
                      <h3 className="text-xl font-reggae-one text-saffron mb-3 truncate">{note.title}</h3>

                      {note.tags && note.tags.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-2">
                          {Array.isArray(note.tags) ? (
                            note.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-0.5 bg-saffron/20 text-saffron text-xs rounded-full font-roboto"
                              >
                                {getTagNameById(tag)}
                              </span>
                            ))
                          ) : (
                            <span className="px-2 py-0.5 bg-saffron/20 text-saffron text-xs rounded-full font-roboto">
                              Random
                            </span>
                          )}
                          {Array.isArray(note.tags) && note.tags.length > 3 && (
                            <span className="px-2 py-0.5 text-isabelline/60 text-xs font-roboto">
                              +{note.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      <p className="text-sm font-lora text-isabelline/80 mb-4 line-clamp-3">{note.content}</p>

                      <div className="mt-auto pt-2 text-xs text-isabelline/60 font-roboto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {note.createdAt && <span>{new Date(note.createdAt).toLocaleDateString()}</span>}
                      </div>
                    </div>
                  </Link>
                </div>
              </Draggable>
            ))
          ) : (
            <div className="col-span-full mt-8 p-8 glass-background rounded-lg shadow-xl text-center">
              <p className="font-lora text-xl text-isabelline/80">
                {searchTerm ? "No notes match your search." : "No notes found. Start creating your first note!"}
              </p>
            </div>
          )}
        </div>

        {/* New Note Button (Fixed) */}
        <Link
          to="/new"
          className="fixed bottom-8 right-8 w-14 h-14 bg-persian-green rounded-full flex items-center justify-center shadow-lg hover:bg-persian-green/80 transition-colors duration-300"
          title="Create New Note"
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
        </Link>
      </div>
    </div>
  )
}

export default HomepageComponent

