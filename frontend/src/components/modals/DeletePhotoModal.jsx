import { useDispatch } from 'react-redux';
import * as modalActions from '../../store/modal';
import { deleteTrailPhoto } from '../../store/trail_photos';
import exit from '../../images/exitButton.png';
import './DeletePhotoModal.css';

const DeletePhotoModal = ({ imageId, visible, setVisible }) => {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    await dispatch(deleteTrailPhoto(imageId));
    dispatch(modalActions.hideModal("deleteConfirmation")); 
    setVisible(!visible); 
  };

  const handleHideModal = () => {
    setVisible(!visible); 
    dispatch(modalActions.hideModal("deleteConfirmation")); 
  };

  return (
    <div className="delete-modal-container">
      <div className="delete-modal">
        <div className="modal-background"></div>
        <div className="delete-modal-content">
          <div className="delete-exit">
            <img onClick={handleHideModal} className="exit-review-creater" src={exit} alt="exit" />
          </div>
          <div className="delete-message">
            <p>Are you sure you want to delete this image?</p>
          </div>
          <div className="delete-button-container">
            <button id="deleteButton" onClick={handleDelete}>
              <p>Delete</p>
            </button>
            <button id="cancelButton" onClick={handleHideModal}>
              <p>Cancel</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePhotoModal;
