import DBKeeper from './DBKeeper/DBKeeper.jsx';
import DBteams from './DBteams/DBteams.jsx'
import { useState } from "react";

function Tools(){
    const [tool, setTool]=useState('');

    function toolSelect(tl){
       // console.log(tl);
        setTool(tl);
    }
    function renderTool(){
        switch(tool){
            case 'DK':
                return <DBKeeper/>
            case 'DT':
                return <DBteams/>
        }
    }

    return(
        <div>
            <div >
                <span>Pick Tool</span><br />
                
                <label htmlFor="Teamer">
                    <input type="radio" name="tools" id="Teamer" 
                    onChange={()=>toolSelect('DT')}/>Teamer</label><br />
                
                <label htmlFor="Keeper">
                    <input type="radio" name="tools" id="Keeper" 
                    onChange={()=>toolSelect('DK')}/>Debate Keeper</label>
            </div>
            <div>
                {renderTool()}
            </div>
        </div>
    )
}
export default Tools