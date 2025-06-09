
export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  title,
  color
}) => {
  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="glass-background p-8 rounded-lg max-w-md w-full bg-gradient-to-br from-glass-100/10 via-glass-100/5 to-arsenic/10 border-stroke/5 border-[1px] backdrop-blur-md  flex flex-col items-center justify-center ">
        <h3 className={` ${color ? color : "text-white"} text-xl font-reggae-one text-carmine mb-4`}>{title ? title : "Confirmation"}</h3>
        <p className="text-isabelline/90 font-lora mb-6">
          {message}
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-arsenic/50 text-isabelline rounded-full hover:bg-arsenic transition-colors duration-300 font-roboto"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-carmine/80 text-isabelline rounded-full hover:bg-carmine transition-colors duration-300 font-roboto"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>

  )
}

export default ConfirmationModal
