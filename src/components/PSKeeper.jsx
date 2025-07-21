import React,{useState, useEffect, useRef} from "react";
import bellSound from '/bell.mp3';
import { BellMinus, BellRing, Minus, PauseIcon, PlayIcon, PlusIcon, TimerResetIcon} from "lucide-react";


export default function PSKeeper(){
    const [isRunning,setIsRunning]=useState(false);
    const [elapsedTime, setElapsedTime]=useState(0);
    const [dur, setDur]=useState(4);    
    const bellRef=useRef(new Audio(bellSound));
    const intervalRef=useRef();
    const startTimeRef=useRef(Date.now());
    const [ringTimes,setRingTimes] =useState([]);
    const minRef=useRef(null);
    const repRef=useRef(0);
    const secRef=useRef(null);
    const setminRef=useRef(null);
    const setsecRef=useRef(null);
    const ringing=useRef(true);
    const lastring=useRef(null);
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
        num=Number(num);
        if(num<10){
            return `0${num}`;
        }
        else return num;
    }
    function Pause(){
        if(isRunning==true) ringing.current=false;
        setIsRunning(!isRunning);
        startTimeRef.current=Date.now()-elapsedTime;
    }
    function addRingTime(){
        let min= minRef.current.value;
        let sec= secRef.current.value;
        setRingTimes([...ringTimes, [`${zeroPad(min)}:${zeroPad(sec)}`,repRef.current.value]]);
        minRef.current.value= 0;
        secRef.current.value= 0;
    }
    function removeRingTime(t){
        const newRingTimes=ringTimes.filter(j=>j!==t);
        setRingTimes(newRingTimes);
    }
    function ringBell(min, sec){
        const time=`${min}:${sec}`;
        if(lastring==time)
            return;
        ringTimes.forEach((t)=>{
            if(time===t[0]) 
                {
                    lastring.current=time;
                    ring(t[1]);
                }
        });        
    }
    function ring(n){
        let r=n;
        if(r<1 || ringing.current==false) return;
        bellRef.current.play();
        r--;
        ringing.current=true;
        setTimeout(()=>ring(r),1000);
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
    function setTime(){
        setIsRunning(false);
        let newTime=setminRef.current.value*60*1000+setsecRef.current.value*1000;
        setElapsedTime(newTime);
    }
    return(
    <div  style={{display:'flex',alignItems:"center", flexDirection:'column'}}>
        <div>
            <label style={{display:"flex", alignItems:'center'}}>Ring Times 
                <input type="Number" placeholder="Min" ref={minRef} style={{width:'1rem'}} min={0} max={59}/>
                <input type="Number" placeholder="Sec" ref={secRef} style={{width:'1rem'}} min={0} max={59}/></label>
                <label style={{display:"flex", alignItems:'center'}}>
                    Ring Number
                    <input type="Number" placeholder="Repeats" ref={repRef} style={{width:'1rem'}} min={0} defaultValue={1}/>
                    <PlusIcon style={{color:'white',borderRadius:"0.5rem", marginLeft:'0.4rem', padding:'0.1rem'}} className="buttonOnBrand" onClick={addRingTime}/>
                </label>            
            {ringTimes.length!==0 &&
            <div className="textBlock">
                {ringTimes.map((t,i)=>
                <div key={i} style={{display:'flex', alignItems:'center'}}>{t[0]}({t[1]}x) <Minus className="buttonOnBrand" style={{borderRadius:'0.5rem', color:'white'}} onClick={()=>removeRingTime(t)}/></div>)}
                <button type="button" onClick={()=>setRingTimes([])}>Clear</button>
            </div>}
        </div>
        <div style={{backgroundColor:'hsl(213, 46%, 12%)', display:'inline-flex',flexDirection:'column', borderRadius:'1rem', margin:'1rem', paddingTop:'0.5rem', alignItems:'center', justifySelf:'center'}}>
            <div>
                <label style={{color:'white'}}>Time: <input type="number" placeholder="Duration (default:4min)" min={1} onChange={(e)=>setDur(e.target.value)}/></label>
            </div>
            <div style={{width:'70vw', maxWidth:'500px', height:'70vw', maxHeight:'500px', backgroundColor:'blue',margin:'1rem', display:'flex',flexDirection:'column',alignItems:"center", justifyContent:'center'}}ref={backgroundRef}>
                <h3 style={{fontSize:'clamp(1rem,20vw,170px)', fontFamily:'monospace',boxSizing:'border-box',color:"white"}}>{updateTime()}</h3>
                {!isRunning&&
                <div style={{display:'inherit'}}>
                    <strong style={{color: 'white'}}>Set Time</strong>
                    <input  type="number" min={0} placeholder="min" ref={setminRef} onChange={setTime} style={{width:'3rem',minWidth:'0'}}/>
                    <input type="number" min={0} placeholder="sec" ref={setsecRef} onChange={setTime} style={{width:'3rem',minWidth:'0'}}/>
                </div>
                }
                <br />
            </div>
            <div style={{margin:'0.5rem'}}>
                <button className="buttonOnBrand" onClick={Pause}>{isRunning?<PauseIcon size={20}/>:<PlayIcon size={20}/>}</button>
                <button className="buttonOnBrand" onClick={()=>{
                    setIsRunning(false);
                    setElapsedTime(0);
                    lastring.current=null;
                    ringing.current=true;
                }}><TimerResetIcon size={20}/></button>
                <button className="buttonOnBrand" onClick={()=>{
                ring(1);
                }}><BellRing size={20}/></button>
            </div> 
                
        </div>
    </div>);
}