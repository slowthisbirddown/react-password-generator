import React, { useState } from 'react';
import './App.css';
import {numbers, upperCaseLetters, lowerCaseLetters, specialCharacters} from './characters'

function App() {
  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(20)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeLowercase, setIncludeLowercase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)

  // const handleGeneratePassword = (e) => {
  /**
   * Handle password generation
   * This is my comment to Adam to explain
   * how the fuck this function works
   * @param {event} e
   */
  function handleGeneratePassword(e) {
    let characterList = ''

    if(includeLowercase) {
      // Type what CTRL+K+C
      characterList= characterList + lowerCaseLetters
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
            <button className="copy__btn">
              <i className='far fa-clipboard'></i>
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="password-length">Password length</label>
            <input
            defaultValue={passwordLength}
            onChange={(e) => setPasswordLength.target.defaultValue}
            type="number"
            id="password-length"
            name="password-length"
            max='20'
            min='10'/>
          </div>

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

          <button onClick={handleGeneratePassword} className="generator__btn">Generate Password</button>
        </div>
      </div>
    </div>
  );
}

export default App;
