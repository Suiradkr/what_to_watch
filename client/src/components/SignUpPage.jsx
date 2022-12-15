import '../index.css'
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
        <div class='form-container'>
            <h1>What2Watch</h1>
                <form onSubmit={handleSubmit}>
                  
                    <input type="text" class="form-control" placeholder="first name" onChange={handleChange} name='fname'required></input>
                    <input type="text" class="form-control" placeholder="last name" onChange={handleChange} name='lname' required></input>
                    <input type="email" name='email' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChange} required></input>
                    <input type="password" class="form-control" placeholder="Password" onChange={handleChange} name='pw' required></input>
                    <button class="btn btn-primary" type='submit' onClick={() => {props.signup_user(state.fname, state.lname, state.email, state.pw)}}>Sign Up</button>
                
                </form> 
                
            <p>or</p>
            <a href="/">Login</a>
        </div>
    )

}
export default SignUpPage