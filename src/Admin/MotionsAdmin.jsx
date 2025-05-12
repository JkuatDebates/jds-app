import { Search } from "lucide-react"
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { currentServer } from "../assets/urls";

const motionTypes=['','Value', 'Actor', 'Policy', 'Comparative','Narrative'];

function MotionsAdmin(){
    const [displayedMotions, setDisplayedMotions]=useState([]);
    const [newMotion, setNewMotion]=useState({
        motion:'',
        infoslide:'',
        type:'',
        theme:'',
        source:''
    });
    const [updatedMotion, setUpdatedMotion]=useState({
        motion:'',
        infoslide:'',
        type:'',
        theme:'',
        source:''
    });
    const [isUpdate, setIsUpdate]=useState(false);
    const [loading, setLoading]=useState(true);
    const [creating, setCreating]=useState(false);
    const searchedMotionsRef=useRef([]);
    const searchRef=useRef(null);
    const motionTypesRef=useRef(null);
    const motionsRef=useRef([]);
    const navigate=useNavigate();
    
    const getMotions=async ()=>{
        axios.get(`${currentServer}/motions`)
        .then(response=>{
            motionsRef.current=[];
            motionsRef.current=[...response.data];
            //console.log(response.data);
            setLoading(false);
            setDisplayedMotions([...motionsRef.current]);
        })
        .catch(err=>console.error(err));
        //.catch(()=>console.log('no mongo'));
    }
    useEffect(()=>{
        getMotions();
    },[]);

    function renderMotions(){
        try{
        const search=searchRef.current.value;
        const filter=motionTypesRef.current.value;
        let filteredMotions=[];
        let filteredSearch=[];
        let searched=[];
        

        switch(true){
            case (filter===''&& search==='')://motion type:'', search:'',
                //console.log('here');
                setDisplayedMotions([...motionsRef.current]);
                break;
            case (filter!==''&& search==='')://motion type:set, search:unset [type select]
                filteredMotions=shuffle(motionsRef.current).filter((m)=>
                    m.type===motionTypesRef.current.value);
                filteredMotions.length!==0?
                setDisplayedMotions(filteredMotions):
                setDisplayedMotions([{motion: 'No motion to display', infoslide:''}]);
                break;
            case (filter!==''&& search!=='')://motion type:set, search:set
                searchedMotionsRef.current=motionsRef.current.filter((m)=>m.motion.toLowerCase()
                    .includes(searchRef.current.value.toLowerCase()));
                filteredSearch=searchedMotionsRef.current.filter((m)=>
                        m.type===motionTypesRef.current.value);
                filteredSearch.length!==0?
                setDisplayedMotions(filteredSearch):
                setDisplayedMotions([{motion: 'No motion to display',infoslide:'',votes:[]}]);
                break;
            case (filter===''&& search!=='')://motion type:unset, search:set
                searchedMotionsRef.current=motionsRef.current.filter((m)=>m.motion.toLowerCase()
                    .includes(searchRef.current.value.toLowerCase()));
                searchedMotionsRef.current.length!==0?
                setDisplayedMotions(searchedMotionsRef.current):
                setDisplayedMotions([{motion: 'No motion to display',infoslide:'',votes:[]}]);
                break;
            case 4://motion type set to ''
                searched=motionsRef.current.filter((m)=>m.motion.toLowerCase()
                .includes(searchRef.current.value.toLowerCase()));
                searchRef.current.value===''? setDisplayedMotions([])
                :searched.length!==0? 
                setDisplayedMotions(searched):
                setDisplayedMotions([{motion: 'No motion to display',infoslide:'',votes:[]}]);
                break; 
            default:setDisplayedMotions([]);
            }
        }
        catch(err){
            console.log(err);
        }                
    }
    function shuffle(array){
        const shuffledArray=[...array];
        for(let i=shuffledArray.length-1;i>0;i--){
            const random=Math.floor(Math.random()*(i+1));
            [shuffledArray[i],shuffledArray[random]]=[shuffledArray[random],shuffledArray[i]];
        }
        return shuffledArray;
    }
    async function submitMotion(e){
        e.preventDefault();
        //console.log(newMotion);
        try{
            await axios.post(`${currentServer}/motions`,newMotion);
            setNewMotion({
                    motion:'',
                    infoslide:'',
                    type:'',
                    theme:'',
                    source:''
            });
            setCreating(false);
            getMotions();
            renderMotions(0);
        }
        catch(err){
            console.log(err);
        }
    }
    function writeMotion(e){
        setNewMotion({...newMotion, [e.target.name]: e.target.value});
    }
    async function deleteMotion(e){
        try{
            //console.log(e._id);
            await axios.delete(`${currentServer}/motions/${e._id}`)
            .then(()=>console.log(`${e.motion} has been deleted`));
            renderMotions(2);
        }
        catch(err){
            console.log(err);
        }
    }
    async function updateMotion(e){
        await setIsUpdate(false);       
        setUpdatedMotion({...e});
        await setIsUpdate(true);
        document.getElementById('updMotions').scrollIntoView({behavior:'smooth'});
    }

    return(
        <>
        <button onClick={()=>navigate('/admin')}>Admin Panel</button>
        <button onClick={()=>setCreating(!creating)}>Add Motion</button>     
        <section id="Create Motion">
        {creating && 
        <form onSubmit={submitMotion} style={{display:'flex', flexDirection:'column',gap:'0px'}}>
            <h3 style={{textAlign: 'center'}}>Add motion</h3>
            <p>Motion:<textarea value={newMotion.motion} name="motion" onChange={writeMotion} required></textarea></p>
            <p>Infoslide:<textarea value={newMotion.infoslide} name="infoslide"onChange={writeMotion}></textarea></p>
            <p>Type:<select ref={motionTypesRef} value={newMotion.type} name="type"onChange={writeMotion} required>
                {motionTypes.map((type, index)=>(
                    <option key={index}>{type}</option>
                    ))}
            </select></p>
            <p>Theme:<input type="text" value={newMotion.theme} name="theme"onChange={writeMotion}/></p>
            <p>Source:<input type="text" value={newMotion.source} name="source"onChange={writeMotion}/></p>
            <div>
                <button type="submit">Submit</button>
                <button type="button" onClick={()=>{
                    setNewMotion({
                        motion:'',
                        infoslide:'',
                        type:'',
                        theme:'',
                        source:''
                    });
                    setCreating(false);
                }}>Cancel</button>
            </div>
        </form>}
        </section>
        {isUpdate&&
        <section id="updMotions" className="textBlock">
            <UpdateCard motion={updatedMotion} setIsUpdate={setIsUpdate}/>
        </section>}
        <section id="Manage_Controls" className="textBlock">
            <h3>Manage Motions</h3>
            <p style={{display:'inline'}}>Select motion type: </p>
            <select ref={motionTypesRef} onChange={()=>renderMotions()}>
                {motionTypes.map((type, index)=>(
                    <option key={index}>{type}</option>
                    ))}
            </select> &nbsp;
            <div className="search">
                <Search size={'1.2rem'} className="icon" onClick={()=>renderMotions()}/><input type="text" placeholder="Search motion"
            ref={searchRef} onChange={()=>renderMotions()}/>
            </div>
        </section>
        {loading&& <p>loading...</p>}
        {displayedMotions.length!==0 &&       
        <section id="Render_Motions">
            <div>
                {displayedMotions.map((e,i)=>(
                    <div key={i} className="motionCard">
                    {e.infoslide!==''&&<p>{e.infoslide}</p>}
                    <br />{e.motion}<br />
                    <h6 style={{margin:'0.5rem',textAlign:'center'}}>{e.source? [e.source]: 'JDS'}</h6> 
                    <br />{e.motion!=='No motion to display'&&<><button onClick={()=>deleteMotion(e)}>Delete</button>
                    <button onClick={()=>updateMotion(e)}>Update</button></>}
                    </div>
                ))}
            </div>
        </section>}
        </>
    )
}


export default MotionsAdmin

export function UpdateCard({motion, setIsUpdate}){
    const [umotion,setUmotion]=useState({...motion});

    function writeMotion(e){
        setUmotion({...umotion,[e.target.name]:e.target.value});
    }
    function submitUpdate(e){
        e.preventDefault();
        //console.log(umotion);
        try{
            axios.put(`${currentServer}/motions`,umotion)
                .then(()=>setUmotion({
                    motion:'',
                    infoslide:'',
                    type:'',
                    theme:'',
                    source:''
            }))
                .then(response=>console.log(response.data));
        }
        catch(err){
            console.log(err);
            console.log('not putting');
        }
    }
    return(
        <>
        <form onSubmit={submitUpdate}>
        <h3 style={{textAlign:'center'}}>Update Motion</h3>
        <p>Motion:<textarea type="text" value={umotion.motion} name="motion" onChange={writeMotion} style={{width:'100%',minheight:'1rem'}}></textarea></p>
                <p>Infoslide:<textarea value={umotion.infoslide} name="infoslide"onChange={writeMotion} style={{width:'100%'}}></textarea></p>
                <p>Type:<select value={umotion.type} name="type"onChange={writeMotion}>
                    {motionTypes.map((type, index)=>(
                        <option key={index}>{type}</option>
                        ))}
                </select></p>
                <p>Theme:<input type="text" value={umotion.theme} name="theme"onChange={writeMotion}/></p>
                <p>Source:<input type="text" value={umotion.source} name="source"onChange={writeMotion}/></p>
                <button type="submit">Update</button>            
                <button type="button" onClick={()=>setIsUpdate(false)} >Cancel</button>            
        </form>
        </>
    )
}