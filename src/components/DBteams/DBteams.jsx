import React,{useRef, useState} from "react";
import styles from './DBteams.module.css';

function DBteams(){
    const [debaters,setDebaters]=useState([]);
    const [newDebater, setNewDebator]=useState('');
    const [teamUper, setTeamUper]=useState('Manual');
    const manualDebatersRef=useRef([]);
    const mDebatersRef=useRef([]);
    const [format, setFormat]=useState('BP');
    const drawRef=useRef(null);
    const drawRef2=useRef(null);

    function handleFormat(event){
        setFormat(event.target.value);
    }
    function handleNewDebater(event){
        setNewDebator(event.target.value);
    }
    function addDebators(){
        if(newDebater.trim()!=''){
            setDebaters(d=>[...d,titleCase(newDebater)]);
            setNewDebator('');
        }       
    }
    function titleCase(str){
        return str
        .toLowerCase()
        .replace(/\b\w/g,char=> char.toUpperCase());
    }
    function removeDebator(index){
        const updatedDebaters=debaters.filter((_,i)=>i!==index);
        setDebaters(updatedDebaters);
    }
    function handleTeamUper(event){
        setTeamUper(event.target.value);
        //console.log(teamUper);
    }
    function handleManualDebaters(event, p){
        mDebatersRef.current[p]=event.target.value;
    }
    function teamUp(){
        const teams= shuffle(debaters);
        const team1= [teams[0],teams[4]];
        const team2= [teams[1],teams[5]];
        const team3= [teams[2],teams[6]];
        const team4= [teams[3],teams[7]];
        const randomTeams= shuffle([team1, team2, team3, team4]);
        const worldsTeams=[[teams[0],teams[2],teams[4],teams[8]] ,[teams[1],teams[3],teams[5],teams[7]]];
        manualDebatersRef.current=['',...debaters];
        
        switch(format){
            case 'BP':
                switch(teamUper){
                    case 'Auto':
                        return(
                            <div className={styles.tims}>
                                <span className='tag'>Opening Government</span>{randomTeams[0][0]}, {randomTeams[0][1]}
                                <span className='tag'>Opening Opposition</span>{randomTeams[1][0]}, {randomTeams[1][1]}
                                <span className='tag'>Closing Government</span>{randomTeams[2][0]}, {randomTeams[2][1]}
                                <span className='tag'>Closing Opposition</span>{randomTeams[3][0]}, {randomTeams[3][1]}
                            </div>
                        );
                    case 'Manual':
                        
                        return(
                            <div className={styles.tims}>
                                <label>
                                    Team 1:<select onChange={(event)=>handleManualDebaters(event,0)}>
                                        {manualDebatersRef.current.map((dbt,index)=>
                                        <option key={index} >{dbt}</option>)}
                                    </select>
                                    <select onChange={(event)=>handleManualDebaters(event,1)}>   
                                    {manualDebatersRef.current.map((dbt,index)=>
                                        <option key={index}>{dbt}</option>)}
                                    </select>
                                </label><br />
                                <label>
                                    Team 2:<select onChange={(event)=>handleManualDebaters(event,2)}>   
                                    {manualDebatersRef.current.map((dbt,index)=>
                                        <option key={index}>{dbt}</option>)}
                                    </select>
                                    <select onChange={(event)=>handleManualDebaters(event,3)}>   
                                    {manualDebatersRef.current.map((dbt,index)=>
                                        <option key={index}>{dbt}</option>)}
                                    </select>
                                </label><br />
                                <label>
                                    Team 3:<select onChange={(event)=>handleManualDebaters(event,4)}>   
                                    {manualDebatersRef.current.map((dbt,index)=>
                                        <option key={index}>{dbt}</option>)}
                                    </select>
                                    <select onChange={(event)=>handleManualDebaters(event,5)}>   
                                    {manualDebatersRef.current.map((dbt,index)=>
                                        <option key={index}>{dbt}</option>)}
                                    </select>
                                </label><br />
                                <label>
                                    Team 4:<select onChange={(event)=>handleManualDebaters(event,6)}>   
                                    {manualDebatersRef.current.map((dbt,index)=>
                                        <option key={index}>{dbt}</option>)}
                                    </select>
                                    <select onChange={(event)=>handleManualDebaters(event,7)}>   
                                    {manualDebatersRef.current.map((dbt,index)=>
                                        <option key={index}>{dbt}</option>)}
                                    </select>
                                </label><br />
                                <button onClick={draw}>Draw</button>
                                <p ref={drawRef}></p>
                            </div>
                        );                       
                }
                break;
            case 'Worlds':
                switch(teamUper){
                    case 'Auto':
                        return(
                            <div className={styles.tims}>
                                <span className='tag'>Proposition</span> {worldsTeams[0][0]}, {worldsTeams[0][1]}, {worldsTeams[0][2]}
                                <span className='tag'>Opposition</span> {worldsTeams[1][0]}, {worldsTeams[1][1]}, {worldsTeams[1][2]}
                            </div>
                        );
                    case 'Manual':
                        return(
                            <div className={styles.tims}>
                                <label>
                                    Team 1:<select onChange={(event)=>handleManualDebaters(event,0)}>
                                        {manualDebatersRef.current.map((dbt,index)=>
                                        <option key={index} >{dbt}</option>)}
                                    </select>
                                    <select onChange={(event)=>handleManualDebaters(event,1)}>   
                                    {manualDebatersRef.current.map((dbt,index)=>
                                        <option key={index}>{dbt}</option>)}
                                    </select>
                                    <select onChange={(event)=>handleManualDebaters(event,2)}>   
                                    {manualDebatersRef.current.map((dbt,index)=>
                                        <option key={index}>{dbt}</option>)}
                                    </select>
                                    <select onChange={(event)=>handleManualDebaters(event,3)}>   
                                    {manualDebatersRef.current.map((dbt,index)=>
                                        <option key={index}>{dbt}</option>)}
                                    </select>
                                </label><br />
                                <label>
                                    Team 2:
                                    <select onChange={(event)=>handleManualDebaters(event,4)}>   
                                    {manualDebatersRef.current.map((dbt,index)=>
                                        <option key={index}>{dbt}</option>)}
                                    </select>
                                    <select onChange={(event)=>handleManualDebaters(event,5)}>   
                                    {manualDebatersRef.current.map((dbt,index)=>
                                        <option key={index}>{dbt}</option>)}
                                    </select>
                                    <select onChange={(event)=>handleManualDebaters(event,6)}>   
                                    {manualDebatersRef.current.map((dbt,index)=>
                                        <option key={index}>{dbt}</option>)}
                                    </select>
                                    <select onChange={(event)=>handleManualDebaters(event,7)}>   
                                    {manualDebatersRef.current.map((dbt,index)=>
                                        <option key={index}>{dbt}</option>)}
                                    </select>
                                </label><br />
                                <button onClick={wDraw}>Draw</button>
                                <p ref={drawRef2}></p>
                            </div>
                        );
                }
                break;
        }
    }
    function draw(){
        const mteams=[
            [mDebatersRef.current[0],mDebatersRef.current[1]],
            [mDebatersRef.current[2],mDebatersRef.current[3]],
            [mDebatersRef.current[4],mDebatersRef.current[5]],
            [mDebatersRef.current[6],mDebatersRef.current[7]]
        ];
        const shuffledMTeams=shuffle(mteams);
        drawRef.current.innerHTML=`
        <span className='tag'>Opening Government</span>     ${shuffledMTeams[0]} <br>
        <span className='tag'>Opening Opposition</span>     ${shuffledMTeams[1]} <br>
        <span className='tag'>Closing Government</span>     ${shuffledMTeams[2]} <br>
        <span className='tag'>Closing Opposition</span>     ${shuffledMTeams[3]}`
    }
    function wDraw(){
        const wteams=[
            [mDebatersRef.current[0],mDebatersRef.current[1],mDebatersRef.current[2],mDebatersRef.current[3]],
            [mDebatersRef.current[4],mDebatersRef.current[5],mDebatersRef.current[6],mDebatersRef.current[7]]
        ];
        const shuffledWTeams=shuffle(wteams);
        drawRef2.current.innerHTML=`
        <span className='tag'>Proposition</span> ${shuffledWTeams[0]}</br>
        <span className='tag'>Opposition</span>  ${shuffledWTeams[1]}
        `
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
        <div className='textBlock'>
            <h2>Debate Team Picker</h2>
            <label htmlFor="format">
                Choose format
                <select id="format" onChange={handleFormat}>
                    <option value="BP">BP</option>
                    <option value="Worlds">World's</option>
                </select>
            </label>
            <div className={styles.DBTsInput}>
                <h3>Debators</h3>
                <ol>
                    {debaters.map((debator,index)=>
                    <li key={index} style={{padding: '0px', marginLeft: '0px'}}>
                       <p style={{display:'inline', flexGrow:'9'}}>{index+1}. {debator}</p>
                       <button style={{flexGrow:'1'}} onClick={()=>removeDebator(index)}>🗑</button>
                    </li>)}
                </ol>
                    <div style={{display:'inline-block'}}>
                        <input type="text" value={newDebater} onChange={handleNewDebater}/>
                        <button onClick={addDebators}>Add</button><br />
                    </div>
                </div>
            <div className={styles.teamer}>
                <label htmlFor="teamUpSelect">Team Up Selection
                    <select id="teamUpSelect" value={teamUper} onChange={handleTeamUper}>
                        <option value="Manual">Manual</option>
                        <option value="Auto">Auto</option>
                    </select>
                </label>
                {teamUp()}
            </div>
            
            <div></div>
        </div>
    );
}
export default DBteams