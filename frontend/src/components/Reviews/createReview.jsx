import { useDispatch } from "react-redux"
import * as modalActions from '../../store/modal'
import Modal from "../modals/modal"
import "./createReview.css"

function CreateReview({trail}){
    console.log('Modal rendering with trail:', trail);
    const dispatch = useDispatch()
 

    const handleShowModal = (e) => {
        e.preventDefault()
        dispatch(modalActions.showModal("createReview"))
    }

    return(
        <div id="createReviewWrapper">
              <div id="createReviewModal">
            <Modal key={trail?.id} trail={trail}/>
             </div>
            <button id="createReviewButton" onClick={handleShowModal}>Review</button>
        </div>
    )
}

export default CreateReview