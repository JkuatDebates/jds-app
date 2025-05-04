import { useNavigate } from "react-router-dom";

function PageNotFound(){
    const navigate=useNavigate();
    return(
        <div>
            <p>Seems like the page you are looking for does not exist</p>
            <button onClick={()=>navigate('/')}>Go Home</button>
            <button onClick={()=>navigate(-1)}>Go back</button>
        </div>
    )
}
export default PageNotFound