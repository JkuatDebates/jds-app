import axios from "axios";
import { useRef, useState } from "react";
import { currentServer } from "./assets/urls";
import { useNavigate } from "react-router-dom";
import { logOut } from "./redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { googleLogout } from "@react-oauth/google";

export default function UserProfile(){
    const {currentUser}= useSelector((state)=>state.user);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [newPwd, setNewPwd]=useState({entry1:'',entry2:''});
    const [newUsn, setNewUsn]=useState('');
    const [usnChange, setUsnChange]=useState(false);
    const [pwdChange, setPwdChange]=useState(false);
    const [deleting, setDeleting]=useState(false);
    const [error, setError]=useState(false);
    const [success, setSuccess]=useState(false);
    const [errMessage, setErrMessage]=useState('Something Went Wrong');
    const [loading, setLoading]=useState(false);
    const deleteRef=useRef(null);

    function logout(){
        const token=localStorage.getItem('token');
        if(token) localStorage.removeItem('token');
        dispatch(logOut());
        navigate('/login'); 
        googleLogout();       
    }
    function passwordOnChange(e){
        setError(false);
        setSuccess(false);
        setLoading(false);
        setNewPwd({...newPwd, [e.target.name]:e.target.value});
    }
    async function passwordOnSubmit(e){
        e.preventDefault();
        setLoading(true);
        setError(false);
        setSuccess(false);
        if(newPwd.entry1!==newPwd.entry2){
            setLoading(false);
            setError(true);
            setErrMessage('Passwords do not match');
            return;
        }
        console.log(currentUser._id);
        try{
            const res=await axios.patch(`${currentServer}/user/changePwd`,{ id:currentUser.id, password:newPwd.entry1});
            console.log(res);
            setLoading(false);
            res.status==200 && setSuccess(true);
        }
        catch(err){
            console.log(err);
            setErrMessage(err.message);
            setError(true);
            setSuccess(false);
            setLoading(false);
        }
    }
    function usernameOnChange(e){
        setError(false);
        setLoading(false);
        setSuccess(false);
        setNewUsn(e.target.value);
    }
    async function usernameOnSubmit(e){
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        setError(false);
        try{
            const res=await axios.patch(`${currentServer}/user/changeUsn`,{id:currentUser.id,username:newUsn});
            console.log(res);
            setLoading(false);
            res.status==200 && setSuccess(true);
        }
        catch(err){
            console.log(err);
            setErrMessage(err.message);
            setError(true);
            setLoading(false);
        }
    }
    async function deleteAccount(e){
        e.preventDefault();
        setLoading(true);
        try{
            const password=deleteRef.current.value;
            const res=await axios.delete(`${currentServer}/user/${currentUser.id}`,{data:{password:password}});
            setLoading(false);
            console.log(res);
            if(res.status==401){
                setErrMessage(res.data.message);
            }
            logout();
        }
        catch(err){
            console.log(err);
            err.response.data.message? setErrMessage(err.response.data.message): setErrMessage(err.message);
            setError(true);
            setLoading(false);
        }       
    }

    return(
        <>
        <section className="myProfile">
            <div className="dpdiv">{currentUser? currentUser.username.charAt(0):'D'}</div>
            <p>{currentUser? currentUser.username: 'Username'}</p>
            <p>{currentUser? currentUser.email: 'Email'}</p>
            <p>{currentUser? currentUser.role: 'Role'}</p>
            <button className="buttonOnBrand" onClick={()=>{
                setUsnChange(false);
                setPwdChange(true);
                setDeleting(false);
                setError(false);
                setSuccess(false);
                setErrMessage('Something Went Wrong');
                    document.getElementById('pwdchange').scrollIntoView({behavior:'smooth'}); 
            }}>Change Password</button>
            <button className="buttonOnBrand" onClick={()=>{
                setUsnChange(true);
                setPwdChange(false);
                setDeleting(false);
                setError(false);
                setSuccess(false);
                setErrMessage('Something Went Wrong');
                    document.getElementById('usnchange').scrollIntoView({behavior:'smooth'}); 
            }}>Change Username</button>
            <button className="buttonOnBrand" onClick={()=>{
                setUsnChange(false);
                setPwdChange(false);
                setDeleting(true);
                setError(false);
                setSuccess(false);
                setErrMessage('Something Went Wrong');
                    document.getElementById('deleteAccount').scrollIntoView({behavior:'smooth'}); 
            }} style={{color:'red'}}>Delete Account</button>
            <button className="buttonOnBrand" onClick={logout}>Log Out</button>
        </section>
        <section id="pwdchange" style={{justifyItems:'center', textAlign:'center'}}>
            {pwdChange&&<form onSubmit={passwordOnSubmit}>
            <h2>Change Password</h2>
                <input type="password" name="entry1" placeholder="Enter new password" value={newPwd.entry1} onChange={passwordOnChange} minLength={8}/>
                <input type="password" name="entry2" minLength={8} placeholder="Confirm new password" value={newPwd.entry2} onChange={passwordOnChange}/>
                <button>{loading?'loading':'Change'}</button>
                <button type="button" onClick={()=>setPwdChange(false)} disabled={loading}>Cancel</button>
                {error && <p style={{color:'red'}}>{errMessage}</p>}
                {success && <p style={{color:'green'}}>'Password changed Successfully'</p>}
            </form>}
        </section>
        <section id="usnchange">
            {usnChange &&<form onSubmit={usernameOnSubmit} style={{justifyItems:'center', textAlign:'center'}}>
                <h2>Change Username</h2>
                <p>Note: Changes will reflect on next log in</p>
                <input type="text" placeholder="Enter new username" name='usn' value={newUsn} onChange={usernameOnChange}/>
                <button>{loading?'loading':'Change'}</button>
                <button type="button" onClick={()=>setUsnChange(false)} disabled={loading}>Cancel</button>
                {error && <p style={{color:'red'}}>{errMessage}</p>}
                {success && <p style={{color:'green'}}>'Username changed Successfully'</p>}
            </form>}
        </section>
        <section id="deleteAccount" style={{justifyItems:'center', textAlign:'center'}}>
            {deleting &&<form onSubmit={deleteAccount}>
                <h2>Delete Account</h2>
                <input type="password" ref={deleteRef} placeholder="Confirm Password" onChange={()=>{
                    setError(false);
                    setLoading(false);
                    }}/>
                <button>{loading?'Deleting':"Delete"}</button>
                <button type="button" onClick={()=>setDeleting(false)} disabled={loading}>Cancel</button>
                {error && <p style={{color:'red'}}>{errMessage}</p>}
            </form>}
        </section>
        </>
    )
}