"use client"

import { useEffect, useState } from "react"
import { checkConnectionAndGetInfo } from "../../utils/decryptJwt"
import { getNoteById, deleteNote, getNoteByIdFromLS } from "../../services/notes"
import { Link, useParams, useNavigate } from "react-router-dom"
import editIcon from "../../assets/icons/edit_icon.svg"
import deleteIcon from "../../assets/icons/delete_icon.svg"
import FavoriteToggle from "../../components/ui/FavoriteToggle"
import { updateNote } from "../../services/notes"
import ConfirmationModal from "../../components/modals/general/ConfirmationModal"

const NoteComponent = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userData, setUserData] = useState({})
  const [note, setNote] = useState({})
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const noteId = useParams().id
  const navigate = useNavigate()

  const handleDeleteNote = async () => {
    try {
      if (!userData) {
        console.error("No user data available for deletion.")
        setError("Vous devez être connecté pour supprimer une note.")
        return
      }

      await deleteNote(noteId)
      navigate("/")
    } catch (error) {
      console.error("Error deleting note:", error)
      setError("Echec lors de la suppression de la note. Veuillez essayer à nouveau.")
    }
  }

  const handleFavoriteToggle = async () => {
    try {
      if (!noteId) return;

      const updatedNote = {
        ...note,
        favorite: !note.favorite
      };

      // Update in backend or local storage
      if (userData?.id) {

        await updateNote(noteId, { favorite: updatedNote.favorite });
      } else {
        setError("Vous devez être connecté pour mettre à jour une note.");
        return false;
        // await updateNoteInLS(noteId, { favorite: updatedNote.favorite });
      }

      // Update local state

      setNote(updatedNote);
      setError(null)
    } catch (err) {
      console.error("Error updating favorite status:", err);
      setError("Echec lors de la mise à jour du statut favori. Veuillez essayer à nouveau.");
    }
  }

  useEffect(() => {
    const fetchNoteById = async () => {
      let errorMessage = null
      let fetchedNote = null
      if (!noteId) {
        errorMessage = "Note non reconnue."
      } else {
        try {
          if (!userData) {
            fetchedNote = await getNoteByIdFromLS(noteId)
            console.log("Fetched note from local storage:", fetchedNote)
          } else if (userData?.id) {
            fetchedNote = await getNoteById(noteId)
            console.log("Fetched note from db:", fetchedNote)
          } else {
            errorMessage = "Utilisateur inconnu. Veuillez actualiser la page."
          }
        } catch (err) {
          console.error("Error fetching note:", err)
          errorMessage = "Echec lors de la récupération de la note. Veuillez essayer à nouveau."
        }
      }
      setNote(fetchedNote)
      setError(errorMessage)
      setLoading(false)
    }

    fetchNoteById()
  }, [noteId, userData])

  // const fetchNoteById2 = async () => {
  //   let errorMessage = null
  //   let fetchedNote = null
  //   if (!noteId) {
  //     errorMessage = "Note non reconnue."
  //   } else {
  //     try {
  //       if (!userData) {
  //         fetchedNote = await getNoteByIdFromLS(noteId)
  //         console.log("Fetched note from local storage:", fetchedNote)
  //       } else if (userData?.id) {
  //         fetchedNote = await getNoteById(noteId)
  //         console.log("Fetched note from db:", fetchedNote)
  //       } else {
  //         errorMessage = "Utilisateur inconnu. Veuillez actualiser la page."
  //       }
  //     } catch (err) {
  //       console.error("Error fetching note:", err)
  //       errorMessage = "Echec lors de la récupération de la note. Veuillez essayer à nouveau."
  //     }
  //   }
  //   setNote(fetchedNote)
  //   setError(errorMessage)
  //   setLoading(false)
  //   return fetchedNote;
  // }
  // const note2 = use(fetchNoteById())

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
      } finally {
        setLoading(false)
      }
    }

    fetchUserInfo()
  }, [])

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-obsidian to-arsenic">
        <div className="glass-background p-8 rounded-lg max-w-md">
          <div className="text-center text-isabelline/90 text-xl font-lora">Chargement...</div>
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

        <div className="bg-gradient-to-br from-glass-100/10 via-glass-100/5 to-arsenic/10 border-stroke/5 border-[1px] backdrop-blur-md  p-8 rounded-lg shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-reggae-one text-saffron">{note.title}</h2>

            <div className="flex  items-center space-x-3">
              <div className="relative">
                <FavoriteToggle
                  isFavorite={note.favorite}
                  onToggle={handleFavoriteToggle}
                  hoverBackground={true}

                />

              </div>

              <Link
                to={`/update/${note._id}`}
                className="p-2 bg-arsenic/50 rounded-full hover:bg-arsenic/80 transition-colors duration-300"
                title="Edit Note"
              >
                <img src={editIcon || "/placeholder.svg"} alt="Edit" className="w-5 h-5" />
              </Link>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="p-2 bg-arsenic/50 rounded-full hover:bg-carmine/30 transition-colors duration-300"
                title="Delete Note"
              >
                <img src={deleteIcon || "/placeholder.svg"} alt="Delete" className="w-5 h-5" />
              </button>
            </div>
          </div>

          {note.tags && note.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {Array.isArray(note.tags) ? (
                note.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-saffron/20 text-saffron text-xs rounded-full font-roboto">
                    {tag.name}
                  </span>
                ))
              ) : (
                <span className="px-3 py-1 bg-saffron/20 text-saffron text-xs rounded-full font-roboto">
                  {note.tags}
                </span>
              )}
            </div>
          )}

          <div className="mt-6">
            <p className="text-isabelline/90 font-lora whitespace-pre-wrap leading-relaxed">{note.content}</p>
          </div>

          <div className="mt-8 pt-4 border-t border-stroke/10 flex justify-between items-center">
            <div className="text-xs text-isabelline/60 font-roboto">
              {note.createdAt && (
                <span>
                  Crée le : {new Date(note.createdAt).toLocaleDateString()} &agrave;{" "}
                  {new Date(note.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </span>
              )}
            </div>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-arsenic/50 text-isabelline/80 rounded-full text-sm hover:bg-arsenic/80 transition-colors duration-300 font-roboto"
            >
              Retour aux notes
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {/* {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gradient-to-br from-glass-100/10 via-glass-100/5 to-arsenic/10 border-stroke/5 border-[1px] backdrop-blur-md rounded-xl p-4 flex items-center justify-center z-50">
          <div className="glass-background p-8 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-reggae-one text-carmine mb-4">Supprimer la note</h3>
            <p className="text-isabelline/90 font-lora mb-6">
              Etes-vous sûr de vouloir supprimer cette note ? Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-arsenic/80 text-isabelline rounded-full hover:bg-arsenic transition-colors duration-300 font-roboto"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteNote}
                className="px-4 py-2 bg-carmine/80 text-isabelline rounded-full hover:bg-carmine transition-colors duration-300 font-roboto"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )} */}

      {showDeleteConfirm && <ConfirmationModal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} handleDeleteNote={handleDeleteNote} />}
    </div>
  )
}

export default NoteComponent

