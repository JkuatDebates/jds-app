import { Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { currentServer } from "../assets/urls";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Users(){
    const [users, setUsers]=useState([]);
    const [display, setDisplay]=useState([]);
    const [loading,setLoading]=useState(true);
    const [updating,setUpdating]=useState(true);
    const [serving,setServing]=useState(false);
    const [error,setError]=useState(false);
    const [success,setSuccess]=useState(false);
    const [errorMessage,setErrorMessage]=useState('Something went wrong');
    const [newCreds,setNewCreds]=useState({
        username:'',
        role:''
    });
    const filterRef=useRef(null);
    const searchRef=useRef(null);
    const presetRef=useRef(null);
    const navigate=useNavigate();
    
    async function getUsers(){
        try{
            const res=await axios.get(`${currentServer}/user`);
            //console.log(res.data);
            setUsers(res.data);
            setDisplay(res.data)
            setLoading(false);
        }
        catch(err){
            console.log(err);
        }     
    }
    useEffect(()=>{
        getUsers();
    },[]);

    function render(){
        const filter=filterRef.current.value.toLowerCase();
        const search=searchRef.current.value.toLowerCase();

        
        switch(true){
            case(filter.length===0 && search.length===0):
                setDisplay([...users]);
                break;
            case(filter.length!==0 && search.length===0):
                setDisplay(users.filter((u)=>u.role==filter));
                break;
            case(filter.length===0 && search.length!==0):
                setDisplay(users.filter(u=>u.username.toLowerCase().includes(search)||u.email.toLowerCase().includes(search)));
                break;
            case(filter.length!==0 && search.length!==0):
                setDisplay(users.filter((u)=>((u.username.toLowerCase().includes(search)||u.email.toLowerCase().includes(search))&&(u.role==filter))));
                break;
            default:
                setDisplay([...users]);
        }
    }
    function formChange(e){
        setSuccess(false);
        setError(false);
        setNewCreds({...newCreds, [e.target.name]:e.target.value});
    }
    async function formSubmit(e){
        e.preventDefault();
        setError(false);
        setSuccess(false);
        console.log(newCreds);
        setServing(true);
        try{
            if(presetRef.current.checked){
                const res1=await axios.patch(`${currentServer}/user/resetPwd`,{id:newCreds._id});
                console.log(res1);
            }
            const res2=await axios.patch(`${currentServer}/user/changeRole`,{id:newCreds._id, role:newCreds.role});
            console.log(res2);
            setServing(false);
            setSuccess(true);
            setNewCreds({
                username:'',
                role:''
            });
            getUsers();
        }
        catch(err){
            console.log(err);
            setServing(false);
            setError(true);
            setErrorMessage(err.message);
        }
    }

    return(
        <>
        <button onClick={()=>navigate(-1)} >Admin Panel</button>
        <section id='controls'>
        <label>Filter by Role <select ref={filterRef} name="filter" onChange={render}>
                <option value=""></option>
                <option value="user">User</option>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
            </select>
        </label>
        <div className="search">
            <Search/>
            <input type="text" placeholder="Search Username or Email" onChange={render} ref={searchRef} name="search"/>
        </div>
        </section>
        <section id='update'>
            {updating && 
            <form onSubmit={formSubmit}>
                <h3>Update Role</h3>
                <p>{newCreds.username}</p>
                <p>{newCreds.email}</p>
                <select name="role" value={newCreds.role} onChange={formChange}>
                    <option value="user" >User</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                </select>
                <label >Reset Password<input type="checkbox" name="pwd" ref={presetRef}/></label>
                <p>Note: Checking will reset user's password to <strong>password</strong> as the default</p>
                <button disabled={serving}>{serving?'Updating...':"Update"}</button>
                <button type="button" onClick={()=>{
                    setUpdating(false);
                    presetRef.current.checked=false;
                }}>Cancel</button>
                {success &&<p style={{color:"green"}}>Successfully updated</p>}
                {error &&<p style={{color:"red"}}>{errorMessage}</p>}
            </form>}
        </section>
        <section id='display'>
            {loading? <p>loading...</p>:<>
            
            {users.length!==0 && display.map((u,i)=>
            <div key={i} className="userDiv" onClick={()=>{
                setNewCreds({...u});
                setUpdating(true);
                setError(false);
                setSuccess(false);
                document.getElementById('update').scrollIntoView({behavior:'smooth'});
                //console.log(u);
            }}>
                <div className='userIcon' >{u.username.charAt(0)}</div>
                <div>
                    <h3>{u.username}</h3>
                    <strong>{u.role}</strong>
                    <p>{u.email}</p>
                </div>
                
            </div>)}
            </>}
        </section>
        </>
    )
}