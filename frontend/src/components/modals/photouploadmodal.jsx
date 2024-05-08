import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as modalActions from '../../store/modal';
import { createTrailPhoto } from '../../store/trail_photos';
import exit from '../../images/exitButton.png';
import './PhotoUploadModal.css';
import "./reviewModal.css"

const PhotoUploadModal = ({ trailId, visible, setVisible }) => {
  const dispatch = useDispatch();
  const [photoFile, setPhotoFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
      const file = e.target.files[0]
      if (file) {
        setPhotoFile(file);
        setFileName(file.name);
      } else {
        setPhotoFile(null);
        setFileName('');
      }
  };

  const handleUpload = async (e) => {
      e.preventDefault();
      if (photoFile) {
          await dispatch(createTrailPhoto(trailId, photoFile));
          dispatch(modalActions.hideModal("photoUpload"));
          setVisible(!visible);
      } else {
        setPhotoFile(null);
        setFileName('');
        setError('File type not supported. Please select a JPEG or PNG file.');
      }
  };

  const handleHideModal = () => {
      dispatch(modalActions.hideModal("photoUpload"));
  };

  return (
    <div className="upload-modal-container">
      <div className="upload-modal">
        <div className="modal-background"></div>
        <div className="upload-modal-content">
          <div className="upload-exit">
            <img onClick={() => { handleHideModal(); setVisible(false); }} className="exit-review-creater" src={exit} alt="exit" />
          </div>
          <div className="header-and-upload">
            <div className='upload-photo-header'>
              <p>Upload Photo</p>
            </div>
            <label className="file-upload">
              <input type="file" onChange={handleFileChange} />
              <p id='browseFiles'>Browse Files</p>
              <br />
              {fileName && <p id='fileName'>{fileName}</p>}
              <br />
              {error && <p id="error">{error}</p>}
            </label>
          </div>
          <br />
          <div id="breakerbarshow1"></div>
          <div className="upload-button-container">
            <button
              type="submit"
              style={{
                backgroundColor: photoFile ?  'rgb(38,67,17)': '#d3d3d3',
                color: photoFile ? 'white' : 'black' ,
                cursor: photoFile ? 'pointer' : 'not-allowed',
              }}
              disabled={!photoFile}
              id="uploadButton"
              onClick={handleUpload} // Handle upload directly here
            >
              <p id="uploadText">Upload</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploadModal
// import  { useState } from 'react';
// import { useDispatch} from 'react-redux';
// import { createTrailPhoto, fetchTrailPhotos } from '../../store/trail_photos';
// import { useEffect } from 'react'

// const PhotoUpload = () => {
//     // const photo = useSelector(trailPhotosArray)
//     const dispatch = useDispatch();
//     const [photoFile, setPhotoFile] = useState(null);

//     useEffect(() => {
//         dispatch(fetchTrailPhotos())
//     }, [dispatch])

//     const handleFileChange = (e) => {
//         setPhotoFile(e.target.files[0]);
//     };

//     const handleUpload = () => {
//         if (photoFile) {
//             dispatch(createTrailPhoto(1, photoFile)); 
//         } else {
//             console.error("No photo selected.");
//         }
//     };
//     // console.log(photo?.filter(p => p?.id == 49));
//     return (
//         <div>
//             {/* <img src={photo} alt="photo" /> */}
//             <h2>Test Trail Photo Creation</h2>
//             <input type="file" onChange={handleFileChange} />
//             <button onClick={handleUpload}>Upload Photo</button>
//         </div>
//     );
// };

// export default PhotoUpload;