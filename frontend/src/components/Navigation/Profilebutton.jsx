
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileButton.css'
import bird from "../../images/bird.jpeg"
import { useNavigate } from 'react-router-dom';

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate()
  
  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    setShowMenu(true);
  };
  
//   useEffect(() => {
//     if (!showMenu) return;

//     const closeMenu = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };

//     // document.addEventListener('click', closeMenu);
  
//     // return () => document.removeEventListener('click', closeMenu);
// , [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    navigate("/")
  };

  return (

    <>
      <h1 id='helpMe' onClick={() => navigate("/help")}>Help</h1>
      <div onMouseOver={toggleMenu} onMouseLeave={() => setShowMenu(false)} className="profile-button"> <img src={bird} alt="profile" id='bird'/>
        {showMenu && (
        <div className="profile-dropdown" ref={dropdownRef} onMouseOver={toggleMenu} >
          <p onClick={logout} id="logout-button"> Logout </p>
        </div>
      )}
      </div>  
      </>
  );
}

export default ProfileButton;