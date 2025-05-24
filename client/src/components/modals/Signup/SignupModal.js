"use client"
import glassDonut from "../../../assets/images/glass-donut.png"
import { useState } from "react"


const SignupComponent = ({ register }) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
  })

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    email: "",
  })

  const [alert, setAlert] = useState({ type: "", message: "" })
  const [isLoading, setIsLoading] = useState(false)

  const alertData = {
    danger: {
      type: "error",
      name: "Erreur !",
      message: "Erreur lors de l'inscription",
      css: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 transition-all",
    },
    success: {
      type: "success",
      name: "Succès !",
      message: "Inscription reussie",
      css: "p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 transition-all",
    },
  }

  const validateInput = (value, min, max, regex, name) => {
    const translatedName = name === "password" ? "mot de passe" : name === "username" ? "pseudo" : name
    if (value.length < min) {
      return `Le champ ${translatedName} doit contenir au moins ${min} caractères`
    }
    if (value.length > max) {
      return `Le champ ${translatedName} doit contenir au plus ${max} caractères`
    }
    if (!regex.test(value)) {
      return name === "password"
        ? `Le champ ${translatedName} doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre`
        : name === "username"
          ? `Le champ ${translatedName} ne doit pas contenir de caractères spéciaux`
          : `Le champ ${translatedName} n'a pas le bon format`
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

  const handleChangeEmail = (event) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    handleChange(event, "email", 5, 50, emailRegex)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (errors.password !== "" || errors.username !== "" || errors.email !== "") return

    setIsLoading(true)

    let { username, password, email } = inputs
    username = username.trim()
    password = password.trim()
    email = email.trim()

    try {
      const data = await register({
        username: username,
        password: password,
        email: email,
      })

      const alertType = data?.userData ? "success" : "danger"
      setAlert({
        type: alertType,
        message: alertData[alertType].message,
      })

      if (data?.userData) {
        setTimeout(() => {
          window.location.href = "/"
        }, 1500)
      }
    } catch (error) {
      console.error("Registration error:", error)
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

        <h2 className="text-4xl font-bold font-reggae-one text-center my-6 text-saffron">Inscrivez-vous</h2>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="relative">
            <label htmlFor="username" className="block font-roboto mb-2 text-isabelline/90">
              Pseudo
            </label>
            <input
              type="text"
              onChange={handleChangeUsername}
              placeholder="Choisissez un pseudo"
              name="username"
              id="username"
              className="w-full p-3 bg-arsenic/50 font-roboto text-isabelline border border-stroke/20 rounded-lg focus:outline-none focus:border-persian-green/50 transition duration-300"
            />
            {errors.username && <p className="text-carmine mt-1 text-[12px] font-roboto">{errors.username}</p>}
          </div>

          <div className="relative">
            <label htmlFor="email" className="block font-roboto mb-2 text-isabelline/90">
              Email
            </label>
            <input
              type="email"
              onChange={handleChangeEmail}
              name="email"
              id="email"
              placeholder="Votre adresse email"
              className="w-full p-3 bg-arsenic/50 font-roboto text-isabelline border border-stroke/20 rounded-lg focus:outline-none focus:border-persian-green/50 transition duration-300"
            />
            {errors.email && <p className="text-carmine mt-1 text-[12px] font-roboto">{errors.email}</p>}
          </div>

          <div className="relative">
            <label htmlFor="password" className="block font-roboto mb-2 text-isabelline/90">
              Mot de passe
            </label>
            <input
              type="password"
              onChange={handleChangePassword}
              name="password"
              id="password"
              placeholder="Créez un mot de passe"
              className="w-full p-3 bg-arsenic/50 font-roboto text-isabelline border border-stroke/20 rounded-lg focus:outline-none focus:border-persian-green/50 transition duration-300"
            />
            {errors.password && <p className="text-carmine mt-1 text-[12px] font-roboto">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 bg-persian-green text-isabelline rounded-lg hover:bg-persian-green/80 transition-colors duration-300 font-roboto ${isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
          >
            {isLoading ? "Inscription en cours..." : "Inscription"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignupComponent

