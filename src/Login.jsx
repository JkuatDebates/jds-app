import axios from "axios";
import { useState } from "react";
import { currentServer } from "./assets/urls";
import { Link, useNavigate } from "react-router-dom";
import { signInSuccess, signInFailure, signInStart } from "./redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

export default function Login(){
    const [user, setUser]=useState({password:'', email:''});
    const {loading, error}=useSelector((state)=>state.user);
    //replaces const [error, setError]=useState(false) and const [loading, setLoading]=useState(false);
    const [errorMessage, setErrorMessage]=useState('Something Went Wrong');
    const [success, setSuccess]=useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    function formChange(e){
        dispatch(signInFailure())//replaces setError(false);
        setSuccess(false);
        setUser({...user, [e.target.name]:e.target.value});
    }
    async function submitLogIn(e){
        e.preventDefault();
        dispatch(signInStart());//replaces setLoading(true);
        try{
            const res=await axios.post(`${currentServer}/user/login`,user);
            localStorage.setItem('token',res.data.token);
            const userToken= jwtDecode(res.data.token);
            //console.log(userToken);//contains userInfo object and token expiry details
            //console.log(userToken.userInfo);
            dispatch(signInSuccess(userToken.userInfo));//replaces  setLoading(false);
            dispatch(signInFailure())//replaces setError(false);
            setSuccess(true);
            navigate('/');
        }
        catch(err){
            //console.log(err);
            dispatch(signInFailure(err));//replaces setLoading(false); and setError(true);
            setErrorMessage(err.response.data.message);
        }
    }
    return(
        <>
        <form onSubmit={submitLogIn} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <h2>Log In</h2>
        <input type="email" placeholder="Enter email" required name="email" onChange={formChange}/>
        <input type="password" placeholder="Enter password" required name="password" onChange={formChange}/>
        <button className="buttonOnBrand" style={{width:'80vw', maxWidth:'700px'}} disabled={loading}> {loading? 'Logging In...': 'LOG IN'}</button>
        {error && <p style={{color:'red'}}>{errorMessage}</p>}
        {success && <p style={{color:'green'}}>Log In Successful</p>}
        <p>Don't have an account?<Link to='/signup' style={{color:'hsl(166, 100%, 20%)', textDecoration:'none'}}> Sign Up</Link></p>
        </form>
        </>
    )
}