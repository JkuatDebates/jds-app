import { useNavigate } from "react-router-dom"

function Admin(){
    const navigate=useNavigate();

    return(
        <>
        <div className="textBlock" style={{textAlign:'center', padding:'5px'}}>
            <h2>Welcome Administrator</h2>
            <h4>What would you like to manage today</h4>
        
        
        <div style={{display:'flex', flexWrap:'wrap',justifyContent:'center'}}>
            <div className="adminCard">
                <h3>Profiles</h3>
                <ul>
                    <li>Add Profile</li>
                    <li>Remove Profile</li>
                    <li>Update Profile</li>
                    <button className="buttonOnBrand" onClick={()=>navigate('/admin/profiles')}>Go</button>
                </ul>
            </div>
            <div className="adminCard">
                <h3>Motions</h3>
                <ul>
                    <li>Add Motions</li>
                    <li>Remove Motions</li>
                    <li>Update Motions</li>
                    <button className="buttonOnBrand" onClick={()=>navigate('/admin/motions')}>Go</button>
                </ul>
            </div><div className="adminCard">
                <h3>Events</h3>
                <ul>
                    <li>Add Event</li>
                    <li>Remove Event</li>
                    <li>Update Event</li>
                    <button className="buttonOnBrand" onClick={()=>navigate('/admin/events')}>Go</button>
                </ul>
            </div><div className="adminCard">
                <h3>Articles</h3>
                <ul>
                    <li>Add Article</li>
                    <li>Remove Article</li>
                    <li>Update Article</li>
                    <li>Manage Comments</li>
                    <button className="buttonOnBrand" onClick={()=>navigate('/admin/articles')}>Go</button>
                </ul>
            </div>
        </div>
        </div>
        </>
    )
}
export default Admin