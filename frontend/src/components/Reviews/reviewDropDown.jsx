import { useDispatch, useSelector } from "react-redux"
import * as reviewActions from "../../store/review"
import * as modalActions from "../../store/modal"
import EditModal from "../modals/editModal"

function ReviewDropDown({review,trail,visible,setVisible}){
    const dispatch = useDispatch()
    const edit = useSelector(state => state.modals.editReview)

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(reviewActions.deleteReview(review.id))
        setVisible(!visible)
    }
    const handleShowModal = (e) => {
        e.preventDefault()
        dispatch(modalActions.showModal("editReview"))
    }

    return (
        <>
        <div className="editModalWrapper">
            {edit && <EditModal review={review} trail={trail} visible={visible} setVisible={setVisible}/>}
        </div>
        <p className="editReviewWrapper" onClick={handleShowModal}>Edit</p>

        <p className="deleteReviewWrapper" onClick={handleDelete}>Delete</p>

        </>
    )
}


export default ReviewDropDown