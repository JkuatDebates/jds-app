import { Search, XIcon } from "lucide-react"
import axios from "axios";
import { useState, useRef } from "react";

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
    const searchedMotionsRef=useRef([]);
    const searchRef=useRef(null);
    const motionTypesRef=useRef(null);
    const motionsRef=useRef([]);    

    axios.get('https://jdsbackend.onrender.com/motions')
        .then(response=>{
            motionsRef.current=[];
            motionsRef.current=[...response.data];
            //console.log(response.data);
        })
        .catch(err=>console.error(err));
        //.catch(()=>console.log('no mongo'));
    

    function renderMotions(b){
        if(motionsRef.current!=[]){
            //b for button pressed
        let v;
        let filteredMotions=[];
        let filteredSearch=[];
        switch(b){
            case 0: 
                v=0;
                break;
            case 1:
                (searchRef.current.value==='')? v=1: v=2;
                if(motionTypesRef.current.value==='') v=4;
                break;
            case 2:
                motionTypesRef.current.value!==''? v=2:v=3;
                break;
        }
        

        switch(v){
            case 0://motion type:'', search:''
                motionTypesRef.current.value='';
                searchRef.current.value='';
                setDisplayedMotions([]);
                break;
            case 1://motion type:set, search:unset [type select]
                filteredMotions=shuffle(motionsRef.current).filter((m)=>
                    m.type===motionTypesRef.current.value);
                setDisplayedMotions(filteredMotions);
                break;
            case 2://motion type:set, search:set
                searchedMotionsRef.current=motionsRef.current.filter((m)=>m.motion.toLowerCase()
                    .includes(searchRef.current.value.toLowerCase()));
                filteredSearch=searchedMotionsRef.current.filter((m)=>
                        m.type===motionTypesRef.current.value);
                setDisplayedMotions(filteredSearch);
                break;
            case 3://motion type:unset, search:set
                searchedMotionsRef.current=motionsRef.current.filter((m)=>m.motion.toLowerCase()
                    .includes(searchRef.current.value.toLowerCase()));
                setDisplayedMotions(searchedMotionsRef.current);
                break;
            case 4://motion type set to ''
                searchRef.current.value===''? setDisplayedMotions([])
                :setDisplayedMotions(motionsRef.current.filter((m)=>m.motion.toLowerCase()
                        .includes(searchRef.current.value.toLowerCase())));
                break; 
            default:setDisplayedMotions([]);
        }
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
            await axios.post('https://jdsbackend.onrender.com/motions',newMotion);
            setNewMotion({
                    motion:'',
                    infoslide:'',
                    type:'',
                    theme:'',
                    source:''
            });
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
            await axios.delete(`https://jdsbackend.onrender.com/motions/${e._id}`)
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
               
        <div className="textBlock">
            <h3>Add motion</h3>
            <form onSubmit={submitMotion} style={{display:'flex', flexDirection:'column',gap:'0px'}}>
                <p>Motion:<textarea value={newMotion.motion} name="motion" onChange={writeMotion}></textarea></p>
                <p>Infoslide:<textarea value={newMotion.infoslide} name="infoslide"onChange={writeMotion}></textarea></p>
                <p>Type:<select ref={motionTypesRef} value={newMotion.type} name="type"onChange={writeMotion}>
                    {motionTypes.map((type, index)=>(
                        <option key={index}>{type}</option>
                        ))}
                </select></p>
                <p>Theme:<input type="text" value={newMotion.theme} name="theme"onChange={writeMotion}/></p>
                <p>Source:<input type="text" value={newMotion.source} name="source"onChange={writeMotion}/></p>
                <button type="submit">Submit</button>
            </form>
        </div>
        <div className="textBlock">
            <h3>Manage Motions</h3>
            <p style={{display:'inline'}}>Select motion type: </p>
            <select ref={motionTypesRef} onChange={()=>renderMotions(1)}>
                {motionTypes.map((type, index)=>(
                    <option key={index}>{type}</option>
                    ))}
            </select> &nbsp;
            <input type="text" className="searchBar" placeholder="Search motion"
            ref={searchRef}/>
            <button style={{padding:'5px'}} onClick={()=>renderMotions(2)}><Search size={'1.5rem'}/></button>
        </div>
        {isUpdate&&<div id="updMotions" className="textBlock">
            <h3>Update Motion</h3>
            <UpdateCard motion={updatedMotion}/>
            <button onClick={()=>setIsUpdate(false)}><XIcon size={21}/></button>
            </div>}        
        <div>
            <button onClick={()=>renderMotions(0)}>Refresh</button>
            <div>
                {displayedMotions.map((e,i)=>(
                    <div key={i} className="motionCard">
                    {e.infoslide!==''&&<p>{e.infoslide}</p>}
                    <br />{e.motion} <br /><button onClick={()=>deleteMotion(e)}>Delete</button>
                    <button onClick={()=>updateMotion(e)}>Update</button>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}


export default MotionsAdmin

export function UpdateCard({motion}){
    const [umotion,setUmotion]=useState({...motion});

    function writeMotion(e){
        setUmotion({...umotion,[e.target.name]:e.target.value});
    }
    function submitUpdate(e){
        e.preventDefault();
        //console.log(umotion);
        try{
            axios.put('https://jdsbackend.onrender.com/motions',umotion)
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
        <p>Motion:<textarea type="text" value={umotion.motion} name="motion" onChange={writeMotion} style={{width:'90vw',minheight:'1rem'}}></textarea></p>
                <p>Infoslide:<textarea value={umotion.infoslide} name="infoslide"onChange={writeMotion} style={{width:'90vw'}}></textarea></p>
                <p>Type:<select value={umotion.type} name="type"onChange={writeMotion}>
                    {motionTypes.map((type, index)=>(
                        <option key={index}>{type}</option>
                        ))}
                </select></p>
                <p>Theme:<input type="text" value={umotion.theme} name="theme"onChange={writeMotion}/></p>
                <p>Source:<input type="text" value={umotion.source} name="source"onChange={writeMotion}/></p>
                <button type="submit">Update</button>            
        </form>
        </>
    )
}