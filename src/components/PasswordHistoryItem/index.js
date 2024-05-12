import './index.css'

const PasswordHistoryItem = props => {
  const {eachData, deleteDataItem, checkboxStatus} = props
  const {web, username, id, password} = eachData
  const onClickDeleteBtn = () => {
    deleteDataItem(id)
  }

  return (
    <li className="list-container">
      <div className="profile-container">
        <p className="web-first-letter">{web.slice(0, 1)}</p>
      </div>
      <div className="list-details">
        <p className="web-text">{web}</p>
        <p className="username-text">{username}</p>
        {!checkboxStatus && (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars-image"
          />
        )}
        {checkboxStatus && <p className="password-text">{password}</p>}
      </div>
      <button
        className="delete-button"
        type="button"
        onClick={onClickDeleteBtn}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-image"
        />
      </button>
    </li>
  )
}

export default PasswordHistoryItem
