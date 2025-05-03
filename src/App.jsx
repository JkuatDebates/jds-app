import Articles from './Articles.jsx';
import MotionsAdmin from './MotionsAdmin.jsx';
import ArticlesAdmin from './ArticlesAdmin.jsx';
import ArticlePage from './ArticlePage.jsx';
import Home from './Home.jsx';
import Motions from './Motions.jsx';
import Profiles from './Profiles.jsx';
import Events from './Events.jsx';
import Tools from './Tools.jsx';
import PageNotFound from './PageNotFound.jsx';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink,Link} from 'react-router-dom';
import { FaInstagram, FaWhatsapp} from "react-icons/fa";
import {Mail} from 'lucide-react';


function App() {
  const [sideBarOPen,setSideBarOpen]=useState(false);
  function handleSidebar(){
    setSideBarOpen(!sideBarOPen);
  }

  return (
    <>
    <Router>
      <nav className='navBar'>
        <div className='logo'>
          <img src="/jds.jpg" className='logoImage' alt="JDS logo" />
          <p>{"\u00A0"}JKUAT Debate Society</p>
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
        </div>
      </nav>
      <div className={sideBarOPen? 'sidebarOpen':'sidebarClosed'}>
        <NavLink onClick={handleSidebar} to="/" className={({isActive})=>isActive?'navLink activeLink':'navLink'}>Home</NavLink>
        <NavLink onClick={handleSidebar} to="/profiles" className={({isActive})=>isActive?'navLink activeLink':'navLink'}>Profiles</NavLink>
        <NavLink onClick={handleSidebar} to="/motions" className={({isActive})=>isActive?'navLink activeLink':'navLink'}>Motions</NavLink>
        <NavLink onClick={handleSidebar} to="/articles" className={({isActive})=>isActive?'navLink activeLink':'navLink'}>Articles</NavLink>
        <NavLink onClick={handleSidebar} to="/tools" className={({isActive})=>isActive?'navLink activeLink':'navLink'}>Tools</NavLink>
        <NavLink onClick={handleSidebar} to="/events" className={({isActive})=>isActive?'navLink activeLink':'navLink'}>Events</NavLink>
      </div>
      {sideBarOPen &&<div className='sideBarDrop' onClick={handleSidebar}></div>}
      <main style={{minHeight:'50vh', margin:'8px'}}>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/profiles" element={<Profiles />}/>
        <Route path="/motions" element={<Motions />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:id" element={<ArticlePage />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/events" element={<Events />} />
        <Route path="/admin/motions" element={<MotionsAdmin />} />
        <Route path="/admin/articles" element={<ArticlesAdmin />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      </main>
      <footer>
      <div>
        <h4>Quick Links</h4>
        <ul>
        <li><NavLink to="/" className='navLink'>Home</NavLink></li>
        <li><NavLink to="/profiles" className='navLink'>Profiles</NavLink></li>
        <li><NavLink to="/motions" className='navLink'>Motions</NavLink></li>
        <li><NavLink to="/articles" className='navLink'>Articles</NavLink></li>
        <li><NavLink to="/tools" className='navLink'>Tools</NavLink></li>
        <li><NavLink to="/events" className='navLink'>Events</NavLink></li>          
        </ul>
      </div>
      <div style={{borderTop:'1px solid', display:'flex', justifyContent:'center',gap:'3vw'}}>
        <h4>Reach us:</h4>
        <a href="https://www.instagram.com/jkuat_debate_society_?igsh=MWQ0eHI3N2FtOHhleg=="
        target='_blank'>
          <FaInstagram size={'5vw'} className='instagram icon'/></a>
          <a href="mailto: jkuatdebates@gmail.com" target='_blank'>
          <Mail size={'5vw'} className='gmail icon'/></a>
          <a href="https://wa.me/254705984120?text=Hi%20there!%20I%27d%20like%20to%20chat%20about%20JDS." target='_blank'>
          <FaWhatsapp size={'5vw'} className='whatsapp icon'/></a>
      </div>
      <div style={{borderTop:'1px solid', display:'flex',flexDirection:'column', alignContent:'center'}}>
        <p style={{fontSize:'3vw', marginTop:'2vw'}}>&copy;JKUAT Debate Society {(new Date).getFullYear()}</p>
      </div>
    </footer>
    </Router>
    </>
  )
}

export default App
