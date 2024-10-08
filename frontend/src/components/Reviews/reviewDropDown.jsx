import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../../store/trail";
import * as modalActions from "../../store/modal";
import { Fetchtrail } from "../../store/trail";
import EditModal from "../modals/editmodal";

function ReviewDropDown({ review, trail, visible, setVisible }) {
  const dispatch = useDispatch();
  const edit = useSelector((state) => state?.modals?.editReview);

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteReview(review?.id));
    await dispatch(Fetchtrail(trail.id));
    setVisible(!visible);
  };
  const handleShowModal = (e) => {
    e.preventDefault();
    dispatch(modalActions.showModal("editReview"));
  };

  return (
    <div className="editReviewWrapper">
      <div id="editReviewModal">
        {edit && (
          <EditModal
            review={review}
            trail={trail}
            visible={visible}
            setVisible={setVisible}
          />
        )}
      </div>
      <div className="editwrapper">
        <div id="editReviewWrapper" onClick={handleShowModal}>
          Edit
        </div>

        <p id="deleteReviewWrapper" onClick={handleDelete}>
          Delete
        </p>
      </div>
    </div>
  );
}

export default ReviewDropDown;
