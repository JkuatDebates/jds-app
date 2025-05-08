import axios from "axios";
import { useState } from "react";
import { currentServer } from "./assets/urls";
import { Link, useNavigate } from "react-router-dom";

export default function Signup(){
    const [newUser, setNewUser]=useState({username:'', password:'', email:''});
    const [error, setError]=useState(false);
    const [success, setSuccess]=useState(false);
    const [errorMessage, setErrorMessage]=useState('Something Went Wrong!');
    const [loading, setLoading]=useState(false);
    const navigate=useNavigate();

    function formChange(e){
        setError(false);
        setSuccess(false);
        setNewUser({...newUser, [e.target.name]:e.target.value});
    }
    async function submitSignUp(e){
        e.preventDefault();
        //console.log(newUser);
        setLoading(true);
        try{
            const res=await axios.post(`${currentServer}/user/signup`,newUser);
            //console.log(res);
            setLoading(false);
            if(res.status!==201){
                setError(true);
                setErrorMessage(res.data.message);
            }
            setError(false);
            setSuccess(true);
            navigate('/login');
        }
        catch(err){
            console.log(err);
            setLoading(false);
            setError(true);
            err.status==500 && setErrorMessage('Email in use. Log in');
        }
    }
    return(
        <>
        <form onSubmit={submitSignUp} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <h2>Sign Up</h2>
        <input type="text" placeholder="Enter username" required name="username" onChange={formChange}/>
        <input type="email" placeholder="Enter email" required name="email" onChange={formChange}/>
        <input type="password" placeholder="Enter password" required name="password" onChange={formChange}/>
        <button className="buttonOnBrand" style={{width:'80vw', maxWidth:'700px'}} disabled={loading}> {loading? 'Signing Up...': 'SIGN UP'}</button>
        {error && <p style={{color:'red'}}>{errorMessage}</p>}
        {success && <p style={{color:'green'}}>Sign Up Successful, Log In</p>}
        <p>Or <Link to='/login' style={{color:'hsl(166, 100%, 20%)', textDecoration:'none'}}>Log In</Link></p>
        </form>
        </>
    )
}