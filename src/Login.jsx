import axios from "axios";
import { useState } from "react";
import { currentServer } from "./assets/urls";
import { Link } from "react-router-dom";

export default function Login(){
    const [user, setUser]=useState({password:'', email:''});
    const [error, setError]=useState(false);
    const [errorMessage, setErrorMessage]=useState('Wrong Credentials');
    const [success, setSuccess]=useState(false);
    const [loading, setLoading]=useState(false);

    function formChange(e){
        setError(false);
        setSuccess(false);
        setUser({...user, [e.target.name]:e.target.value});
    }
    async function submitLogIn(e){
        e.preventDefault();
        setLoading(true);
        try{
            const res=await axios.post(`${currentServer}/user/login`,user);
            console.log(res);
            setLoading(false);
            setError(false);
            setSuccess(true);
        }
        catch(err){
            console.log(err);
            setLoading(false);
            if(err.status==404) setErrorMessage('Email not registered');
            else setErrorMessage('Wrong Credentials');
            setError(true);
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