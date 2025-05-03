import {profiles} from './profiles';

function Profiles(){
    
    function profiler(d,i){
        if(d.isVisible)        
        return(
            <div className="profileCard" key={i} id={d.id}>
                <img src={d.photo} alt={d.name} style={{flexGrow:'1',alignSelf:'center'}}/>
                <div className="profileDetails"style={{flexGrow:'2'}}>
                <h2 style={{margin:'0px'}} className="debatorName">{d.name}</h2>
                {d.alias!==''?<p><strong>Alias: </strong>{d.alias}</p>:''}
                {d.clubRoles!==''?<p><strong>Club Roles: </strong>{d.clubRoles}</p>:''}
                {d.accolades!==''?<p><strong>Accolades: </strong>{d.accolades}</p>:''}
                {d.trainer!==''?<p><strong>Training Expertise: </strong>{d.trainer}</p>:''}
                {d.passion!==''?<p><strong>Passionate About: </strong>{d.passion}</p>:''}
                {d.catchPhrase!==''?<p><strong>Catchprase: </strong>{d.catchPhrase}</p>:''}
                {d.rumor!==''?<p><strong>Rumor: </strong>{d.rumor}</p>:''}
                {d.yearsActive!==''?<p><strong>Years active: </strong>{d.yearsActive}</p>:''}
                </div>
            </div>
        )
    }

    return(
        <>
        <div className="textBlock">
            <h2>Meet our debators</h2>
        </div>
        {profiles.map((d,i)=>profiler(d,i))}
        </>
    );
}
export default Profiles