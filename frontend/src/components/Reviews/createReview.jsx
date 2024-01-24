import { useDispatch, useSelector } from "react-redux"
import * as modalActions from '../../store/modal'
import CreateModal from "../modals/reviewModal"
import "./createReview.css"

function CreateReview({trail}){
    const dispatch = useDispatch()
    const showModal = useSelector(state => state.modals.createReview)
 

    const handleShowModal = (e) => {
        e.preventDefault()
        dispatch(modalActions.showModal("createReview"))
    }

    return(
        <div id="createReviewWrapper">
              <div id="createReviewModal">
            {showModal && 
            <CreateModal key={trail?.id} trail={trail}/>}
          
             </div>

            <button id="createReviewButton" onClick={handleShowModal}><p id="createReviewButtonContent">Write Review</p></button>
        </div>
    )
}

export default CreateReview