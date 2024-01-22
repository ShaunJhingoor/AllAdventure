import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css';
import { NavLink } from 'react-router-dom';
import adventureIcon from "../../images/adventureIcon.png"

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Navigate to="/" replace={true}/>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
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
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <>
     <div className='signUpOutSide'>
      <form onSubmit={handleSubmit} className='signUp'>
        <br />
        <br />
      <img src={adventureIcon} alt="alladventure" />
      <h1 id='signUpHeader'>Sign up today to start planning your next adventure</h1>
        <br />
        <ul className='signUpErrors'>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <br />
        <input
            type="text"
            value={fname}
            placeholder='First Name'
            id='signUpFname'
            onChange={(e) => setFname(e.target.value)}
            required
          />
          <br />
          <input
            type="text"
            value={lname}
            placeholder='Last Name'
            id='signUpLname'
            onChange={(e) => setLname(e.target.value)}
            required
          />
          <br />
          <input
            type="text"
            value={email}
            placeholder='Email'
            id='signUpEmail'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <input
            type="text"
            value={username}
            placeholder='Username'
            id='signUpUsername'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />
          <input
            type="password"
            placeholder='Password'
            id='signUpPassword'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <input
            type="password"
            id='signUpConfirmPassword'
            value={confirmPassword}
            placeholder='Confirm Password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <br />
        <br />
        <button type="submit" id='signUpButton'>Sign Up</button>
        <br />
        <p>Already have an account? <NavLink to="/login">Log In</NavLink></p> 
      </form>
      </div>
      <div className='signUpFooter'>

    </div>
    </>
  );
}

export default SignupForm;