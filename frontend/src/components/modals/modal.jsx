import { useState } from "react"
import { useDispatch } from "react-redux"
import * as modalsAction from "../../store/modal"
import * as reviewAction from "../../store/review"
import "./modal.css"

function Modal({trail}){

    const dispatch = useDispatch()
    const [description, setDescription] = useState("")
    

    const handleSubmit =(e) => {
        
        const review ={
            description: description
        }
        e.preventDefault()
        dispatch(modalsAction.hideModal('createReview'))
        return dispatch(reviewAction.createReview(review))
    }

    const handleCloseModal = (e) => {
        e.preventDefault()
        dispatch(modalsAction.hideModal("createReview"))
    }

   
    return (
        <dialog open className="reviewModal" key={trail?.id}>
          <div className="trailInfoModal">
            <h1 id="trailNameModal">{trail?.name}</h1>
            <div className="reviewCloseButton"  onClick={handleCloseModal} height='20' width='20'>{"x"} </div>
          </div>
          <form className="feedPostModalForm" action="submit">
            <label htmlFor="reviewDescription"></label>
            <textarea id="reviewDescription" className="reviewModalTextBox" 
              type="textarea" placeholder="What do you want to talk about?" 
              maxLength='3000' value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className="reviewModalButton" 
              onClick={handleSubmit} 
              >
                Post 
            
            </button>
          </form>
        </dialog>
      );
    }

  


export default Modal