"use client"

import { useEffect, useState } from "react"
import { checkConnectionAndGetInfo } from "../../utils/decryptJwt"
import { createNote } from "../../services/notes"
import { useNavigate } from "react-router-dom"
import FavoriteToggle from "../../components/ui/FavoriteToggle"

const NewNoteComponent = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [userData, setUserData] = useState({})
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    favorite: false,
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleFavoriteToggle = () => {
    setFormData((prev) => ({
      ...prev,
      favorite: !prev.favorite,
    }))
  }

  const handleCreateNote = async (e) => {
    e.preventDefault()
    if (!formData.title || !formData.content) {
      setError("Veuillez remplir le titre et le contenu de la note.")
      return
    }

    try {
      let createdNote
      const noteData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(",").map((tag) => tag.trim()) : [],
      }

      if (!userData) {
        // console.log("Not connected, creating note in local storage:", noteData)
        // createdNote = await createNoteInLS(noteData)
        setError("Vous devez être connecté pour créer une note.")
        setTimeout(() => {
          navigate("/")
        }, 1500)
        return false;
      } else {
        console.log("Connected, creating note in database:", noteData)
        createdNote = await createNote({
          image: "", //Attention, a completer!
          ...noteData,
        })
      }

      console.log("Created note:", createdNote)

      // Clear form and show success message
      setFormData({ title: "", content: "", tags: "", favorite: false })
      setError(null)
      setSuccess("Note créée avec succès !")

      // Redirect after a short delay
      setTimeout(() => {
        navigate("/")
      }, 1500)
    } catch (error) {
      console.error(error)
      setError("Echec lors de la création de la note.")
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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-background p-8 rounded-lg">
          <div className="text-center text-isabelline/90 text-xl font-lora">Loading...</div>
        </div>
      </div>
    )

  if (error && !success)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-background p-8 rounded-lg">
          <div className="text-carmine text-xl font-lora">{error}</div>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-obsidian to-arsenic">
      <div className="max-w-3xl mx-auto">
        {/* <div className="mb-8 flex justify-center gap-4 flex-wrap">
          {["Personal", "Work", "Ideas", "Tasks"].map((value, index) => (
            <button
              key={index}
              className="px-6 py-2 bg-persian-green/80 text-isabelline rounded-full shadow-lg hover:bg-persian-green transition-colors duration-300 font-roboto text-sm tracking-wide"
            >
              {value}
            </button>
          ))}
        </div> */}

        <div className="bg-gradient-to-br from-glass-100/10 via-glass-100/5 border-stroke/5 border-[1px] to-arsenic/10 backdrop-blur-md  p-8 rounded-lg shadow-xl">
          <div className="flex relative items-center justify-between mb-6">
            <h2 className="text-2xl font-reggae-one text-stroke/70">Créer une nouvelle note</h2>
            {/* Favorite Toggle */}
            <FavoriteToggle
              isFavorite={formData.favorite}
              onToggle={handleFavoriteToggle}
              hoverBackground={true}

            />

          </div>


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

          <form onSubmit={handleCreateNote} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="old:block hidden text-isabelline/90 font-roboto">
                Titre
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Titre de la note"
                className="w-full px-4 py-3  bg-transparent text-2xl text-saffron placeholder-saffron/50 border-b border-stroke/20 focus:outline-none focus:border-saffron/50 transition duration-300 font-reggae-one"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="old:block hidden text-isabelline/90 font-roboto">
                Contenu
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Ecrivez votre note ici..."
                className="w-full h-64 px-4 py-3 bg-transparent active:border-none focus:border-none active:outline-none  text-isabelline border-b border-stroke/20 focus:border-white/50 transition-all duration-300 placeholder-isabelline/50 focus:outline-none font-lora resize-none resize-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="tags" className="old:block hidden text-isabelline/90 font-roboto">
                Tags (séparés par des virgules)
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="travail, important, idée..."
                className="w-full px-4 py-3 bg-transparent text-sm text-persian-green duration-300 placeholder-persian-green/50 border-b border-stroke/20 focus:outline-none focus:border-persian-green/50 transition duration-300  font-lora"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-arsenic/80 text-isabelline rounded-full shadow-md hover:bg-arsenic transition-colors duration-300 font-roboto"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-persian-green/80 text-isabelline rounded-full shadow-md hover:bg-persian-green transition-colors duration-300 font-roboto"
              >
                Sauvegarder
              </button>
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}

export default NewNoteComponent
