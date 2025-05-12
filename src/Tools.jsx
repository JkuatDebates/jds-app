import DBKeeper from './components/DBKeeper/DBKeeper.jsx';
import DBteams from './components/DBteams/DBteams.jsx'
import PSKeeper from './components/PSKeeper.jsx';
import { useState } from "react";

function Tools(){
    const [tool, setTool]=useState('');
    const tools=['Debate Keeper','Teamer','PS Keeper']

    function changeTool(e){
        setTool(e.target.value);
    }

    function renderTool(){
        switch(tool){
            case 'Debate Keeper':
                return <DBKeeper/>
            case 'Teamer':
                return <DBteams/>
            case 'PS Keeper':
                return <PSKeeper/>
        }
    }

    return(
        <div>
            <div className='textBlock'>
                <h2>Pick tool</h2>
                <select onChange={changeTool}>
                    {tools.map((t,i)=>
                    <option key={i} value={t}>{t}</option>)}
                </select>
            </div>
            <div>
                {renderTool()}
            </div>
        </div>
    )
}
export default Tools