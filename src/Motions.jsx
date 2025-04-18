import { Search } from "lucide-react"
import { useRef } from "react"

function Motions(){
    const searchRef=useRef(null);
    const motionType=useRef(null);
    const motionTypes=['','Value', 'Actor', 'Policy', 'Comparative','Narrative'];

    function searchMotion(){
        //console.log(searchRef.current.value);
        searchRef.current.value='';
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

        </>
    )
}
export default Motions