import Articles from './Articles.jsx';
import Home from './Home.jsx';
import Motions from './Motions.jsx';
import Profiles from './Profiles.jsx';
import Timelines from './Timelines.jsx';
import Tools from './Tools.jsx';
import PageNotFound from './PageNotFound.jsx';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
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
        <Link to="/" className='navLink'>Home</Link>
        <Link to="/profiles" className='navLink'>Profiles</Link>
        <Link to="/motions" className='navLink'>Motions</Link>
        <Link to="/articles" className='navLink'>Articles</Link>
        <Link to="/tools" className='navLink'>Tools</Link>
        <Link to="/timelines" className='navLink'>Timelines</Link>
        </div>
      </nav>
      <div className={sideBarOPen? 'sidebarOpen':'sidebarClosed'}>
        <Link onClick={handleSidebar} to="/" className='navLink'>Home</Link>
        <Link onClick={handleSidebar} to="/profiles" className='navLink'>Profiles</Link>
        <Link onClick={handleSidebar} to="/motions" className='navLink'>Motions</Link>
        <Link onClick={handleSidebar} to="/articles" className='navLink'>Articles</Link>
        <Link onClick={handleSidebar} to="/tools" className='navLink'>Tools</Link>
        <Link onClick={handleSidebar} to="/timelines" className='navLink'>Timelines</Link>
      </div>
      <main style={{minHeight:'50vh', margin:'8px'}}>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/profiles" element={<Profiles />}/>
        <Route path="/motions" element={<Motions />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/timelines" element={<Timelines />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      </main>
      <footer>
      <div>
        <h4>Quick Links</h4>
        <ul>
        <li><Link to="/" className='navLink'>Home</Link></li>
        <li><Link to="/profiles" className='navLink'>Profiles</Link></li>
        <li><Link to="/motions" className='navLink'>Motions</Link></li>
        <li><Link to="/articles" className='navLink'>Articles</Link></li>
        <li><Link to="/tools" className='navLink'>Tools</Link></li>
        <li><Link to="/timelines" className='navLink'>Timelines</Link></li>          
        </ul>
      </div>
      <div style={{borderTop:'1px solid', display:'flex', justifyContent:'center',gap:'2vw'}}>
        <h4>Reach us:</h4>
        <a href="https://www.instagram.com/jkuat_debate_society_?igsh=MWQ0eHI3N2FtOHhleg=="
        target='_blank'>
          <FaInstagram size={'5vw'}/></a>
          <a href="mailto: jkuatdebates@gmail.com" target='_blank'>
          <Mail size={'5vw'}/></a>
          <a href="https://wa.me/254705984120?text=Hi%20there!%20I%27d%20like%20to%20chat%20about%20JDS." target='_blank'>
          <FaWhatsapp size={'5vw'}/></a>
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
