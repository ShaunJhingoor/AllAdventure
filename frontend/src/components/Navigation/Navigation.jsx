import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './Profilebutton';
import './Navigation.css';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session'
import adventureIcon from "../../images/adventureIcon.png"


function Navigation() {
    const sessionUser = useSelector(state => state.session.user);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const demoLogin = async(e) => {
      e.preventDefault() 
      await dispatch(sessionActions.login({credential:'Demo-lition', password:'password'})) 
      navigate("/trails")
    }

    let sessionLinks;
    if (sessionUser) {
      sessionLinks = (
        <>
        <ProfileButton user={sessionUser} />
        </>
      );
    } else {
      sessionLinks = (
        <>
        
        <div className='innernavlink'>
        
        <h1 id='InfoTab' onClick={() => (navigate("/help"))}>Help</h1>
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
          <div id="myLinksNav"> 
          <NavLink to="/" id='home'><img src={adventureIcon} alt="sometrailsicon" id='homeicon'/>AllAdventure</NavLink>
          <a href="https://github.com/ShaunJhingoor" target="_blank" rel="noopener noreferrer" id='Github'>GitHub</a>
          <a href="https://www.linkedin.com/in/shaun-jhingoor-10a50328a/" target="_blank" rel="noopener noreferrer" id='Github'>LinkedIn</a>
          <a href="https://shaunjhingoor.github.io/Portfolio/" target="_blank" rel="noopener noreferrer" id='Github'>Portfolio</a>
          </div>
          
          {sessionLinks}
          
        </div>
      </nav>
      </>
    );
  }
  
  export default Navigation;