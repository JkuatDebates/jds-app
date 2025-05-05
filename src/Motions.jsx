import { Search } from "lucide-react"
import { useRef, useState} from "react"
import axios from "axios";
import { currentServer } from "./assets/urls";

function Motions(){
    const [displayedMotions, setDisplayedMotions]=useState([]);
    const searchedMotionsRef=useRef([]);
    const searchRef=useRef(null);
    const motionTypesRef=useRef(null);
    const motionsRef=useRef([]);
    const [randomMotion, setRandomMotion]=useState('');
    const motionTypes=['','Value', 'Actor', 'Policy', 'Comparative','Narrative'];

    axios.get(`${currentServer}/motions`)
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
            let searched=[];
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
                    filteredMotions.length!==0?
                    setDisplayedMotions(filteredMotions):
                    setDisplayedMotions([{motion: 'No motion to display', infoslide:''}]);
                    break;
                case 2://motion type:set, search:set
                    searchedMotionsRef.current=motionsRef.current.filter((m)=>m.motion.toLowerCase()
                        .includes(searchRef.current.value.toLowerCase()));
                    filteredSearch=searchedMotionsRef.current.filter((m)=>
                            m.type===motionTypesRef.current.value);
                    filteredSearch.length!==0?
                    setDisplayedMotions(filteredSearch):
                    setDisplayedMotions([{motion: 'No motion to display',infoslide:''}]);
                    break;
                case 3://motion type:unset, search:set
                    searchedMotionsRef.current=motionsRef.current.filter((m)=>m.motion.toLowerCase()
                        .includes(searchRef.current.value.toLowerCase()));
                    searchedMotionsRef.current!==0?
                    setDisplayedMotions(searchedMotionsRef.current):
                    setDisplayedMotions([{motion: 'No motion to display',infoslide:''}]);
                    break;
                case 4://motion type set to ''
                    searched=motionsRef.current.filter((m)=>m.motion.toLowerCase()
                    .includes(searchRef.current.value.toLowerCase()));
                    searchRef.current.value===''? setDisplayedMotions([])
                    :searched.length!==0? 
                    setDisplayedMotions(searched):
                    setDisplayedMotions([{motion: 'No motion to display',infoslide:''}]);
                    break; 
                default:setDisplayedMotions([]);
            }
            }                
        }
    function ranMotion(){
        if(motionsRef.current.length!==0){
            //console.log(motionsRef.current.length);
            let ran=motionsRef.current[Math.floor(Math.random()*(motionsRef.current.length-1))];
            setRandomMotion(ran);
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

    return(
        <>
        <div className="textBlock">
            <h3 style={{display:'inline'}}>Random Motion</h3>
            <button onClick={ranMotion}>Generate</button>
            <div className="motionCard">
                {(randomMotion.infoslide!==''&& 
                    randomMotion.infoslide!==undefined)?
                    <p>{randomMotion.infoslide}</p>:''}
                {randomMotion.motion}
                {randomMotion.motion!==''&& randomMotion.motion!==undefined && <h6 style={{margin:'0.5rem'}}>{randomMotion.source? [randomMotion.source]: 'JDS'}</h6>}
                
            </div>
        </div>
        <div className="textBlock">
            <br />
            <h3>Browse Motions</h3>
            <p style={{display:'inline'}}>Select motion type: </p>
            <select ref={motionTypesRef} onChange={()=>renderMotions(1)}>
                {motionTypes.map((type, index)=>(
                    <option key={index}>{type}</option>
                    ))}
            </select> &nbsp;
            <div className="search">
                <Search size={'1.2rem'} className="icon" onClick={()=>renderMotions(2)}/><input type="text" placeholder="Search motion"
            ref={searchRef} onKeyDown={(e)=>e.key==='Enter'&& renderMotions(2)}/>
            </div>
        </div>
        <div>
            <button onClick={()=>renderMotions(0)}>Refresh</button>
            <div>
                {displayedMotions.map((e,i)=>(
                    <div key={i} className="motionCard"> 
                    {e.infoslide!==''?<p>{e.infoslide}</p>:''}
                    <br />{e.motion} <br />
                    <h6 style={{margin:'0.5rem'}}>{e.source? [e.source]: 'JDS'}</h6>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}
export default Motions