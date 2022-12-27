import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../index.css'


function AccountPage(props){
    const navigate = useNavigate();
    const [user,setUser] = useState();
    async function logout_user(){
        await axios
          .get("/api/logout_user/")
          .then((response) => {
            props.setIsLoggedIn(false)
            navigate('/')
        })
      }
      async function getUserInfo(){
        await axios
        .get("/api/whoami/")
        .then((response) => {
          
          setUser({'firstName':response.data.fname,
                    'lastName':response.data.lname,
                    'email':response.data.email})
                    
        })
      }
   
    useEffect(() => {
    
        getUserInfo()

    },[])

    return(
        <>
            <NavBar />
            <h2>Account Info</h2>

           <div className="account-info"> <h5>First Name:</h5> {user && user['firstName']}<br/>
           <h5>Last Name:</h5> {user && user['lastName']}<br/>
           <h5>Email:</h5> {user && user['email']}<br/>
           </div>
    
           <button class="btn btn-primary" onClick={() => logout_user()}>
        Logout
      </button>
        </>
    )
}
export default AccountPage