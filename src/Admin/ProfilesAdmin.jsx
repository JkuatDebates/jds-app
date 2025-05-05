import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {currentServer} from '../assets/urls';
import { Search } from "lucide-react";

function ProfilesAdmin(){
    const navigate=useNavigate();
    const searchRef=useRef(null);
    const [creating, setCreating]=useState(false);
    const [updating, setUpdating]=useState(false);
    const [loading, setLoading]=useState(true);
    const [newProfile, setNewProfile]=useState({     
        name:'',
        alias: '',
        photo: null,
        clubRoles: '',
        accolades: '',
        startYear: Date.now,
        stillActive:false,
        catchPhrase: '',
        rumor: '',
        passions: '',
        trainingRoles: '',
        isVisible:false    
    });
    const [updatedProfile, setUpdatedProfile]=useState([]);
    const [profiles, setProfiles]= useState(null);
    const [displayed, setDisplayed]= useState(null);
    const fetchProfiles=async ()=> {
        try{
            const response= await axios.get(`${currentServer}/profiles`);
            const res=response.data;
            console.log(res.length);
            setProfiles(res);
            setDisplayed(res);
            setLoading(false);
        }
        catch(err){
            console.log(err);
            setLoading(false);
        }
    }
    useEffect(()=>{
        
        fetchProfiles();
        return()=>{
            setProfiles(null);
        };
    },[]);

    function newFormChange(e){
        if(e.target.type==='file'){
            setNewProfile({...newProfile, [e.target.name]:e.target.files[0]});
        }
        else{
            setNewProfile({...newProfile, [e.target.name]:e.target.value});
        }
        
    }
    async function newFormSubmit(e){
        e.preventDefault();

        const formData= new FormData();
        formData.append('name', newProfile.name);
        formData.append('alias', newProfile.alias);
        formData.append('photo', newProfile.photo);
        formData.append('catchPhrase', newProfile.catchPhrase);
        formData.append('rumor', newProfile.rumor);
        formData.append('startYear', newProfile.startYear);
        formData.append('stillActive', newProfile.stillActive);

        formData.append('accolades', JSON.stringify(
            newProfile.accolades 
              ? newProfile.accolades.split(',').map(str => str.trim()).filter(str => str !== '') 
              : []
          ));
        formData.append('passions', JSON.stringify(
            newProfile.passions 
              ? newProfile.passions.split(',').map(str => str.trim()).filter(str => str !== '') 
              : []
          ));
        formData.append('clubRoles', JSON.stringify(
            newProfile.clubRoles 
              ? newProfile.clubRoles.split(',').map(str => str.trim()).filter(str => str !== '') 
              : []
          ));
        formData.append('trainingRoles', JSON.stringify(
            newProfile.trainingRoles 
              ? newProfile.trainingRoles.split(',').map(str => str.trim()).filter(str => str !== '') 
              : []
          ));

        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
          }          
        try{
            const response=await axios.post(`${currentServer}/profiles`,formData,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data); 
            alert('Upload successful');
            setNewProfile({     
                name:'',
                alias: '',
                photo: undefined,
                clubRoles: '',
                accolades: '',
                startYear: Date.now,
                stillActive:false,
                catchPhrase: '',
                rumor: '',
                passions: '',
                trainingRoles: '',
                isVisible:false    
            });
            setCreating(false);
            fetchProfiles();
        }
        catch(err){
            console.log(err);
            alert('Upload unsuccessful');
        }
    }
    function updateFormChange(e){

        if(e.target.type==='file'){
            setUpdatedProfile({...updatedProfile, [e.target.name]:e.target.files[0]});
        }
        else{
            setUpdatedProfile({...updatedProfile, [e.target.name]:e.target.value});
        }   
    }
    async function updateFormSubmit(e){
        e.preventDefault();

        console.log(updatedProfile);
        const formData= new FormData();
        formData.append('name', updatedProfile.name);
        formData.append('alias', updatedProfile.alias);
        formData.append('photo', updatedProfile.photo);
        formData.append('catchPhrase', updatedProfile.catchPhrase);
        formData.append('rumor', updatedProfile.rumor);
        formData.append('startYear', updatedProfile.startYear);
        formData.append('stillActive', updatedProfile.stillActive);
        formData.append('_id', updatedProfile._id);

        formData.append('accolades', JSON.stringify(
            updatedProfile.accolades 
              ? updatedProfile.accolades.split(',').map(str => str.trim()).filter(str => str !== '') 
              : []
          ));
        formData.append('passions', JSON.stringify(
            updatedProfile.passions 
              ? updatedProfile.passions.split(',').map(str => str.trim()).filter(str => str !== '') 
              : []
          ));
        formData.append('clubRoles', JSON.stringify(
            updatedProfile.clubRoles 
              ? updatedProfile.clubRoles.split(',').map(str => str.trim()).filter(str => str !== '') 
              : []
          ));
        formData.append('trainingRoles', JSON.stringify(
            updatedProfile.trainingRoles 
              ? updatedProfile.trainingRoles.split(',').map(str => str.trim()).filter(str => str !== '') 
              : []
          ));

        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
          }          
        try{
            const response=await axios.put(`${currentServer}/profiles`,formData,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data); 
            alert('Upload successful');
            setNewProfile({     
                name:'',
                alias: '',
                photo: undefined,
                clubRoles: '',
                accolades: '',
                startYear: Date.now,
                stillActive:false,
                catchPhrase: '',
                rumor: '',
                passions: '',
                trainingRoles: '',
                isVisible:false    
            });
            setUpdating(false);
            fetchProfiles();
        }
        catch(err){
            console.log(err);
            alert('Update unsuccessful');
        }
    }
    async function deleteProfile(p){
        try{
            const response=await axios.delete(`${currentServer}/profiles/${p._id}`);
            console.log(response);
            setProfiles(prev=>prev.filter(d=>d._id!==p._id));
            alert('deleted successfully');
        }
        catch(err){
            console.log(err);
            alert('delete unsuccessful');
        }
    }
    function search(){
        const searched=searchRef.current.value;
        //console.log(searched);
        const searchedProfiles=profiles.filter(p=>p.name.toLowerCase().includes(searched.toLowerCase())|| p.alias.toLowerCase().includes(searched.toLowerCase()));
        console.log(searchedProfiles);
        searchedProfiles.length!==0? 
            setDisplayed([...searchedProfiles])
            : setDisplayed([{photo:null, name:'No Profile Found'}])
    }
    function setDates(d){
        const date=d.split('T')[0];
        return date;
    }


    return(
    <>
    <button onClick={()=>navigate('/admin')}>Admin Panel</button>
    <div className="textBlock">
        <h2 style={{display:"inline"}}>Add a profile</h2>
        <button onClick={()=>setCreating(!creating)}>+</button>
    </div>
    <section>
    {creating &&
    <form onSubmit={newFormSubmit}>
        <h2>New Profile</h2>
        <label>Name <input type="text" placeholder="Enter name" required name="name" value={newProfile.name} onChange={newFormChange}/></label>
        <label>Alias <input type="text" placeholder="Enter alias" name="alias" value={newProfile.alias} onChange={newFormChange}/></label>
        <label>Photo <input type="file" accept="image/jpeg, image/png, image/jpg" required name="photo" onChange={newFormChange}/></label>
        <label>Catchphrase <input type="text" placeholder="Enter catchphrase" name="catchPhrase" value={newProfile.catchPhrase} onChange={newFormChange}/></label>
        <label>Club Roles <input type="text" placeholder="e.g.: Member, VP(2026),Secretary(2021), Vibes " name="clubRoles" value={newProfile.clubRoles.toString()} onChange={newFormChange} /></label>
        <label>Accolades <input type="text" placeholder="Flex PS, Debate, Adjudication, CAP accolades" name="accolades" value={newProfile.accolades.toString()} onChange={newFormChange}/></label>
        <label>Passions <input type="text" placeholder="e.g.:Geo-politics, Football, Food, anything" name="passions" value={newProfile.passions.toString()} onChange={newFormChange}/></label>
        <label>Training Roles <input type="text" placeholder="e.g.: Trainer Juja Prep" name="trainingRoles" value={newProfile.trainingRoles.toString()}onChange={newFormChange}/></label>
        <label>Rumor <input type="text" placeholder="Enter rumor" name="rumor" value={newProfile.rumor} onChange={newFormChange}/></label>
        <label>Year Joined <input type="date" name="startYear" value={newProfile.startYear} onChange={newFormChange}/></label>
        <label>Still Active?
            <select name="stillActive" value={newProfile.stillActive} onChange={newFormChange}>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
        </label>
        <label >Public Profile?<input type="radio" name="isVisible" onChange={newFormChange} value='true'/>Yes</label>
        <label ><input type="radio" name="isVisible"onChange={newFormChange} value='false'/>No</label><br />
        <button type="submit">Submit</button>
        <button type="button" onClick={()=>{
            setCreating(false);
            setNewProfile(
                {     
                    name:'',
                    alias: '',
                    photo: null,
                    clubRoles: '',
                    accolades: '',
                    startYear: Date.now,
                    stillActive:false,
                    catchPhrase: '',
                    rumor: '',
                    passions: '',
                    trainingRoles: '',
                    isVisible:false
                });
        }}>Cancel</button>
    </form>}
    </section>
    <section id="updateSection">
    {updating &&
    <form onSubmit={updateFormSubmit}>
        <h2>Updated Profile</h2>
        <label>Name <input type="text" placeholder="Enter name" required name="name" value={updatedProfile.name} onChange={updateFormChange}/></label>
        <label>Alias <input type="text" placeholder="Enter alias" name="alias" value={updatedProfile.alias} onChange={updateFormChange}/></label>
        <label>Photo <input type="file" name="photo" onChange={updateFormChange} accept="image/jpeg, image/png, image/jpg"/></label>
        <label>Catchphrase <input type="text" placeholder="Enter catchphrase" name="catchPhrase" value={updatedProfile.catchPhrase} onChange={updateFormChange}/></label>
        <label>Club Roles <input type="text" placeholder="e.g.: Member, VP(2026),Secretary(2021), Vibes " name="clubRoles" value={updatedProfile.clubRoles} onChange={updateFormChange} /></label>
        <label>Accolades <input type="text" placeholder="Flex PS, Debate, Adjudication, CAP accolades" name="accolades" value={updatedProfile.accolades} onChange={updateFormChange}/></label>
        <label>Passions <input type="text" placeholder="e.g.:Geo-politics, Football, Food, anything" name="passions" value={updatedProfile.passions} onChange={updateFormChange}/></label>
        <label>Training Roles <input type="text" placeholder="e.g.: Trainer Juja Prep" name="trainingRoles" value={updatedProfile.trainingRoles}onChange={updateFormChange}/></label>
        <label>Rumor <input type="text" placeholder="Enter rumor" name="rumor" value={updatedProfile.rumor} onChange={updateFormChange}/></label>
        <label>Year Joined <input type="date" name="startYear" value={updatedProfile.startYear} onChange={updateFormChange}/></label>
        <label>Still Active?
            <select name="stillActive" value={updatedProfile.stillActive} onChange={updateFormChange}>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
        </label>
        <label >Public Profile?<input type="radio" name="isVisible" onChange={updateFormChange} value='true'/>Yes</label>
        <label ><input type="radio" name="isVisible"onChange={updateFormChange} value='false'/>No</label><br />
        <button type="submit">Update</button>
        <button type="button" onClick={()=>{
            setUpdating(false);
            setUpdatedProfile([]);
        }}>Cancel</button>
    </form>
    }
    </section>
    <section>
    {loading?<p>Loading...</p>:
    <div className="textBlock">
        <h2>Existing Profiles</h2>
        <div className="search">
            <Search onClick={search} className="icon"/>
            <input type="text" ref={searchRef} placeholder="Search for a profile" onChange={search}/>
        </div>
        {displayed&& displayed.map((p,i)=>
        <div key={i} style={{display:'flex',flexDirection:"row", alignItems:'center'}}>
            <img src={p.photo} alt={`${p.name} image`} style={{width:'50px', borderRadius:'5px'}}/><div style={{flexGrow:'1',marginLeft:'1rem'}}><strong >{p.name} </strong><p style={{marginTop:'5px', fontSize:"1rem"}}>{p.alias}</p></div>
            {displayed[0].name!=='No Profile Found'&&<>
                <button onClick={()=>{
                setUpdating(true);
                setUpdatedProfile({...p, startYear: setDates(p.startYear), accolades:p.accolades.join(','), passions:p.passions.join(','), trainingRoles:p.trainingRoles.join(','), clubRoles:p.clubRoles.join(',')}); //turn arrays to strings using array.join()
                document.getElementById('updateSection').scrollIntoView({behavior:'smooth'});
                }}>Update </button>
            <button type="button" onClick={()=>deleteProfile(p)}>Delete </button></>}
        </div>
        )}
    </div>}
    </section>
    
    </>
    );
}
export default ProfilesAdmin