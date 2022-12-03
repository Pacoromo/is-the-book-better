import { useNavigate } from "react-router-dom";

//MODAL RUNS ON SEARCHRESULTS.JS IF EITHER API CANNOT BE CALLED 

const Modal = ({ modal, setModal, message1, message2 }) => {

  const navigate = useNavigate();

  //function allows user to return to home page once they click "OK" on modal
  //error messages are passed down as props from searchResults.js

  const returnHome = () => {
    setModal(false)
    navigate(`/`)
  }

  return (
    <div className={`modal-screen ${modal ? "active-modal" : ""}`}>
      <div className="warning-container">
        <p>{message1}</p>
        <p>{message2}</p>

        <button onClick={returnHome} className="modal-button">OK I'll come back later</button>
      </div>
    </div>
  )
}

export default Modal;