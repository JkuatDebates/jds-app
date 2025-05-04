import { useNavigate } from "react-router-dom";

function EventsAdmin(){
    const navigate=useNavigate();
    return(
    <>
    <div className="textBox"></div>
    <button onClick={()=>navigate('/admin')}>Admin Panel</button>
    </>
    );
}
export default EventsAdmin