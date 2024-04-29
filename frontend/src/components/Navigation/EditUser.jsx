import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditUser.css"
import { updateUser } from "../../store/session";
import hide from "../../images/hidePassword.png"
import see from "../../images/seePassword.png"
import Logo from "../../images/adventureIcon.png"
import Footer from "../footer/Footer";
function EditUser(){
    const current = useSelector((state) => state?.session?.user)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [username, setUsername] = useState(current?.username)
    const [fname, setfname] = useState(current?.fname)
    const [lname, setlname] = useState(current?.lname)
    const[password, setPassword] = useState("")
    const [email, setEmail] = useState(current?.email)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [errors, setErrors] = useState([]);
    const [oldPassword, setOldPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const togglePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
      };

      
    useEffect(() => {
        return () => {
          setIsSubmitted(false)
        }
      }, []);
      // store.dispatch(sessionActions.updateUser({ id: 12, username: "Shaun", fname: "Shaun", lname: "Jhingoor", password: "password" , email: "Jhingoor1945@gmail.com"}));
    const handleEditUser = async(e) => {
        e.preventDefault()
        if(isSubmitted) return
        setIsSubmitted(true)

        const updateUsers = {
            id: current?.id,
            username: username, 
            fname: fname,
            lname: lname, 
            password: password, 
            email: email
        }
           
        dispatch(updateUser(updateUsers, oldPassword))
            .then(() => {
                setIsSubmitted(false);
                navigate("/profile");
            })
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
        
                }catch {
                    data = await res.text(); 
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
                setIsSubmitted(false);
                });
            }
          
    return(
    <>
      <div id="editUserOutside">
        <form onSubmit={handleEditUser} className="editUser">
            <div id="logo">
                <img src={Logo} alt="logo" id="logoimag"/>

            </div>
            <br />
            {errors?.length > 0 && (
            <div className="error-container">
              <ul>
                {errors.map((error, index) => (
                  <li key={index} id="editErrors">{error}</li>
                ))}
              </ul>
            </div>
            )}

            <div id="nameUser">
                <div id="firstname">
                <p id="firstNameInputHeader">First Name</p>
                <input 
                type="text" 
                defaultValue={fname}
                onChange={(e) => setfname(e.target.value)}
                id="firstNameInput"
                />
                </div>
                <div id="firstname">
                <p id="firstNameInputHeader">Last Name</p>
                <input 
                type="text" 
                defaultValue={lname}
                onChange={(e) => setlname(e.target.value)}
                id="firstNameInput"
                />
                </div>
            </div>
            <div id="nameUser">
                <div id="firstname">
                <p id="firstNameInputHeader">Email</p>
                <input 
                type="text" 
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
                id="firstNameInput"
                />
                </div>
                <div id="firstname">
                <p id="firstNameInputHeader">Username</p>
                <input 
                type="text" 
                defaultValue={username}
                onChange={(e) => setUsername(e.target.value)}
                id="firstNameInput"
                />
                </div>

            </div>
            <div >
                <p id="PasswordInputHeader">New Password</p>
            <div id="password">
                {showPassword ? (
                    <input 
                    type="text"
                    defaultValue={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="passwordInput"
                    />
                ) : (
                    <input 
                    type="password"
                    defaultValue={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="passwordInput"
                    />
                )}
                <div onClick={togglePasswordVisibility} >
                    {showPassword ? <img src={hide} alt="hide" id="visibleimg"/> : <img src={see} alt="see" id="visibleimg"/>}
                </div>
                </div>
                </div>
                <div id="passworddisclaimerContainer">
                <p id="passworddisclaimer">This field is optional. If left blank, the password will remain unchanged.</p>
                </div>
                <div >
                <p id="PasswordInputHeader">Old Password</p>
            <div id="password">
                {showPassword1 ? (
                    <input 
                    type="text"
                    defaultValue={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    id="passwordInput"
                    />
                ) : (
                    <input 
                    type="password"
                    defaultValue={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    id="passwordInput"
                    />
                )}
                <div onClick={togglePasswordVisibility1} >
                    {showPassword1 ? <img src={hide} alt="hide" id="visibleimg"/> : <img src={see} alt="see" id="visibleimg"/>}
                </div>
                </div>
                </div>
                <div id="passworddisclaimerContainer">
                <p id="oldPassworddisclaimer">Must enter password to make changes.</p>
                </div>
            <div  id="buttonsEdit">
            <button type="submit" id="submitEdit">Submit</button>
            <button id="cancelEdit" onClick={() => navigate("/profile")}>Cancel</button>
            </div>
        </form>
       
      </div>
      <Footer/>
      </>
    )
}

export default EditUser