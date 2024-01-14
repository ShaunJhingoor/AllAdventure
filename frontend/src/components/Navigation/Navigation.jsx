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
        <div className='innernavlink'>
          {/* <NavLink to="/signup" className='SignUp'>Sign Up</NavLink> */}
          {/* add demo login here */}
          <NavLink to="/login" className='Login'>Log In</NavLink>
        </div>
        </>
      );
    }
  
    return (
      <>
      <nav>
        <div className='links'>
          <NavLink to="/" id='home'>AllAdventure</NavLink>
       
          {sessionLinks}
        </div>
      </nav>
      </>
    );
  }
  
  export default Navigation;