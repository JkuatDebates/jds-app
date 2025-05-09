import { BrowserRouter as Router, Routes, Route, NavLink,Link, useNavigate} from 'react-router-dom';
import { useState } from "react";
import { useSelector } from 'react-redux';

export default function  Header(){
    const [sideBarOPen,setSideBarOpen]=useState(false);
    const {currentUser}= useSelector((state)=>state.user);
    const navigate=useNavigate();

    function handleSidebar(){
        setSideBarOpen(!sideBarOPen);
      }
    function handleProfileClick(){
      if(!currentUser){
        navigate('/login');
        setSideBarOpen(false);
      }
      else{
        navigate('/userprofile');
        setSideBarOpen(false);
      }
    }

    return(
        <>
        <nav className='navBar'>
        <div className='logo'><Link to="/">
          <img src="/jds.jpg" className='logoImage' alt="JDS logo" />
          <p>{"\u00A0"}JKUAT Debate Society</p></Link>
          <div className='profile' onClick={handleProfileClick}>
            <div className='dp' onClick={()=>console.log(currentUser)}>{currentUser? currentUser.username.charAt(0): "D"}</div>
            <p>{currentUser? currentUser.username:"Sign In"}</p>
          </div>
          <button className='hamburger' 
          onClick={handleSidebar}>&#9776;</button>
        </div>
        <div className='navLinks'>
        <NavLink to="/" className={({isActive})=>isActive?'navLink activeLink':'navLink'}>Home</NavLink>
        <NavLink to="/profiles" className={({isActive})=>isActive?'navLink activeLink':'navLink'}>Profiles</NavLink>
        <NavLink to="/motions" className={({isActive})=>isActive?'navLink activeLink':'navLink'}>Motions</NavLink>
        <NavLink to="/articles" className={({isActive})=>isActive?'navLink activeLink':'navLink'}>Articles</NavLink>
        <NavLink to="/tools" className={({isActive})=>isActive?'navLink activeLink':'navLink'}>Tools</NavLink>
        <NavLink to="/events" className={({isActive})=>isActive?'navLink activeLink':'navLink'}>Events</NavLink>
        {(currentUser && (currentUser.role==='admin'||currentUser.role==='editor')) && <NavLink to="/admin" className={({isActive})=>isActive?'navLink activeLink':'navLink'}>Admin</NavLink>}
        </div>
      </nav>
      <div className={sideBarOPen? 'sidebarOpen':'sidebarClosed'}>
      <div className='dp2' onClick={handleProfileClick}>{currentUser? currentUser.username.charAt(0): "D"}</div><p onClick={handleProfileClick}>{currentUser? currentUser.username:"Sign In"}</p>
        <NavLink onClick={handleSidebar} to="/" className={({isActive})=>isActive?'navLink activeLink':'navLink'}>Home</NavLink>
        <NavLink onClick={handleSidebar} to="/profiles" className={({isActive})=>isActive?'navLink activeLink':'navLink'}>Profiles</NavLink>
        <NavLink onClick={handleSidebar} to="/motions" className={({isActive})=>isActive?'navLink activeLink':'navLink'}>Motions</NavLink>
        <NavLink onClick={handleSidebar} to="/articles" className={({isActive})=>isActive?'navLink activeLink':'navLink'}>Articles</NavLink>
        <NavLink onClick={handleSidebar} to="/tools" className={({isActive})=>isActive?'navLink activeLink':'navLink'}>Tools</NavLink>
        <NavLink onClick={handleSidebar} to="/events" className={({isActive})=>isActive?'navLink activeLink':'navLink'}>Events</NavLink>
        {(currentUser && (currentUser.role==='admin'|| currentUser.role==='editor')) && <NavLink onClick={handleSidebar} to="/admin" className={({isActive})=>isActive?'navLink activeLink':'navLink'}>Admin</NavLink>}
      </div>
      {sideBarOPen &&<div className='sideBarDrop' onClick={handleSidebar}></div>}
        </>
    )
}