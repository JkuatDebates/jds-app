import { Search } from "lucide-react"
import { useRef, useState} from "react"

function Motions(){
    const [displayedMotions, setDisplayedMotions]=useState([]);
    const searchedMotionsRef=useRef([]);
    const searchRef=useRef(null);
    const motionTypesRef=useRef(null);
    const motionsRef=useRef([]);
    const [randomMotion, setRandomMotion]=useState('');
    const motionTypes=['','Value', 'Actor', 'Policy', 'Comparative','Narrative'];

    fetch('/motions.json')
        .then(response=>{
            !response.ok? console.error('json not loaded')
            :null;
            return response.json(); 
        })
        .then(arr=>{
            motionsRef.current=[];
            arr.forEach(element => {
            motionsRef.current=[...motionsRef.current,element];
        });
    });

    function renderMotions(b){
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
    function ranMotion(){
        //console.log(motionsRef.current.length);
        setRandomMotion(motionsRef.current[Math.floor(Math.random()*motionsRef.current.length-1)]);
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
            <input type="text" className="searchBar" placeholder="Search motion"
            ref={searchRef}/>
            <button style={{padding:'5px'}} onClick={()=>renderMotions(2)}><Search size={'1.5rem'}/></button>
        </div>
        <div>
            <button onClick={()=>renderMotions(0)}>Refresh</button>
            <div>
                {displayedMotions.map((e,i)=>(
                    <div key={i} className="motionCard"> 
                    {e.infoslide!==''?<p>{e.infoslide}</p>:''}
                    <br />{e.motion}
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}
export default Motions