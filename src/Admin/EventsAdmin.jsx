import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import axios from "axios";
import { currentServer } from "../assets/urls";

function EventsAdmin(){
    const navigate=useNavigate();
    const [creating,setCreating]=useState(false);
    const [updating,setUpdating]=useState(false);
    const [loading,setLoading]=useState(true);
    const [events,setEvents]=useState([]);
    const [displayed,setDisplayed]=useState([]);
    const eventLevels=['','University','High School','Grade School'];
    const eventTypes=['','Public Speaking','BP Debate',"World's Debate","PS and BP", "PS and World's",'Club Event','Circuit Event'];
    const venueTypes=['','Online','Physical','Hybrid']
    const blankEvent=
        {
            title:'',
            eventLevel:'',
            eventType:'',
            venue:'',
            venueType:'',
            host:'',
            startDate: Date.now,
            endDate:Date.now,
            judgeFee:'',
            speakerFee:'',
            observerFee:'',
            poster: null,
            speakerLink:'',
            judgeLink:'',
            observerLink:'',
            paymentDetails:'',
            description:'',
            displayed: false
        }
    const [newEvent,setNewEvent]=useState({...blankEvent});
    const [updateEvent,setUpdatedEvent]=useState({...blankEvent});

    const getEvents=async ()=>{
        try{
            const response=await axios.get(`${currentServer}/events`);
            if(response){
                console.log(response.data);
                setEvents(response.data);
                setDisplayed(response.data);
                setLoading(false);
            }
            else{
                console.log('No response');
            }
        }
        catch(err){
            console.log(err);
            console.log('Didnt get events');
        }
    }
    
    useEffect(()=>{
        getEvents();
    }
    ,[]);

    function newEventChange(e){
        if(e.target.type==='file'){
            setNewEvent({...newEvent, [e.target.name]:e.target.files[0]});
        }
        else if(e.target.name==='displayed'){ 
            setNewEvent({...newEvent, [e.target.name]:e.target.checked});
        }
        else {
            setNewEvent({...newEvent, [e.target.name]:e.target.value});
        }
    }
    async function newEventSubmit(e){
        e.preventDefault();
        //console.log(newEvent);
        const formData=new FormData();
        formData.append('title',newEvent.title);
        formData.append('eventLevel',newEvent.eventLevel);
        formData.append('eventType',newEvent.eventType);
        formData.append('venue',newEvent.venue);
        formData.append('venueType',newEvent.venueType);
        formData.append('host',newEvent.host);
        formData.append('startDate',newEvent.startDate);
        formData.append('endDate',newEvent.endDate);
        formData.append('judgeFee',newEvent.judgeFee);
        formData.append('speakerFee',newEvent.speakerFee);
        formData.append('observerFee',newEvent.observerFee);
        formData.append('speakerLink',newEvent.speakerLink);
        formData.append('judgeLink',newEvent.judgeLink);
        formData.append('observerLink',newEvent.observerLink);
        formData.append('poster',newEvent.poster);
        formData.append('paymentDetails',newEvent.paymentDetails);
        formData.append('description',newEvent.description);
        formData.append('displayed',newEvent.displayed);

        // for (let [key, value] of formData.entries()) {
        //     console.log(`${key}:`, value);
        //   }

        try{
           const result= await axios.post(`${currentServer}/events`,formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }});
            console.log(result.data);
            setNewEvent({...blankEvent});
            setCreating(false);
            getEvents();
            alert('Event created successfully');
        }
        catch(err){
            console.log(err);
            alert('Event creation failed');
        }
        
    }
    function updateEventChange(e){
        if(e.target.type==='file'){
            setUpdatedEvent({...updateEvent, [e.target.name]:e.target.files[0]});
        }
        else if(e.target.name==='displayed'){
            setUpdatedEvent({...updateEvent, [e.target.name]:e.target.checked});
        }
        else {
            setUpdatedEvent({...updateEvent, [e.target.name]:e.target.value});
        }
    }
    async function updateEventSubmit(e){
        e.preventDefault();
        //console.log(updateEvent);
        const formData=new FormData();
        formData.append('_id',updateEvent._id);
        formData.append('title',updateEvent.title);
        formData.append('eventLevel',updateEvent.eventLevel);
        formData.append('eventType',updateEvent.eventType);
        formData.append('venue',updateEvent.venue);
        formData.append('venueType',updateEvent.venueType);
        formData.append('host',updateEvent.host);
        formData.append('startDate',updateEvent.startDate);
        formData.append('endDate',updateEvent.endDate);
        formData.append('judgeFee',updateEvent.judgeFee);
        formData.append('speakerFee',updateEvent.speakerFee);
        formData.append('observerFee',updateEvent.observerFee);
        formData.append('speakerLink',updateEvent.speakerLink);
        formData.append('judgeLink',updateEvent.judgeLink);
        formData.append('observerLink',updateEvent.observerLink);
        formData.append('poster',updateEvent.poster);
        formData.append('paymentDetails',updateEvent.paymentDetails);
        formData.append('description',updateEvent.description);
        formData.append('displayed',updateEvent.displayed);

        // for (let [key, value] of formData.entries()) {
        //     console.log(`${key}:`, value);
        //   }

        try{
            const result= await axios.put(`${currentServer}/events`,formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }});
            console.log(result.data);
            setUpdating(false);
            getEvents();
            alert('Event updated successfully');
        }
        catch(err){
            console.log(err);
            alert('Event update failed');
        }       
    }
    async function deleteEvent(p){
        try{
            const response=await axios.delete(`${currentServer}/events/${p._id}`);
            console.log(response);
            setEvents(prev=>prev.filter(d=>d._id!==p._id));
            alert('deleted successfully');
        }
        catch(err){
            console.log(err);
            alert('delete unsuccessful');
        }
    }
    function search(){}

    function setDates(d){
        const date=d.split('T')[0];
        return date;
    }
    
    return(
    <>
    <button onClick={()=>navigate('/admin')}>Admin Panel</button>
    <button onClick={()=>setCreating(!creating)}>Add Event</button>
    {creating &&
    <section id="createEvent">
        <form onSubmit={newEventSubmit} style={{display:'flex', flexDirection:'column',gap:'0px'}}>
            <h2 style={{textAlign:"center"}}>New Event</h2>

            <label>Title<input type="text" required name="title" onChange={newEventChange} value={newEvent.title}/></label>
            <label>Level 
                <select required name="eventLevel" onChange={newEventChange} value={newEvent.eventLevel}>
                {eventLevels.map((l,i)=><option key={i}>{l}</option>)}
                </select>
            </label>
            <label>Type
            <select required name="eventType" onChange={newEventChange} value={newEvent.eventType}>
                {eventTypes.map((l,i)=><option key={i}>{l}</option>)}
                </select>
            </label>
            <label>Venue<input type="text" required name="venue" onChange={newEventChange} value={newEvent.venue}/></label>
            <label>Venue Type
            <select required name="venueType" onChange={newEventChange} value={newEvent.venueType}>
                {venueTypes.map((l,i)=><option key={i}>{l}</option>)}
                </select>
            </label>            
            <label>Hosted by<input type="text" name="host" onChange={newEventChange} value={newEvent.host}/></label>
            <label>Start Date<input type="date" name="startDate" onChange={newEventChange} value={newEvent.startDate}/></label>
            <label>End Date<input type="date" name="endDate" onChange={newEventChange} value={newEvent.endDate}/></label>
            <label>Adjudicator Registration Fee<input type="number" min={0} name="judgeFee" onChange={newEventChange} value={newEvent.judgeFee}/></label>
            <label>Speaker Registration Fee<input type="number" min={0} name="speakerFee" onChange={newEventChange} value={newEvent.speakerFee}/></label>
            <label>Observer Registration Fee<input type="number" min={0} name="observerFee" onChange={newEventChange} value={newEvent.observerFee}/></label>
            <label>Poster<input type="file" name="poster" onChange={newEventChange} accept="image/jpeg, image/png" required/></label>
            <label>Adjudicator Registration Link<input type="text" name="judgeLink" onChange={newEventChange} value={newEvent.judgeLink}/></label>
            <label>Speaker Registration Link<input type="text" name="speakerLink" onChange={newEventChange} value={newEvent.speakerLink}/></label>
            <label>Observer Registration Link<input type="text" name="observerLink" onChange={newEventChange} value={newEvent.observerLink}/></label>
            <label>Payment Details <textarea name="paymentDetails" onChange={newEventChange} value={newEvent.paymentDetails}></textarea></label>
            <label>Event Description <textarea name="description" onChange={newEventChange} value={newEvent.description}></textarea></label>
            <label>Visible to public?
                <input type="checkbox" name="displayed" onChange={newEventChange} checked={newEvent.displayed}/>
            </label>
            <div>
                <button type="submit">Submit</button>
                <button type="button" onClick={()=>{
                setCreating(false);
                setNewEvent({...blankEvent});
                }}>Cancel</button>
            </div>
        </form>        
    </section>}    
    <section id="updateEvent">
        {updating &&
        <form onSubmit={updateEventSubmit} style={{display:'flex', flexDirection:'column',gap:'0px'}}>
            <h2 style={{textAlign:"center"}}>Update Event</h2>

            <label>Title<input type="text" required name="title" onChange={updateEventChange} value={updateEvent.title}/></label>
            <label>Level 
                <select required name="eventLevel" onChange={updateEventChange} value={updateEvent.eventLevel}>
                {eventLevels.map((l,i)=><option key={i}>{l}</option>)}
                </select>
            </label>
            <label>Type
            <select required name="eventType" onChange={updateEventChange} value={updateEvent.eventType}>
                {eventTypes.map((l,i)=><option key={i}>{l}</option>)}
                </select>
            </label>
            <label>Venue<input type="text" required name="venue" onChange={updateEventChange} value={updateEvent.venue}/></label>
            <label>Venue Type
            <select required name="venueType" onChange={updateEventChange} value={updateEvent.venueType}>
                {venueTypes.map((l,i)=><option key={i}>{l}</option>)}
                </select>
            </label>
            <label>Hosted by<input type="text" name="host" onChange={updateEventChange} value={updateEvent.host}/></label>
            <label>Start Date<input type="date" name="startDate" onChange={updateEventChange} value={updateEvent.startDate}/></label>
            <label>End Date<input type="date" name="endDate" onChange={updateEventChange} value={updateEvent.endDate}/></label>
            <label>Adjudicator Registration Fee<input type="number" min={0} name="judgeFee" onChange={updateEventChange} value={updateEvent.judgeFee}/></label>
            <label>Speaker Registration Fee<input type="number" min={0} name="speakerFee" onChange={updateEventChange} value={updateEvent.speakerFee}/></label>
            <label>Observer Registration Fee<input type="number" min={0} name="observerFee" onChange={updateEventChange} value={updateEvent.observerFee}/></label>
            <label>Poster<input type="file" name="poster" onChange={updateEventChange} accept="image/jpeg, image/png"/></label>
            <label>Adjudicator Registration Link<input type="text" name="judgeLink" onChange={updateEventChange} value={updateEvent.judgeLink}/></label>
            <label>Speaker Registration Link<input type="text" name="speakerLink" onChange={updateEventChange} value={updateEvent.speakerLink}/></label>
            <label>Observer Registration Link<input type="text" name="observerLink" onChange={updateEventChange} value={updateEvent.observerLink}/></label>
            <label>Payment Details <textarea name="paymentDetails" onChange={updateEventChange} value={updateEvent.paymentDetails}></textarea></label>
            <label>Event Description <textarea name="description" onChange={updateEventChange} value={updateEvent.description}></textarea></label>
            <label>Visible to public?
                <input type="checkbox" name="displayed" onChange={updateEventChange} checked={updateEvent.displayed}/>
            </label>
            <div>
                <button type="submit">Update</button>
                <button type="button" onClick={()=>{
                setUpdating(false);
                setUpdatedEvent({...blankEvent});
                }}>Cancel</button>
            </div>
        </form>}        
    </section>
    <section id="events_control" className="textBlock">
        <h2>Logged Events</h2>
        <div className="search">
            <Search onClick={search} className="icon"/>
            <input type="text"  placeholder="Search for an event" onChange={search}/>
        </div>
    </section>
    {loading && <p>loading...</p>}
    {events.length!==0 && 
    <section id="rendred_events">
        {displayed.map((e,i)=>
        <div key={i} style={{display:'flex',flexDirection:"row", alignItems:'center'}}>
            <img src={e.poster} alt={e.title} style={{width:'50px', borderRadius:'5px'}}/>
            <p style={{flexGrow:'1',marginLeft:'1rem'}}>{e.title}</p>
            <button onClick={()=>{
                console.log(e);
                setUpdatedEvent({...e, startDate:setDates(e.startDate), endDate:setDates(e.endDate)});
                setUpdating(true);
                document.getElementById('updateEvent').scrollIntoView({behavior:'smooth'});
            }}>Update</button>
            <button onClick={()=>deleteEvent(e)}>Delete</button>
        </div>)}
    </section>}
    </>
    );
}
export default EventsAdmin