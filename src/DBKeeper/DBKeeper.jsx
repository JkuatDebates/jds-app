import React,{useState, useEffect, useRef} from "react";
import styles from './DBKeeper.module.css';
import bellSound from './bell.mp3';

function DBKeeper(){
    const [isRunning, setIsRunning]=useState(false);
    const [elapsedTime, setElapsedTime]=useState(0);
    const [format, setFormat]=useState('BP');
    const [dur, setDur]=useState(7);
    const [bgc, setBgc]=useState(0);
    const [, setAct]= useState(false);
    const intervalRef=useRef();
    const startTimeRef=useRef(0);
    const bgRef=useRef();
    const bellRef=useRef(new Audio(bellSound));
    const ringPointRef=useRef(0);
    const startRef=useRef(null);
    const timeRef=useRef(null);
    const setMinRef=useRef();
    const setSecRef=useRef();
    const speakerRef=useRef(0);
    const speakTimeRef=useRef([
        {pos:0,time:[0,0]},
        {pos:1,time:[0,0]},
        {pos:2,time:[0,0]},
        {pos:3,time:[0,0]},
        {pos:4,time:[0,0]},
        {pos:5,time:[0,0]},
        {pos:6,time:[0,0]},
        {pos:7,time:[0,0]},
    ]);
    const poiRef=useRef(null);
    const activePoiRef=useRef(false);
    let pdur=15;
    const poiIntervalRef=useRef(null);
    let min;

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

    useEffect(()=>{
       background();
    },[bgc]);

    function updateTime(){
        min= Math.floor(elapsedTime/(1000*60))%60;
        let sec= Math.floor(elapsedTime/1000)%60;

        switch(true){
            case (turn(format).endsWith('Reply')):
                if(min===0) {
                    if(bgc!=0) setBgc(0);
                }
                else if(min===Math.floor(dur/2)-1){
                    if(bgc!=2) setBgc(2);
                }
                else if(min>=Math.floor(dur/2)){
                    if(bgc!=3) setBgc(3);
                } 
            break;
            case (min===0):if(bgc!=0) setBgc(0);
            break;
            case (min<dur-1): if(bgc!=1) setBgc(1);
            break;
            case (min===dur-1): if(bgc!=2) setBgc(2);
            break;
            case (min>=dur): if(bgc!=3) setBgc(3);
            break;
            default: setBgc(0);
        }
        ringBell(min,sec);
        return `${zeroPad(min)}:${zeroPad(sec)}`;
    }
    function zeroPad(num){
        if(num<10){
            return `0${num}`;
        }
        else return num;
    }
    function ringBell (min,sec){
        const rdur=Math.floor(dur/2);
        switch(true){
            case (turn(format).endsWith('Reply')):
                if(rdur!==1 && min===(rdur-1) && sec===0){
                    if(ringPointRef.current!=2)
                        ringPointRef.current=2;
                    ring();
                }
                if(min===rdur  && sec===0){
                    if(ringPointRef.current!=3)
                        ringPointRef.current=3;
                    ring();
                            
                }
                if(min>=rdur && sec%15===0){
                    if(ringPointRef.current!=4)
                        ringPointRef.current=4;
                    ring();                 
                }
            break;
            case (min===1 && sec===0):
                if(ringPointRef.current!=1){
                    ringPointRef.current=1;
                    ring();
                }
            break;
            case (min===(dur-1) && sec===0):
                if(ringPointRef.current!=2){ 
                ringPointRef.current=2;
                ring();
                }
            break;
            case (min===dur  && sec===0):
                if(ringPointRef.current!=3){
                ringPointRef.current=3;
                ring();
                }
            break;
            case (min>=dur  && sec%15===0):
                if(ringPointRef.current!=4){
                ringPointRef.current=4;
                ring();
                }
            break;
            default: ringPointRef.current=0;
        }
    }
    function background(){
        switch(bgc){
            case (0): return 'purple';
            case (1): return 'green';
            case (2): return 'orange';
            case (3): return 'red';
            default: return 'purple';
        }
    }
    function start(){
        if(isRunning===false){
            startTimeRef.current=Date.now()-elapsedTime;
            setIsRunning(true);
            startRef.current.textContent='Pause';
            setSecRef.current.value=null;
            setMinRef.current.value=null;
        }
        else pause();        
    }
    function pause(){
            setElapsedTime(Date.now()-startTimeRef.current);
            elapsedTime>0? startRef.current.textContent='Resume'
            : startRef.current.textContent='Start';
            if(activePoiRef.current){
                activePoiRef.current=false;
                clearInterval(poiIntervalRef.current);
                poiRef.current.style={backgroundColor:'hsl(0, 0%, 50%);'};
                poiRef.current.textContent='POI';
                pdur=15;            
            }
            setIsRunning(false);
        }
    function turn(format){
        const BPspeakers=['Prime Minister', 'Leader of Opposition',
            'Deputy Prime Minister','Deputy Leader of Opposition',
            'Member for Government', 'Member for Opposition',
            'Government Whip','Opposition Whip'
        ];
        const worldSpeakers=['1st Proposition', '1st Opposition',
            '2nd Proposition', '2nd Opposition',
            '3rd Proposition', '3rd Opposition',
            'Opposition Reply', 'Proposition Reply'
        ];
        
        return format==='BP'? BPspeakers[speakTimeRef.current[speakerRef.current].pos]
        : worldSpeakers[speakTimeRef.current[speakerRef.current].pos];
    }
    function reset(v){
        setIsRunning(false);
        switch(v){
            case 0:
                setElapsedTime(0);
                speakTimeRef.current[speakerRef.current].time=[0,0];
                break;
            case 1:
                setTime(1);
                break;
            default: 
        }
        speakTimeRef.current[speakerRef.current].time[0]===0 &&
        speakTimeRef.current[speakerRef.current].time[1]===0? 
        startRef.current.textContent='Start'
        :startRef.current.textContent='Resume';
        if(activePoiRef.current){
            activePoiRef.current=false;
            clearInterval(poiIntervalRef.current);
            poiRef.current.style={backgroundColor:'hsl(0, 0%, 50%);'};
            poiRef.current.textContent='POI';
            pdur=15;            
        }
        setAct(a=>!a);
    }
    function next(){
        if(speakerRef.current<7){
            speakTimeRef.current[speakerRef.current].time=speakerTime();
            speakerRef.current=speakerRef.current+1;
            reset(1);
        }
    }
    function prev(){
        if(speakerRef.current>0){
            if(speakerRef.current===7)
                speakTimeRef.current[speakerRef.current].time=speakerTime();
            speakerRef.current=speakerRef.current-1;
            reset(1);
        }
    }
    function speakerTime(){
        let t=timeRef.current.textContent.split(':');
        let Nt=[Number(t[0]),Number(t[1])];

        return Nt;
    }
    function handleFormat(e){
        setFormat(e.target.value);
        if(e.target.value==='BP')
            setDur(7);
        else if(e.target.value==='Worlds')
            setDur(6);
    }
    function handleDur(e){
        setDur(e.target.value);
    }
    function ring(){
        switch(ringPointRef.current){
            case 0:
                bellRef.current.play();
                break;
            case 1:
                bellRef.current.play();
                break;
            case 2:
                bellRef.current.play();
                break;
            case 3:
                bellRef.current.play();
                setTimeout(()=>bellRef.current.play(),400);
                break;
            case 4:
                bellRef.current.play();
                setTimeout(()=>bellRef.current.play(),400);
                setTimeout(()=>{
                    bellRef.current.currentTime=0;
                    bellRef.current.play();
                },800);
                break;   
        }
    }
    function setTime(v){
        let setMin;
        let setSec;
        switch(v){
            case 0:
                setMin=setMinRef.current.value;
                setSec=setSecRef.current.value;
                break;
            case 1:
                setMin=speakTimeRef.current[speakerRef.current].time[0];
                setSec=speakTimeRef.current[speakerRef.current].time[1];
                break;
            default: console.error('Set Time error');
        }
        
        setElapsedTime((setMin*60*1000)+(setSec*1000));
        elapsedTime>0? startRef.current.textContent='Resume'
            : startRef.current.textContent='Start';
            setIsRunning(false);
    }
    function newRound(){
        speakerRef.current=0;
        speakTimeRef.current.forEach((sp)=>sp.time=[0,0]);
        setSecRef.current.value=null;
        setMinRef.current.value=null;
        reset(0);
    }
    function poi(){
        if(min!=0 && min<(dur-1) && isRunning){
        activePoiRef.current=!activePoiRef.current;
        if(activePoiRef.current){
            poiRef.current.style.backgroundColor='hsl(120, 100%, 40%)';
            poiIntervalRef.current=setInterval(()=>{
                poiRef.current.textContent=pdur;
                pdur--;
                if(pdur===0){
                    poi();
                }
            },1000);
        }
        else {
            clearInterval(poiIntervalRef.current);
            poiRef.current.style={backgroundColor:'hsl(0, 0%, 50%);'};
            poiRef.current.textContent='POI';
            pdur=15;
        } 
        }
    }

    return(
        <div className={styles.container} ref={bgRef}>
            <div className={styles.setting}>
                <select id="format" value={format} onChange={handleFormat}>
                    <option value="BP">BP</option>
                    <option value="Worlds">World's</option>
                </select>
                <input type="number" id="duration" min={3} value={dur} onChange={handleDur}
                placeholder="Duration"/>
            </div>
            <div className={styles.banner} style={{backgroundColor:background()}}>
                <div className={styles.sturn}>{turn(format)}</div>
                <div className={styles.face} id='time' ref={timeRef}>{updateTime()}</div>
                <button className={styles.poi} onClick={poi} ref={poiRef}>POI</button>
                <div className={styles.timeset}>Set Time : 
                    <input type="number" placeholder="min" min={0} onChange={()=>setTime(0)} ref={setMinRef}/>
                    <input type="number" placeholder="sec" min={0} max={60} onChange={()=>setTime(0)} ref={setSecRef}/>
                </div>
            </div>
            <div className={styles.buttons}>
                <button className="buttonOnBrand" onClick={newRound}>New</button>
                <button className="buttonOnBrand" onClick={prev}>Prev</button>
                <button className="buttonOnBrand" onClick={start} ref={startRef} style={{fontWeight: "bold"}}>Start</button>
                <button className="buttonOnBrand" onClick={next}>Next</button>
                <button className="buttonOnBrand" onClick={()=>reset(0)}>🔄</button>
                <button className="buttonOnBrand" onClick={()=>{ringPointRef.current=0; ring()}}>🔔</button>
            </div>
        </div>
    );
}
export default DBKeeper;