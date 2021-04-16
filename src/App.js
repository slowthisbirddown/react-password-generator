import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
import {numbers, upperCaseLetters, lowerCaseLetters, specialCharacters} from './characters'
import 'react-toastify/dist/ReactToastify.css';
import { COPY_SUCCESS } from './message'

class App extends React.Component {
  constructor(props) {
    super(props);

    // Set default states
    this.state = {
      password: "",
      passwordLength: 16,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true
    };

    // Handle binds
    this.handleGeneratePassword = this.handleGeneratePassword.bind(this)
    this.handleCopyPassword = this.handleCopyPassword.bind(this)
  }

  setPassword(password) {
    this.setState({
      password: password
    });
  }

  setPasswordLength(length) {
    this.setState({
      passwordLength: length
    });
  }

  setIncludeUppercase(checked) {
    this.setState({
      includeUppercase: checked
    });
  }

  setIncludeLowercase(checked) {
    this.setState({
      includeLowercase: checked
    });
  }

  setIncludeNumbers(checked) {
    this.setState({
      includeNumbers: checked
    });
  }

  setIncludeSymbols(checked) {
    this.setState({
      includeSymbols: checked
    });
  }

  createPassword(characterList) {
    let password = ''
    const characterListLength = characterList.length

    // console.log(characterListLength);

    // Generates random index
    for (let i=0; i < this.state.passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }

    return password
  }

  handleGeneratePassword() {
    // Condition checking
    if(!this.state.includeUppercase && !this.state.includeLowercase && !this.state.includeNumbers && !this.state.includeSymbols) {
      // notify('You must select at least one option', true)
      alert("You must select at least one option")
    } else {
      let characterList = ''

      if(this.state.includeLowercase) {
        // Type what CTRL+K+C
        characterList = characterList + lowerCaseLetters
      }
      if(this.state.includeUppercase) {
        characterList = characterList + upperCaseLetters
      }

      if(this.state.includeNumbers) {
        characterList = characterList + numbers
      }

      if(this.state.includeSymbols) {
        characterList = characterList + specialCharacters
      }

      this.setPassword(this.createPassword(characterList))
    }
  }

  handleCopyPassword () {
    if(this.state.password === '') {
      // notify('Nothing to copy', true)
      alert("Nothing to copy");
    } else {
      this.copyToClipboard()
      alert("Copied to clipboard")
      // notify(COPY_SUCCESS)
    }
  }

  copyToClipboard = () => {
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = this.state.password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('Copy')
    newTextArea.remove()
  }

  render() {
    return (
      <div className='App'>
        <div className='container'>
          <div className='generator'>
            <h2 className='generator__header'>
              Password Generator
            </h2>

            <div className='generator__password'>
              <h3>{this.state.password}</h3>
              <button onClick={this.handleCopyPassword} className="copy__btn">
                <i className='far fa-clipboard'></i>
              </button>
            </div>

            {/* Password Length */}
            <div className="form-group">
              <label htmlFor="password-length">Password length</label>
              <input
                defaultValue={this.state.passwordLength}
                // This did not allow to use the arrows in the length box
                onChange={(e) => this.setPasswordLength(e.target.value)}
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
                checked={this.state.includeUppercase}
                onChange={(e) => this.setIncludeUppercase(e.target.checked)}
                type='checkbox'
                id='uppercase-letters'
                name='uppercase-letters'
              />
            </div>

            <div className="form-group">
              <label htmlFor="lowercase-letters">Include Lowercase letters</label>
              <input
                checked={this.state.includeLowercase}
                onChange={(e) => this.setIncludeLowercase(e.target.checked)}
                type='checkbox'
                id='lowercase-letters'
                name='lowercase-letters'
              />
            </div>

            <div className="form-group">
              <label htmlFor="include-numbers">Include Numbers</label>
              <input
                checked={this.state.includeNumbers}
                onChange={(e) => this.setIncludeNumbers(e.target.checked)}
                type='checkbox'
                id='include-numbers'
                name='include-numbers'
              />
            </div>

            <div className="form-group">
              <label htmlFor="include-symbols">Include Symbols</label>
              <input
                checked={this.state.includeSymbols}
                onChange={(e) => this.setIncludeSymbols(e.target.checked)}
                type='checkbox'
                id='include-symbols'
                name='include-symbols'
              />
            </div>

            {/* Generate password button */}
            <button onClick={this.handleGeneratePassword} className="generator__btn">Generate Password</button>
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
  }
}

export default App;
