
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileButton.css'
function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);
  
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
  };

  return (

    
      <div onMouseOver={toggleMenu} onMouseLeave={() => setShowMenu(false)} className="profile-button"> <img src="bird.jpeg" alt="profile" id='bird'/>
        {showMenu && (
        <ul className="profile-dropdown" ref={dropdownRef} onMouseOver={toggleMenu} >
          {/* <li>{user.username}</li>
          <li>{user.email}</li> */}
          {/* if you want implement a profile start here */}
          <li onClick={logout} id="logout-button"> Logout</li>
        </ul>
      )}
      </div>
     
  
  );
}

export default ProfileButton;