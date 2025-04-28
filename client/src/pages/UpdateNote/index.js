"use client"

import { useEffect, useState } from "react"
import { checkConnectionAndGetInfo } from "../../utils/decryptJwt"
import { updateNote, updateNoteInLS, getNoteById, getNoteByIdFromLS } from "../../services/notes"
import { useParams, useNavigate } from "react-router-dom"

const UpdateNoteComponent = () => {
  const noteId = useParams().id
  const navigate = useNavigate()
  const [note, setNote] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userData, setUserData] = useState({})
  const [success, setSuccess] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUpdateNote = async (e) => {
    e.preventDefault()
    if (!formData.title || !formData.content) {
      setError("Please fill in both title and content")
      return
    }

    try {
      let updatedNote
      const noteData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(",").map((tag) => tag.trim()) : [],
      }

      if (!userData) {
        updatedNote = await updateNoteInLS(noteId, noteData)
      } else {
        updatedNote = await updateNote(noteId, {
          ...noteData,
          image: "", //Attention, a completer!
        })
      }

      setNote(updatedNote)
      setError(updatedNote ? null : "Failed to update note. Please try again.")

      if (updatedNote) {
        // Show success message and redirect after a short delay
        setTimeout(() => {
          navigate(`/note/${noteId}`)
        }, 1500)
      }
    } catch (error) {
      console.error(error)
      setError("Failed to update note. Please try again.")
    }
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
      } finally {
        setLoading(false)
      }
    }

    fetchUserInfo()
  }, [])

  useEffect(() => {
    const fetchNoteById = async () => {
      let errorMessage = null
      let fetchedNote = null

      if (!noteId) {
        errorMessage = "Note ID is missing."
      } else {
        try {
          if (!userData) {
            fetchedNote = await getNoteByIdFromLS(noteId)
            console.log("Fetched note from local storage:", fetchedNote)
          } else if (userData?.id) {
            fetchedNote = await getNoteById(noteId)
            console.log("Fetched note from db:", fetchedNote)
          } else {
            errorMessage = "Unknown user data"
          }

          setNote(fetchedNote)
          setFormData({
            title: fetchedNote.title || "",
            content: fetchedNote.content || "",
            tags: fetchedNote.tags
              ? Array.isArray(fetchedNote.tags)
                ? fetchedNote.tags.join(", ")
                : fetchedNote.tags
              : "",
          })
        } catch (err) {
          console.error("Error fetching note:", err)
          errorMessage = "Failed to fetch the note. Please try again."
        }
      }

      setNote(fetchedNote)
      setError(errorMessage)
      setLoading(false)
      return fetchedNote
    }

    fetchNoteById()
  }, [noteId, userData])

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-obsidian to-arsenic">
        <div className="glass-background p-8 rounded-lg max-w-md">
          <div className="text-center text-isabelline/90 text-xl font-lora">Loading...</div>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-obsidian to-arsenic">
        <div className="glass-background p-8 rounded-lg max-w-md">
          <div className="text-carmine text-xl font-lora">{error}</div>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-obsidian to-arsenic">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex justify-center gap-4 flex-wrap">
          {["Personal", "Work", "Ideas", "Tasks"].map((value, index) => (
            <button
              key={index}
              className="px-6 py-2 bg-persian-green/80 text-isabelline rounded-full shadow-lg hover:bg-persian-green transition-colors duration-300 font-roboto text-sm tracking-wide"
            >
              {value}
            </button>
          ))}
        </div>

        <div className="bg-gradient-to-br from-glass-100/10 via-glass-100/5 to-arsenic/10 backdrop-blur-md  p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-reggae-one text-stroke/70 mb-6">Mettre à jour une note</h2>

          {success && (
            <div className="mb-6 p-4 bg-persian-green/20 border border-persian-green/30 rounded-lg">
              <p className="text-persian-green font-roboto">{success}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-carmine/20 border border-carmine/30 rounded-lg">
              <p className="text-carmine font-roboto">{error}</p>
            </div>
          )}

          <form onSubmit={handleUpdateNote} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="old:block hidden text-isabelline/90 font-roboto">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Note Title"
                className="w-full px-4 py-3  bg-transparent text-2xl text-saffron placeholder-saffron/50 border-b border-stroke/20 focus:outline-none focus:border-saffron/50 transition duration-300 font-reggae-one"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="old:block hidden text-isabelline/90 font-roboto">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Write your note here..."
                className="w-full h-64 px-4 py-3 bg-transparent text-isabelline border-b border-stroke/20 focus:border-white/50 transition-all duration-300 placeholder-isabelline/50 focus:outline-none font-lora resize-none resize-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="tags" className="old:block hidden text-isabelline/90 font-roboto">
                Tags (comma separated)
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="work, important, idea..."
                className="w-full px-4 py-3 bg-transparent text-sm text-persian-green duration-300 placeholder-persian-green/50 border-b border-stroke/20 focus:outline-none focus:border-persian-green/50 transition duration-300  font-lora"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-arsenic/80 text-isabelline rounded-full shadow-md hover:bg-arsenic transition-colors duration-300 font-roboto"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-persian-green/80 text-isabelline rounded-full shadow-md hover:bg-persian-green transition-colors duration-300 font-roboto"
              >
                Save Note
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateNoteComponent

