import { useDispatch, useSelector } from "react-redux"
import * as reviewActions from "../../store/review"
import * as modalActions from "../../store/modal"
import { Fetchtrail } from "../../store/trail"
import EditModal from "../modals/editmodal"

function ReviewDropDown({review,trail,visible,setVisible}){
    const dispatch = useDispatch()
    const edit = useSelector(state => state.modals.editReview)

    const handleDelete = async(e) => {
        console.log(review?.id)
        e.preventDefault()
        await dispatch(reviewActions.deleteReview(review?.id))
        await dispatch(Fetchtrail(trail.id))
        setVisible(!visible)
    }
    const handleShowModal = (e) => {
        e.preventDefault()
        dispatch(modalActions.showModal("editReview"))
    }

    return (
        <div className="editReviewWrapper">
        <div id="editReviewModal">
            {edit && <EditModal review={review} trail={trail} visible={visible} setVisible={setVisible}/>}
        </div>
        <div className="editwrapper">
        <p id="editReviewWrapper" onClick={handleShowModal}>Edit</p>

        <p id="deleteReviewWrapper" onClick={handleDelete}>Delete</p>
        </div>

        </div>
    )
}


export default ReviewDropDown