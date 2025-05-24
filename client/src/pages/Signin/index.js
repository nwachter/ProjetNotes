import React from 'react';
import glassDonut from "../../assets/images/glass-donut.png";
import { login } from '../../services/auth';
import { useState } from 'react';


const SigninComponent = () => {
  const [inputs, setInputs] = useState([
    { username: '' },
    { password: '' },
  ]);
  const [errors, setErrors] = useState(
    { username: '' },
    { password: '' }
  );

  console.log()

  const [alert, setAlert] = useState({ type: '', message: '' });

  const alertData = {
    danger: {
      type: "error",
      name: "Erreur !",
      message: "Erreur lors de la connexion",
      css: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 transition-all"
    },
    success: {
      type: "success",
      name: "Succès !",
      message: "Connexion reussie",
      css: "p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 transition-all"
    }
  };

  const validateInput = (value, min, max, regex, name) => {
    const translatedName = name === "password" ? "mot de passe" : "pseudo";
    if (value.length < min) {
      return `Le ${translatedName} doit contenir au moins ${min} caractères`;
    }
    if (value.length > max) {
      return `Le ${translatedName} doit contenir au plus ${max} caractères`;
    }
    if (!regex.test(value)) {
      return name === "password"
        ? `Le ${translatedName} doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre`
        : `Le ${translatedName} ne doit pas contenir de caractères spéciaux`;
    }
    return "";
  };

  const handleChange = (event, fieldName, min, max, regex) => {
    const value = event.target.value;
    const error = validateInput(value, min, max, regex, fieldName);

    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }));
    setInputs((prevInputs) => ({ ...prevInputs, [fieldName]: value }));
  };

  const handleChangeUsername = (event) => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    handleChange(event, "username", 3, 20, usernameRegex);
  };

  const handleChangePassword = (event) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    handleChange(event, "password", 8, 20, passwordRegex);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const data = await login(username, password); // Correct call

      //console.log("Data signin : ", data);

      if (data && data.token) {
        localStorage.setItem('isConnected', true);
        //   localStorage.setItem('token', data.token);
      }

      const alertType = data?.user ? 'success' : 'danger';
      setAlert({
        type: alertType,
        message: alertData[alertType].message
      });

      // setTimeout(() => {
      //   if (data?.user) {
      //     window.location.href = '/';

      //   }
      // }, 4000);
    } catch (error) {
      console.error('Error:', error);
      alert('Server error, please try again later.');
    }
  };

  return null
  // return (
  //   <div className="w-full h-full bg-black text-white flex p-[5%]">
  //     {/* Left Section - Form */}
  //     <div className="flex-1 flex justify-center items-center border-stroke/10 border-[5px] bg-gradient-to-t bg-opacity-[13%] from-glass-100/[7%] from-[100%] via-[0%] via-glass-200/0 to-glass-300/[40%] to-[0%] rounded-md p-4 shadow-md relative overflow-hidden">
  //       <div className="p-8 rounded-lg relative max-w-md">
  //         {alert.type && alertData[alert.type] && (
  //           <div className={alertData[alert.type].css} role="alert">
  //             <span className="font-semibold">{alertData[alert.type].name}</span> {alert.message}
  //           </div>
  //         )}
  //         <img src={glassDonut} alt="Glass Donut" className="z-0 absolute top-2 left-2 right-2 h-72 w-72 mb-6" />
  //         <h2 className="text-4xl font-bold font-reggae-one text-center my-6">Connectez-vous</h2>
  //         <form className='flex flex-col gap-6' action='http://localhost:3000' onSubmit={handleSubmit}>
  //           <div className='z-1 relative'>
  //             <label htmlFor='username' className="block font-roboto mb-2">Pseudo</label>
  //             <input
  //               type="text"
  //               onChange={handleChangeUsername}
  //               placeholder="Value"
  //               name="username"
  //               id="username"
  //               className="w-full p-3 bg-black font-roboto text-white border rounded focus:outline-none"
  //             />
  //             {errors.username && <p className='text-carmine mt-1 text-[12px] font-roboto'>{errors.username}</p>}

  //           </div>



  //           <div className='z-1 relative'>
  //             <label htmlFor='password' className="block font-roboto mb-2">Mot de passe</label>
  //             <input
  //               type="password"
  //               onChange={handleChangePassword}
  //               name="password"
  //               id='password'
  //               placeholder="Value"
  //               className="w-full p-3 bg-black font-roboto text-white border rounded focus:outline-none"
  //             />
  //             {errors.password && <p className='text-carmine mt-1 text-[12px] font-roboto'>{errors.password}</p>}

  //           </div>

  //           <button
  //             type="submit"
  //             className="w-full py-3 bg-green-800 font-roboto text-white rounded hover:bg-green-700"
  //           >
  //             Connexion
  //           </button>
  //         </form>
  //       </div>
  //     </div>

  //     {/* Right Section - Notes Display */}
  //     <div className="flex-1 relative bg-gradient-to-br border-stroke/10 border-[1px] bg-opacity-[13%] from-carmine/[7%] from-[100%] via-[0%] via-glass-200/0 to-carmine/[60%] to-[50%] rounded-md p-4 shadow-md overflow-hidden flex justify-center items-end">
  //       <div className="space-y-6 ">
  //         <div className="absolute top-0 z-[2] left-[3vw] w-[22vw]  h-[40vh] border-stroke/10 border-[1px] bg-gradient-to-t bg-opacity-[13%] from-glass-100/[7%] from-[100%] via-[0%] via-glass-200/0 to-glass-300/[40%] to-[0%] rounded-md p-4 shadow-md overflow-hidden">
  //           <h3 className="text-xl font-medium mb-2 font-reggae-one">Lorem ipsum sic</h3>
  //           <p className="text-sm text-gray-300 font-lora">
  //             Lorem ipsum dolor sit amet consectetur. Felis ultrices morbi
  //             curabitur integer montes suspendisse amet ut. Ut pulvinar nulla
  //             vulputate viverra sed ut in. Cursus tempor porta magna lectus
  //             tristique feugiat consectetur volutpat sed.
  //           </p>
  //         </div>
  //         <div className="absolute top-36 z-[3] left-[17vw] w-[22vw]  h-[40vh] border-stroke/10 border-[1px] bg-gradient-to-t bg-opacity-[13%] from-glass-100/[7%] from-[100%] via-[0%] via-glass-200/0 to-glass-300/[40%] to-[0%] rounded-md p-4 shadow-md overflow-hidden">
  //           <h3 className="text-xl font-medium mb-2 font-reggae-one">Lorem ipsum sic</h3>
  //           <p className="text-sm text-gray-300 font-lora">
  //             Lorem ipsum dolor sit amet consectetur. Felis ultrices morbi
  //             curabitur integer montes suspendisse amet ut. Ut pulvinar nulla
  //             vulputate viverra sed ut in. Cursus tempor porta magna lectus
  //             tristique feugiat consectetur volutpat sed.
  //           </p>
  //         </div>
  //       </div>
  //       <p className="font-reggae-one text-2xl font-bold">
  //         et consultez vos notes
  //       </p>
  //     </div>
  //   </div>
  // );
}

export default SigninComponent;