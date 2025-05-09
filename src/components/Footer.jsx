import { FaInstagram, FaWhatsapp} from "react-icons/fa";
import {Mail} from 'lucide-react';
import {NavLink,Link} from 'react-router-dom';
import { useSelector } from "react-redux";


export default function Footer(){
  const {currentUser}=useSelector((state)=>state.user);
    return(
        <>
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
        {(currentUser && (currentUser.role==='admin'||currentUser.role==='editor')) && <li><NavLink to="/admin" className='navLink'>Admin</NavLink></li>}          
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
        </>
    )
}