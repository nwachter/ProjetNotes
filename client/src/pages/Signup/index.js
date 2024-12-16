import React from 'react';
import glassDonut from "../../assets/images/glass-donut.png";
import { register } from '../../services/auth';
import { useState } from 'react';



const SignupComponent = () => {
  const [inputs, setInputs] = useState([
    { username: '' },
    { password: '' },
  ]);
  const [errors, setErrors] = useState({ username: '' },
    { password: '' },);
  const handleChangeUsername = (event) => {
    let updatedUsername = inputs.username;
    let updatedUsernameError = errors.username;
    if (event.target.value.length < 3) {
      updatedUsernameError = "Le pseudo doit contenir au moins 3 caractères";
    }
    else if (event.target.value.length > 20) {
      updatedUsernameError = "Le pseudo doit contenir au plus 20 caractères";
    }
    else {
      updatedUsernameError = "";
    }

    if (event.target.value !== '') {
      updatedUsername = event.target.value;
    }

    setErrors({ ...errors, username: updatedUsernameError });
    setInputs({ ...inputs, username: updatedUsername });
  }

  const handleChangePassword = (event) => {
    //Regex :  at least one uppercase letter, at least one lowercase letter, at least one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

    let updatedPassword = inputs.password;
    let updatedPasswordError = errors.password;
    if (event.target.value.length < 8) {
      updatedPasswordError = "Le mot de passe doit contenir au moins 8 caractères";
    }
    else if (event.target.value.length > 20) {
      updatedPasswordError = "Le mot de passe doit contenir au plus 20 caractères";
    }
    else if (passwordRegex.test(event.target.value) === false) {
      updatedPasswordError = "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre";
    }
    else {
      updatedPasswordError = "";
    }

    if (event.target.value !== '') {
      updatedPassword = event.target.value;
    }

    setErrors({ ...errors, password: updatedPasswordError });
    setInputs({ ...inputs, password: updatedPassword });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (errors.password !== "" || errors.username !== "") return;
    let { username, password } = inputs;
    username = username.trim();
    password = password.trim();
    register(inputs.username, inputs.password);
  }
  return (
    <div className="w-full h-full bg-black text-white flex p-[5%]">
      {/* Left Section - Form */}
      <div className="flex-1 flex justify-center items-center border-stroke/10 border-[5px] bg-gradient-to-t bg-opacity-[13%] from-glass-100/[7%] from-[100%] via-[0%] via-glass-200/0 to-glass-300/[40%] to-[0%] rounded-md p-4 shadow-md relative overflow-hidden">
        <div className="p-8 rounded-lg relative max-w-md">
          <img src={glassDonut} alt="Glass Donut" className="z-0 absolute top-2 left-2 right-2 h-72 w-72 mb-6" />
          <h2 className="text-4xl font-bold font-reggae-one text-center my-6">Inscrivez-vous</h2>
          <form className='flex flex-col gap-6' action='*' onSubmit={handleSubmit}>
            <div className='z-1 relative'>
              <label htmlFor='username' className="block font-roboto mb-2">Pseudo</label>
              <input
                type="text"
                onChange={handleChangeUsername}
                placeholder="Value"
                name="username"
                id="username"
                className="w-full p-3 bg-black font-roboto text-white border rounded focus:outline-none"
              />
              {errors.username && <p className='text-carmine mt-1 text-[12px] font-roboto'>{errors.username}</p>}

            </div>



            <div className='z-1 relative'>
              <label htmlFor='password' className="block font-roboto mb-2">Mot de passe</label>
              <input
                type="password"
                onChange={handleChangePassword}
                name="password"
                id='password'
                placeholder="Value"
                className="w-full p-3 bg-black font-roboto text-white border rounded focus:outline-none"
              />
              {errors.password && <p className='text-carmine mt-1 text-[12px] font-roboto'>{errors.password}</p>}

            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-800 font-roboto text-white rounded hover:bg-green-700"
            >
              Inscription
            </button>
          </form>
        </div>
      </div>

      {/* Right Section - Notes Display */}
      <div className="flex-1 bg-gradient-to-br border-stroke/10 border-[1px] bg-opacity-[13%] from-carmine/[7%] from-[100%] via-[0%] via-glass-200/0 to-carmine/[60%] to-[50%] rounded-md p-4 shadow-md relative overflow-hidden flex flex-col justify-center items-center">
        <div className="space-y-6">
          <div className="bg-gray-800 bg-opacity-60 p-6 rounded-lg max-w-sm">
            <h3 className="text-xl font-medium mb-2 font-reggae-one">Lorem ipsum sic</h3>
            <p className="text-sm text-gray-300 font-lora">
              Lorem ipsum dolor sit amet consectetur. Felis ultrices morbi
              curabitur integer montes suspendisse amet ut. Ut pulvinar nulla
              vulputate viverra sed ut in. Cursus tempor porta magna lectus
              tristique feugiat consectetur volutpat sed.
            </p>
          </div>
          <div className="bg-gray-800 bg-opacity-60 p-6 rounded-lg max-w-sm">
            <h3 className="text-xl font-medium mb-2 font-reggae-one">Lorem ipsum sic</h3>
            <p className="text-sm text-gray-300 font-lora">
              Lorem ipsum dolor sit amet consectetur. Felis ultrices morbi
              curabitur integer montes suspendisse amet ut. Ut pulvinar nulla
              vulputate viverra sed ut in. Cursus tempor porta magna lectus
              tristique feugiat consectetur volutpat sed.
            </p>
          </div>
        </div>
        <p className="mt-12 font-reggae-one text-2xl font-bold">
          et conservez vos notes
        </p>
      </div>
    </div>
  );
}

export default SignupComponent;