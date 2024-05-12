import {Component} from 'react'

import {v4 as uuid} from 'uuid'

import PasswordHistoryItem from '../PasswordHistoryItem'

import './index.css'

class PasswordManager extends Component {
  state = {
    web: '',
    username: '',
    password: '',
    data: [],
    searchValue: '',
    isChecked: false,
  }

  onChangeWebInput = event => {
    this.setState({
      web: event.target.value,
    })
  }

  onChangeUserInput = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassInput = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {web, username, password} = this.state
    const newData = {web, username, password, id: uuid()}
    if (web !== '' && username !== '' && password !== '') {
      this.setState(prevState => ({
        data: [...prevState.data, newData],
        web: '',
        username: '',
        password: '',
      }))
    }
  }

  deleteDataItem = id => {
    const {data} = this.state
    const formatedDataList = data.filter(each => each.id !== id)
    console.log('Filtered Data List:', formatedDataList)
    this.setState({
      data: formatedDataList,
    })
  }

  onSearchInput = event => {
    this.setState({searchValue: event.target.value})
  }

  onChangeCheck = () => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked,
    }))
  }

  render() {
    const {web, username, password, data, searchValue, isChecked} = this.state
    const filteredList = data.filter(
      each =>
        each.web.toLowerCase().includes(searchValue) ||
        each.username.toLowerCase().includes(searchValue.toLowerCase()),
    )
    return (
      <div className="bg-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
        </div>
        <main className="content-container">
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <h2 className="form-heading">Add New Password</h2>
            <div className="form-input-section">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="form-input-image"
              />
              <input
                type="text"
                placeholder="Enter Website"
                className="form-input-field"
                onChange={this.onChangeWebInput}
                value={web}
              />
            </div>
            <div className="form-input-section">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="form-input-image"
              />
              <input
                type="text"
                placeholder="Enter Username"
                className="form-input-field"
                onChange={this.onChangeUserInput}
                value={username}
              />
            </div>
            <div className="form-input-section">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="form-input-image"
              />
              <input
                type="password"
                placeholder="Enter Password"
                className="form-input-field"
                onChange={this.onChangePassInput}
                value={password}
              />
            </div>
            <div className="form-btn-container">
              <button type="submit" className="form-btn">
                Add
              </button>
            </div>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager-image"
          />
        </main>
        <div className="pass-hist-bg-container">
          <nav className="pass-hist-nav-section">
            <h1 className="pass-hist-nav-heading">Your Passwords</h1>
            <p className="pass-hist-nav-span">{filteredList.length}</p>
            <div className="pass-hist-nav-input-section">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="pass-hist-input-image"
              />
              <input
                type="search"
                placeholder="Search"
                className="pass-hist-nav-input-field"
                onChange={this.onSearchInput}
                value={searchValue}
              />
            </div>
          </nav>
          <div className="checkbox-input-section">
            <input
              type="checkbox"
              id="checkbox"
              className="input-field-checkbox"
              onChange={this.onChangeCheck}
            />
            <label htmlFor="checkbox" className="checkbox-label">
              Show Passwords
            </label>
          </div>
          <ul className="pass-hist-unordered-container">
            {filteredList.length === 0 && (
              <div className="pass-hist-image-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="pass-hist-image"
                />
                <p className="no-password-text">No Passwords</p>
              </div>
            )}
            {filteredList.map(each => (
              <PasswordHistoryItem
                key={each.id}
                eachData={each}
                deleteDataItem={this.deleteDataItem}
                checkboxStatus={isChecked}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default PasswordManager
