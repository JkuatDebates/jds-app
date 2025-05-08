import Articles from './Articles.jsx';
import MotionsAdmin from './Admin/MotionsAdmin.jsx';
import EventsAdmin from './Admin/EventsAdmin.jsx';
import ProfilesAdmin from './Admin/ProfilesAdmin.jsx';
import ArticlesAdmin from './Admin/ArticlesAdmin.jsx';
import ArticlePage from './ArticlePage.jsx';
import Admin from './Admin/Admin.jsx';
import Home from './Home.jsx';
import Motions from './Motions.jsx';
import Profiles from './Profiles.jsx';
import Events from './Events.jsx';
import Tools from './Tools.jsx';
import PageNotFound from './PageNotFound.jsx';
import { BrowserRouter as Router, Routes, Route, NavLink,Link} from 'react-router-dom';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import UserProfile from './UserProfile.jsx';
import { signInSuccess } from './redux/user/userSlice.js';
import { useDispatch } from 'react-redux';
import { jwtDecode } from "jwt-decode";
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoutes from './components/ProtectedRoute.jsx';
import Users from './Users.jsx';


function App() {
  const dispatch=useDispatch();
  const token=localStorage.getItem('token');
  if(token){
    const decoded=jwtDecode(token);
    //console.log(decoded);
    if(decoded.exp<Date.now()/1000){
      //console.log('Token expired');
      localStorage.removeItem('token');
    }
    else
      try{
        console.log('token active');
        dispatch(signInSuccess(decoded.userInfo));
        //console.log(decoded.userInfo);
      }
      catch(err){
        console.error('Invalid token',err);
        localStorage.removeItem('token');
        console.log('failed');
      }
  }
  else{
    localStorage.removeItem('token');
    //console.log('token expired');
  }

  return (
    <>
    <Router>
      <Header/>
      <main style={{minHeight:'65vh', margin:'8px'}}>
      <Routes>
        {/*routes free to access by everyone */}
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profiles" element={<Profiles />}/>
        <Route path="/motions" element={<Motions />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:id" element={<ArticlePage />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/events" element={<Events />} />
        <Route path="/*" element={<PageNotFound />} />

        {/* Routes only accessible to logged in users */}
        <Route element={<ProtectedRoutes/>}>
          <Route path="/userprofile" element={<UserProfile/>}/>
        </Route>

        {/* Editor-only routes */}
        <Route element={<ProtectedRoutes allowedRoles={['admin','editor']}/>}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/profiles" element={<ProfilesAdmin />} />
          <Route path="/admin/motions" element={<MotionsAdmin />} />
          <Route path="/admin/events" element={<EventsAdmin />} />
          <Route path="/admin/articles" element={<ArticlesAdmin />} />
        </Route>

        {/* Admin-only routes */}
        <Route element={<ProtectedRoutes allowedRoles={['admin']}/>}>
          <Route path="/admin/users" element={<Users />} />
        </Route>

      </Routes>
      </main>
      <Footer/>
    </Router>
    </>
  )
}

export default App
