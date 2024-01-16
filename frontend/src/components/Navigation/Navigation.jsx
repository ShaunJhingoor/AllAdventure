import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './Profilebutton';
import './Navigation.css';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session'

function Navigation() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const demoLogin = (e) => {
      e.preventDefault() 
      return dispatch(sessionActions.login({credential:'Demo-lition', password:'password'}))
    }
    let sessionLinks;
    if (sessionUser) {
      sessionLinks = (
        <ProfileButton user={sessionUser} />
      );
    } else {
      sessionLinks = (
        <>
        <div className='innernavlink'>

          <button onClick={demoLogin} id='demoLogin'>Demo Login</button>
          <NavLink to="/login" className='Login'>Log In</NavLink>
        </div>
        </>
      );
    }
  
    return (
      <>
      <nav>
        <div className='links'>
          <NavLink to="/" id='home'><img src={'adventureIcon.png'} alt="sometrailsicon" id='homeicon'/>AllAdventure</NavLink>
       
          {sessionLinks}
        </div>
      </nav>
      </>
    );
  }
  
  export default Navigation;