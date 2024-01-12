import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './Profilebutton';
import './Navigation.css';

function Navigation() {
    const sessionUser = useSelector(state => state.session.user);
  
    let sessionLinks;
    if (sessionUser) {
      sessionLinks = (
        <ProfileButton user={sessionUser} />
      );
    } else {
      sessionLinks = (
        <>
          <NavLink to="/signup">Sign Up</NavLink>
          <NavLink to="/login">Log In</NavLink>
        </>
      );
    }
  
    return (
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
          {sessionLinks}
        </li>
      </ul>
    );
  }
  
  export default Navigation;