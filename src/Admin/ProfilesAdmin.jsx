import { useNavigate } from "react-router-dom";

function ProfilesAdmin(){
    const navigate=useNavigate();
    return(
    <>
    <div className="textBox"></div>
    <button onClick={()=>navigate('/admin')}>Admin Panel</button>
    </>
    );
}
export default ProfilesAdmin