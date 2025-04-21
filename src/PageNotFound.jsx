import { Link } from "react-router-dom";

function PageNotFound(){

    return(
        <div>
            <p>Seems like the page you are looking for does not exist</p>
            <Link to="/" ><button>Go Home</button></Link>
        </div>
    )
}
export default PageNotFound