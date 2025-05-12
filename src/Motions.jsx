import { Search,ThumbsUp, ThumbsDown } from "lucide-react"
import { useEffect, useRef, useState} from "react"
import axios from "axios";
import { currentServer } from "./assets/urls";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Motions(){
    const [displayedMotions, setDisplayedMotions]=useState([]);
    const searchedMotionsRef=useRef([]);
    const [loading, setLoading]=useState(true);
    const searchRef=useRef(null);
    const motionTypesRef=useRef(null);
    const motionsRef=useRef([]);
    const [randomMotion, setRandomMotion]=useState('');
    const motionTypes=['','Value', 'Actor', 'Policy', 'Comparative','Narrative'];
    const {currentUser}=useSelector((state)=>state.user);
    const navigate=useNavigate();

    const getMotions=async ()=>{
        await axios.get(`${currentServer}/motions`)
        .then(response=>{
            motionsRef.current=[];
            motionsRef.current=[...response.data];
            //console.log(response.data);
            setLoading(false);
            renderMotions(1);
            //setDisplayedMotions([...motionsRef.current]);
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
    function ranMotion(){
        if(motionsRef.current.length!==0){
            //console.log(motionsRef.current.length);
            let ran=motionsRef.current[Math.floor(Math.random()*(motionsRef.current.length-1))];
            setRandomMotion(ran);
            }
        else{
            setRandomMotion([{motion: 'No motion to display',infoslide:''}]);
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
    function voteDisplay(e){
        if(e.motion!=='No motion to display'){
        if(currentUser){
        const voted= e.votes.find(v=>v.email===currentUser.email);
        const upVoted=voted?.voteType==='up';
        const downVoted=voted?.voteType==='down';

        return(
            <div style={{display:'flex', justifyContent:'space-around', width:'100%'}}>
            <div><ThumbsUp fill={upVoted? 'hsl(166, 100%, 20%)': 'none'} onClick={()=>vote(e, 'up')}/>{e.votes.filter(v=>v.voteType==='up').length}</div>
            <div><ThumbsDown fill={downVoted? 'hsl(213, 46%, 12%)': 'none'}
            onClick={()=>vote(e,'down')}/>{e.votes.filter(v=>v.voteType==='down').length}</div>
        </div>
        )}
        else{
        return(
        <div style={{display:'flex', justifyContent:'space-around', width:'100%'}}>
            <div><ThumbsUp onClick={()=>vote(e, 'up')}/>{e.votes.filter(v=>v.voteType==='up').length}</div>
            <div><ThumbsDown onClick={()=>vote(e,'down')}/>{e.votes.filter(v=>v.voteType==='down').length}</div>
        </div>
        )}}
    }
    async function vote(e, vote){
        if(currentUser){
            //console.log(e, vote);
            try{
                await axios.post(`${currentServer}/motions/vote`,{email:currentUser.email, vote:vote, id:e._id});
                //console.log(res);
                getMotions();
            }    
            catch(err){
                console.log(err);
            }
        }
        else{
            navigate('/login');
        }
        
    }

    return(
        <>
        <section id="random_motion" className="textBlock">
            <h3 style={{display:'inline'}}>Random Motion</h3>
            <button onClick={ranMotion}>Generate</button>
            <div className="motionCard">
                {(randomMotion.infoslide!==''&& 
                    randomMotion.infoslide!==undefined)?
                    <p>{randomMotion.infoslide}</p>:''}
                {randomMotion.motion}
                {randomMotion.motion!==''&& randomMotion.motion!==undefined && <h6 style={{margin:'0.5rem', textAlign:'center'}}>{randomMotion.source? [randomMotion.source]: 'JDS'}</h6>
                }
            </div>
        </section>
        <section id="browse_controls" className="textBlock">
            <h3>Browse Motions</h3>
            <p style={{display:'inline'}}>Select motion type: </p>
            <select ref={motionTypesRef} onChange={()=>renderMotions()}>
                {motionTypes.map((type, index)=>(
                    <option key={index}>{type}</option>
                    ))}
            </select> &nbsp;
            <div className="search">
                <Search size={'1.2rem'} className="icon" onClick={()=>renderMotions(1)}/><input type="text" placeholder="Search motion"
            ref={searchRef} onChange={()=>renderMotions()}/>
            </div>
        </section>
        {loading&& <p>loading...</p>}
        {displayedMotions!==0 &&
        <section id="render_motions">
            <div>
                {displayedMotions.map((e,i)=>(
                    <div key={i} className="motionCard"> 
                    {e.infoslide!==''?<p>{e.infoslide}</p>:''}
                    <br />{e.motion} <br />
                    <h6 style={{margin:'0.5rem',textAlign:'center'}}>{e.source? [e.source]: 'JDS'}</h6>
                    {voteDisplay(e)}
                    </div>
                ))}
            </div>
        </section>}
        </>
    )
}
export default Motions