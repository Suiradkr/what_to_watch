import '../App.css'
import {useState} from 'react'

function SignUpPage(props){
    const [state, setState] = useState({
        fname: "",
        lname: "",
        email: "",
        pw: "",
      })
   
    
    const handleChange = e => {
        setState({
          ...state,
          [e.target.name]: e.target.value,
        })
       }
        
      const handleSubmit = e =>{
        e.preventDefault()
      }

      
    return (
        <div class="signup-form">
            <h1>What2Watch</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="first name" onChange={handleChange} name='fname'required></input>
                    <input type="text" placeholder="last name" onChange={handleChange} name='lname' required></input>
                    <input type="text" placeholder="example@whattowatch.com" onChange={handleChange} name='email' required></input>
                    <input type="password" placeholder="Password" onChange={handleChange} name='pw' required></input>
                    <button class="signup-button" type='submit' onClick={() => {props.signup_user(state.fname, state.lname, state.email, state.pw)}}>Sign Up</button>
                </form> 
            <p>or</p>
            <a href="/">Login</a>
        </div>
    )

}
export default SignUpPage