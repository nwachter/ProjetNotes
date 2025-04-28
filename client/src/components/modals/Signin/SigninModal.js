"use client"
import glassDonut from "../../../assets/images/glass-donut.png"
import { useState } from "react"
import { User, LockKeyhole, LockKeyholeOpen, Mail } from "lucide-react"

const SigninModal = ({ login }) => {
  const [inputs, setInputs] = useState([{ username: "" }, { password: "" }])
  const [errors, setErrors] = useState({ username: "", password: "" })
  const [alert, setAlert] = useState({ type: "", message: "" })
  const [isLoading, setIsLoading] = useState(false)

  const alertData = {
    danger: {
      type: "error",
      name: "Erreur !",
      message: "Erreur lors de la connexion",
      css: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 transition-all",
    },
    success: {
      type: "success",
      name: "Succès !",
      message: "Connexion reussie",
      css: "p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 transition-all",
    },
  }

  const validateInput = (value, min, max, regex, name) => {
    const translatedName = name === "password" ? "mot de passe" : "pseudo"
    if (value.length < min) {
      return `Le ${translatedName} doit contenir au moins ${min} caractères`
    }
    if (value.length > max) {
      return `Le ${translatedName} doit contenir au plus ${max} caractères`
    }
    if (!regex.test(value)) {
      return name === "password"
        ? `Le ${translatedName} doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre`
        : `Le ${translatedName} ne doit pas contenir de caractères spéciaux`
    }
    return ""
  }

  const handleChange = (event, fieldName, min, max, regex) => {
    const value = event.target.value
    const error = validateInput(value, min, max, regex, fieldName)

    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }))
    setInputs((prevInputs) => ({ ...prevInputs, [fieldName]: value }))
  }

  const handleChangeUsername = (event) => {
    const usernameRegex = /^[a-zA-Z0-9]+$/
    handleChange(event, "username", 3, 20, usernameRegex)
  }

  const handleChangePassword = (event) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
    handleChange(event, "password", 8, 20, passwordRegex)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check for validation errors
    if (errors.username || errors.password) {
      return
    }

    const username = e.target.username.value
    const password = e.target.password.value

    setIsLoading(true)

    try {
      const data = await login(username, password)
      console.log("Data signin : ", data)

      if (data && data.token) {
        localStorage.setItem("isConnected", true)
      }

      const alertType = data?.user ? "success" : "danger"
      setAlert({
        type: alertType,
        message: alertData[alertType].message,
      })

      if (data?.user) {
        setTimeout(() => {
          window.location.href = "/"
        }, 1500)
      }
    } catch (error) {
      console.error("Error:", error)
      setAlert({
        type: "danger",
        message: "Server error, please try again later.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="filter backdrop-blur-md border-stroke/10 border-[5px] bg-gradient-to-t bg-opacity-[13%] from-glass-100/[7%] from-[100%] via-[0%] via-glass-200/0 to-glass-300/[40%] to-[0%] rounded-lg p-12 shadow-md relative overflow-hidden max-w-md w-full">
      <div className="relative">
        {alert.type && alertData[alert.type] && (
          <div className={alertData[alert.type].css} role="alert">
            <span className="font-semibold">{alertData[alert.type].name}</span> {alert.message}
          </div>
        )}

        <div className="absolute -top-20 -left-20 opacity-30 pointer-events-none">
          <img src={glassDonut || "/placeholder.svg"} alt="Glass Donut" className="h-72 w-72" />
        </div>

        <h2 className="text-4xl font-bold font-reggae-one text-center my-6 text-saffron">Connectez-vous</h2>
        <div
          className={`
        w-full 
        h-px 
        my-6
        bg-gradient-to-r 
        from-transparent 
        via-persian-green/30 
        to-transparent
        backdrop-blur-sm
        shadow-lg
        relative
   
      `}
        >
          <div className="
        absolute 
        inset-0 
        bg-gradient-to-r 
        from-transparent 
        via-emerald-200/10 
        to-emerald-200/10 
        blur-sm
      "/>
        </div>        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="relative">
            <label htmlFor="username" className="block font-roboto mb-2 text-isabelline/90">
              Pseudo
            </label>
            <div className="relative">
              <input
                type="text"
                onChange={handleChangeUsername}
                placeholder="Votre pseudo"
                name="username"
                id="username"
                className="w-full py-3 pr-3 pl-12 bg-arsenic/50 font-roboto text-isabelline border border-stroke/20 rounded-lg focus:outline-none focus:border-persian-green/50 transition duration-300"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mint/20" />


            </div>

            {errors.username && <p className="text-carmine mt-1 text-[12px] font-roboto">{errors.username}</p>}
          </div>

          <div className="relative">
            <label htmlFor="password" className="block font-roboto mb-2 text-isabelline/90">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type="password"
                onChange={handleChangePassword}
                name="password"
                id="password"
                placeholder="Votre mot de passe"
                className="w-full py-3 pr-3 pl-12 bg-arsenic/50 font-roboto text-isabelline border border-stroke/20 rounded-lg focus:outline-none focus:border-persian-green/50 transition duration-300"
              />
              <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mint/20" />

            </div>

            {errors.password && <p className="text-carmine mt-1 text-[12px] font-roboto">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 bg-persian-green text-isabelline rounded-lg hover:bg-persian-green/80 transition-colors duration-300 font-roboto ${isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
          >
            {isLoading ? "Connexion en cours..." : "Connexion"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SigninModal

