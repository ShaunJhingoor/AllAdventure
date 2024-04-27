import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate} from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './LoginForm.css';
import Footer from '../footer/Footer';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const sessionUser = useSelector(state => state?.session?.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const demoLogin = async(e) => {
    e.preventDefault() 
    await dispatch(sessionActions.login({credential:'Demo-lition', password:'password'})) 
    navigate("/trails")
  }
  
  if (sessionUser) return <Navigate to="/trails" replace={true} />;
  const handleSubmit = (e) => {
   e.preventDefault()
    setErrors([]);
    dispatch(sessionActions.login({ credential : credential, password: password }))
      .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();

        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  }

  return (
    <div className='logincontainer'>
    <div className='loginoutside'>
      <form onSubmit={handleSubmit} className='login'>
        <br />
        <br />
      <h1 id='loginheader'> Welcome back. </h1>
      <h1 id='loginheader1'>Log in and start exploring.</h1>
          <br />
          <br />
          <br />
          <input
            id='loginusername'
            type="text"
            value={credential}
            placeholder="Username or Email"
            onChange={(e) => setCredential(e.target.value)}
            style={{font: 'monorope-m', fontFamily: 'Arial', fontSize: '20px', color: "rgb(20,40,4)"}}
            required
          />
       
       <br />
          <input
            type="password"
            id='loginpassword'
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={{font: 'monorope-m', fontFamily: 'Arial', fontSize: '20px', color: "rgb(20,40,4)"}}
            required
          />
        <br />
        <br />
        <ul id="loginerrors">
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <br />
        <button type="submit" id='demologin' onClick={demoLogin}>Demo Login</button>
        <br />
        <button type="submit" id='loginbutton' >Log In</button>
        <br />
        <p>Do not have an account? <NavLink to="/signup">Sign Up</NavLink> </p> 
      </form>
    </div >
   
     <Footer/>
     </div>
    
  );
}

export default LoginForm;