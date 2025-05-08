import axios from "axios";
import { useState } from "react";
import { currentServer } from "./assets/urls";
import { useNavigate } from "react-router-dom";
import { logOut } from "./redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function UserProfile(){
    const {currentUser}= useSelector((state)=>state.user);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [newCreds, setNewCreds]=useState([]);
    const [pwdChange, setPwdChange]=useState(false);

    function logout(){
        const token=localStorage.getItem('token');
        if(token) localStorage.removeItem('token');
        dispatch(logOut());
        navigate('/');
        
    }
    return(
        <div className="myProfile">
            <div className="dpdiv">{currentUser? currentUser.username.charAt(0):'D'}</div>
            <p>{currentUser? currentUser.username: 'Username'}</p>
            <p>{currentUser? currentUser.email: 'Email'}</p>
            <p>{currentUser? currentUser.role: 'Role'}</p>
            <button className="buttonOnBrand">Change Password</button>
            <button className="buttonOnBrand">Change Username</button>
            <button className="buttonOnBrand" onClick={logout}>Log Out</button>
            
        </div>
    )
}