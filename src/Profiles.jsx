import { useEffect, useRef, useState } from "react";
import { currentServer } from "./assets/urls";
import axios from "axios";
import { Search } from "lucide-react";
import { useLocation } from "react-router-dom";


function Profiles(){
    const [profiles,setProfiles]=useState(null);
    const [displayed,setDisplayed]=useState(null);
    const [loading, setLoading]=useState(true);
    const searchRef=useRef(null);

    const fetchProfiles=async ()=> {
        try{
            const response= await axios.get(`${currentServer}/profiles`);
            const res=response.data;
            //console.log(res.length);
            setProfiles(res);
            setDisplayed(res);
            setLoading(false);
        }
        catch(err){
            console.log(err);
            setLoading(false);
        }
    }
    useEffect(()=>{
        
        fetchProfiles();
        return()=>{
            setProfiles(null);
        };
    },[]);

    const location= useLocation();
     useEffect(()=>{
        if(location.hash){
            setTimeout(() => {
                const id= location.hash.replace("#","");
                const element=document.getElementById(id);
                if(element){
                    element.scrollIntoView({behavior:'smooth'});
                }
                else console.log(element);
            }, 500);
        }
     },[location]);
    
    function profiler(d,i){
        //if(d.isVisible)        
        return(
            <div className="profileCard" key={i} id={d.name.split(' ',1)[0]}>
                <img src={d.photo} alt={d.name} style={{flexGrow:'1',alignSelf:'center'}}/>
                <div className="profileDetails"style={{flexGrow:'2'}}>
                <h2 style={{margin:'0px'}} className="debatorName">{d.name}</h2>
                {d.alias!==''?<p><strong>Alias: </strong>{d.alias}</p>:''}
                {d.clubRoles.length!==0?<p><strong>Club Roles: </strong>{d.clubRoles.join(', ')}</p>:''}
                {d.accolades.length!==0?<p><strong>Accolades: </strong>{d.accolades.join(', ')}</p>:''}
                {d.trainingRoles.length!==0?<p><strong>Training Expertise: </strong>{d.trainingRoles.join(', ')}</p>:''}
                {d.passions.length!==0?<p><strong>Passionate About: </strong>{d.passions.join(', ')}</p>:''}
                {d.catchPhrase!==''?<p><strong>Catchprase: </strong>{d.catchPhrase}</p>:''}
                {d.rumor!==''?<p><strong>Rumor: </strong>{d.rumor}</p>:''}
                {d.startYear!==''?<p><strong>Year Started: </strong>{d.startYear.split('-',1)}</p>:''}
                {d.stillActive?<p><strong>Status: </strong>Active</p>:<p><strong>Status: </strong>Retired</p>}
                
                </div>
            </div>
        )
    }
    function search(){
        const searched=searchRef.current.value;
        //console.log(searched);
        const searchedProfiles=profiles.filter(p=>p.name.toLowerCase().includes(searched.toLowerCase())|| p.alias.toLowerCase().includes(searched.toLowerCase()));
        //console.log(searchedProfiles);
        searchedProfiles.length!==0? 
            setDisplayed([...searchedProfiles])
            : setDisplayed([{photo:null, name:'No Profile Found'}])
    }

    return(
        <>
        <div className="textBlock">
            <h2>Meet our debators</h2>
        </div>
        {loading&&<p>loading...</p>}
        {displayed &&
        <>
        <div className="search">
        <Search onClick={search} className="icon"/>
        <input type="text" ref={searchRef} placeholder="Search for a profile" onChange={search}/>
        </div>
        {displayed.map((d,i)=>profiler(d,i))}
        </>
        }
        </>
    );
}
export default Profiles