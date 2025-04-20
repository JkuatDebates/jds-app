import { Search } from "lucide-react"
import { useRef, useState } from "react"

function Motions(){
    const [displayedMotions, setDisplayedMotions]=useState([]);
    const searchedMotionsRef=useRef([]);
    const searchRef=useRef(null);
    const motionType=useRef(null);
    const motionsRef=useRef([]);
    const motionTypes=['','Value', 'Actor', 'Policy', 'Comparative','Narrative'];

    fetch('/motions.json')
        .then(response=>{
            !response.ok? console.error('json not loaded')
            :console.log('json loaded');
            motionsRef.current=[];
            return response.json(); 
        })
        .then(arr=>arr.forEach(element => {
            motionsRef.current=[...motionsRef.current,element];
            //console.log(motionsRef.current)
        }));
    function searchMotion(){
        //console.log(motionsRef.current.length);
        searchedMotionsRef.current=motionsRef.current.filter((m)=>m.motion.toLowerCase()
        .includes(searchRef.current.value.toLowerCase()));
        setDisplayedMotions(searchedMotionsRef.current);
        searchRef.current.value='';
        console.log(searchedMotionsRef.current);
    }
    function renderMotions(){
        const rm=shuffle(motionsRef.current);
        let n=10;
        const dm=[];
        while(n>0){
            dm[n]=rm[n];
            n--;
        }
        console.log(dm);
        setDisplayedMotions(dm);       
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
            <br />
            <p style={{display:'inline'}}>Select motion type: </p>
            <select ref={motionType} placeholder='Motion Type'>
                {motionTypes.map((type, index)=>(
                    <option key={index}>{type}</option>
                    ))}
            </select> &nbsp;
            <input type="text" className="searchBar" placeholder="!Search motion"
            ref={searchRef}/>
            <button style={{padding:'5px'}} onClick={searchMotion}><Search size={'1.5rem'}/></button>
        </div>
        <div>
            <button onClick={renderMotions}>Refresh</button>
            <div>
                {displayedMotions.map((e,i)=>(
                    <div key={i} className="motionCard"> 
                    {e.infoslide!==''?<p>{e.infoslide}</p>:''}
                    {e.motion}
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}
export default Motions