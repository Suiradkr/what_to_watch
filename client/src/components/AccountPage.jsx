import NavBar from "./NavBar"
import { useEffect } from "react"


function AccountPage(props){

    useEffect(() => {
        props.user_info()
    },[])

    return(
        <>
            <NavBar />
           {/* <h1>User: {props.user}</h1> */}
           
    
           {/* <h1>User: {props.user.firstname}</h1>
           <h1>User: {props.user.lastname}</h1>
           <h1>User: {props.user.favorites}</h1> */}
        </>
    )
}
export default AccountPage