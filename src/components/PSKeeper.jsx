import React,{useState, useEffect, useRef} from "react";
import bellSound from '/bell.mp3';
import { Bell, BellIcon, BellRing, Minus, PauseIcon, PlayIcon, PlusIcon, StopCircleIcon, TimerResetIcon } from "lucide-react";


export default function PSKeeper(){
    const [isRunning,setIsRunning]=useState(false);
    const [elapsedTime, setElapsedTime]=useState(0);
    const [dur, setDur]=useState(4);    
    const bellRef=useRef(new Audio(bellSound));
    const intervalRef=useRef();
    const startTimeRef=useRef(Date.now());
    const [ringTimes,setRingTimes] =useState([]);
    const minRef=useRef(null);
    const secRef=useRef(null);
    const backgroundRef=useRef(null);

    useEffect(()=>{
            if(isRunning){
              intervalRef.current=setInterval(()=>{
                setElapsedTime(Date.now()-startTimeRef.current);
                updateTime();
            },500);  
            }
            return ()=>{
                clearInterval(intervalRef.current);
            }
        },[isRunning]);

    function updateTime(){
        let min= Math.floor(elapsedTime/(1000*60))%60;
        let sec= Math.floor(elapsedTime/1000)%60;
        ringBell(zeroPad(min),zeroPad(sec));
        background(zeroPad(min));
        return `${zeroPad(min)}:${zeroPad(sec)}`;
    }
    function zeroPad(num){
        if(num<10){
            return `0${num}`;
        }
        else return num;
    }
    function Pause(){
        setIsRunning(!isRunning);
        startTimeRef.current=Date.now()-elapsedTime;
    }
    function addRingTime(){
        let min= minRef.current.value;
        let sec= secRef.current.value;
        setRingTimes([...ringTimes, `${zeroPad(min)}:${zeroPad(sec)}`]);
        minRef.current.value= 0;
        secRef.current.value= 0;
    }
    function removeRingTime(t){
        const newRingTimes=ringTimes.filter(j=>j!==t);
        setRingTimes(newRingTimes);
    }
    function ringBell(min, sec){
        const time=`${min}:${sec}`;
        ringTimes.forEach((t)=>{
            if(time===t) bellRef.current.play();
        })        
    }
    function background(t){
        if(backgroundRef.current){
        if(Number(t)>=dur){
            backgroundRef.current.style.backgroundColor='red';
        }
        else{
            backgroundRef.current.style.backgroundColor='blue';
        }}
    }
    return(
    <div  style={{display:'flex',alignItems:"center", flexDirection:'column'}}>
        <div>
            <label style={{display:"flex", alignItems:'center'}}>Ring Times 
                <input type="Number" placeholder="Min" ref={minRef} style={{width:'1rem'}}/>
                <input type="Number" placeholder="Sec" ref={secRef} style={{width:'1rem'}}/>
                <PlusIcon style={{color:'white',borderRadius:"0.5rem", marginLeft:'0.4rem', padding:'0.1rem'}} className="buttonOnBrand" onClick={addRingTime}/>
            </label>
            {ringTimes.length!==0 &&
            <div className="textBlock">
                {ringTimes.map((t,i)=>
                <div key={i} style={{display:'flex', alignItems:'center'}}>{t} <Minus className="buttonOnBrand" style={{borderRadius:'0.5rem', color:'white'}} onClick={()=>removeRingTime(t)}/></div>)}
            </div>}
        </div>
        <div style={{backgroundColor:'hsl(213, 46%, 12%)', display:'inline-flex',flexDirection:'column', borderRadius:'1rem', margin:'1rem', paddingTop:'0.5rem', alignItems:'center', justifySelf:'center'}}>
            <div>
                <label style={{color:'white'}}>Time: <input type="number" placeholder="Select Duration" min={1} onChange={(e)=>setDur(e.target.value)}/></label>
            </div>
            <div style={{width:'70vw', maxWidth:'500px', height:'70vw', maxHeight:'500px', backgroundColor:'blue',margin:'1rem', display:'flex',flexDirection:'column',alignItems:"center", justifyContent:'center'}}ref={backgroundRef}>
                <h3 style={{fontSize:'clamp(1rem,20vw,170px)', fontFamily:'monospace',boxSizing:'border-box',color:"white"}}>{updateTime()}</h3>
            </div>
            <div style={{margin:'0.5rem'}}>
                <button className="buttonOnBrand" onClick={Pause}>{isRunning?<PauseIcon size={20}/>:<PlayIcon size={20}/>}</button>
                <button className="buttonOnBrand" onClick={()=>{
                    setIsRunning(false);
                    setElapsedTime(0);
                }}><TimerResetIcon size={20}/></button>
                <button className="buttonOnBrand" onClick={()=>bellRef.current.play()}><BellRing size={20}/></button>
            </div>     
        </div>
    </div>);
}