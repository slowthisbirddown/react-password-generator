import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
import {numbers, upperCaseLetters, lowerCaseLetters, specialCharacters} from './characters'
import 'react-toastify/dist/ReactToastify.css';
import { COPY_SUCCESS } from './message'

function App() {

  // Checkbox states not checked by default
  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(20)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)

  /**
   * Handle password generation
   * @param {event} e
   */
  const handleGeneratePassword = (e) =>  {

    // Condition checking
    if(!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols)
      notify('You must select atleast one option',true)
    }
    let characterList = ''

    if(includeLowercase) {
      // Type what CTRL+K+C
      characterList = characterList + lowerCaseLetters
    }
    if(includeUppercase) {
      characterList = characterList + upperCaseLetters
    }

    if(includeNumbers) {
      characterList = characterList + numbers
    }

    if(includeSymbols) {
      characterList = characterList + specialCharacters
    }

    setPassword(createPassword(characterList))
  }

  const createPassword = (characterList) => {
    let password = ''
    const characterListLength = characterList.length

    console.log(characterListLength);

    // Generates random index
    for (let i=0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      console.log(characterIndex);

      password = password + characterList.charAt(characterIndex)
      console.log(password)
    }
    return password
  }

  // Copies to Clipboard. Appends
  const copyToClipboard = () => {
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('Copy')
    newTextArea.remove()
  }

  const notify = (message, hasError = false) => {
    if(hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

    } else {
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }

  }

  const handleCopyPassword = (e) => {
    copyToClipboard()
    notify(COPY_SUCCESS)
  }


  return (
    <div className='App'>
      <div className='container'>
        <div className='generator'>
          <h2 className='generator__header'>
            Password Generator
          </h2>

          <div className='generator__password'>
            <h3>{password}</h3>
            <button onClick={handleCopyPassword} className="copy__btn">
              <i className='far fa-clipboard'></i>
            </button>
          </div>

          {/* Password Length */}
          <div className="form-group">
            <label htmlFor="password-length">Password length</label>
            <input
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength.target.defaultValue}
              type="number"
              id="password-length"
              name="password-length"
              max='20'
              min='10'
            />
          </div>

          {/* input for uppercase letters */}
          <div className="form-group">
            <label htmlFor="uppercase-letters">Include Uppercase letters</label>
            <input
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              type='checkbox'
              id='uppercase-letters'
              name='uppercase-letters'
            />
          </div>

          <div className="form-group">
            <label htmlFor="lowercase-letters">Include Lowercase letters</label>
            <input
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              type='checkbox'
              id='lowercase-letters'
              name='lowercase-letters'
            />
          </div>

          <div className="form-group">
            <label htmlFor="include-numbers">Include Numbers</label>
            <input
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              type='checkbox'
              id='include-numbers'
              name='include-numbers'
            />
          </div>

          <div className="form-group">
            <label htmlFor="include-symbols">Include Symbols</label>
            <input
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              type='checkbox'
              id='include-symbols'
              name='include-symbols'
            />
          </div>

          {/* Generate password button */}
          <button onClick={handleGeneratePassword} className="generator__btn">Generate Password</button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </div>
  );
// Find out a better way to combat the red squiggly of death on this closed bracket below
}

export default App;
