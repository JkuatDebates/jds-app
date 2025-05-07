import axios from "axios";
import { useEffect, useState } from "react";
import { currentServer } from "./assets/urls";

export default function Events(){
    const [events, setEvents]=useState([]);
    const [loading, setLoading]=useState(true);
    const [dits, setDits]=useState(false);
    const [details, setDetails]=useState([]);
    const today=new Date().toISOString().split('T')[0];

    const getEvents=async ()=>{
        try{
            const response=await axios.get(`${currentServer}/events`);
            if(response){
                console.log(response.data);
                setEvents(response.data);
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

    function getDetails(e){
        setDetails({...e});
        setDits(true);
        document.getElementById('eventDetails').scrollIntoView({behavior:'smooth'});
    }
    function dater(d){
        const dArray= d.split('T',1)[0].split('-');
        //return dArray.length;
        return `${dArray[2]}-${dArray[1]}-${dArray[0]}`;
    }


    return(
        <div style={{textAlign:"center",boxSizing:"border-box"}}>
        <section id="upcomingEvents" className="textBlock">
            <h4>Upcoming Events</h4>
            {loading===false&& 
            events.filter(e=>e.endDate>=today).sort((a,b)=>a.endDate.localeCompare(b.endDate)).map((e,i)=><ECard key={i} event={e} getDetails={getDetails}/>)}
        </section>
        <section id="pastEvents" className="textBlock">
            <h4>Past Events</h4>
            {loading===false&& 
            events.filter(e=>e.endDate<today).sort((a,b)=>b.endDate.localeCompare(a.endDate)).map((e,i)=><ECard key={i} event={e} getDetails={getDetails}/>)}
        </section>
        <section id="eventDetails" className="textBlock">
            {dits &&
            <div  style={{backgroundColor:'white'}}>
                <dt style={{backgroundColor:'hsl(213, 46%, 12%)', marginBottom:'0', color:'white', fontSize:'1.3rem', padding:'1rem', borderBottom:'1px solid white'}}>{details.title}</dt>
                <dl className="eDetails">
                    <dt>Level</dt><dd>{details.eventLevel}</dd>
                    <dt>Type</dt><dd>{details.eventType}</dd>
                    <dt>Venue</dt><dd>{details.venue} ({details.venueType})</dd>
                    {details.host!==''&& <><dt>Hosted by</dt><dd>{details.host}</dd></>}
                    <dt>Dates</dt><dd>From {dater(details.startDate)} to {dater(details.endDate)}</dd>
                    {(details.judgeFee!==0)&&(details.judgeFee!==null) &&<><dt>Adjudicator Reg</dt><dd>Ksh.{details.judgeFee}</dd></>}
                    {(details.speakerFee!==0)&&(details.speakerFee!==null) &&<><dt>Speaker Reg</dt><dd>Ksh.{details.speakerFee}</dd></>}
                    {(details.observerFee!==0)&&(details.observerFee!==null) &&<><dt>Observer Reg</dt><dd>Ksh.{details.observerFee}</dd></>}
                    {details.speakerLink!='' &&<><dt>Speaker Link</dt><dd><a href={details.speakerLink} target="_blank">Click here</a></dd></>}
                    {details.judgeLink!='' &&<><dt>Adjudicator Link</dt><dd><a href={details.judgeLink} target="_blank">Click here</a></dd></>}
                    {details.observerLink!='' &&<><dt>Observer Link</dt><dd><a href={details.observerLink} target="_blank">Click here</a></dd></>}
                    {details.paymentDetails!='' &&<><dt>Payment Details</dt><dd>{details.paymentDetails}</dd></>}
                    {details.description!='' &&<><dt>Event Description</dt><dd>{details.description}</dd></>}
                </dl>
            </div>}
            <button onClick={()=>{
                document.getElementById('upcomingEvents').scrollIntoView({behavior:'smooth'})
            }}>Back to Upcoming Events</button>
        </section>
        </div>

    )
}
function ECard({event,getDetails}){
    return(
        <>
        <div className="eCard">
            <div className="posterFrame" ><img src={event.poster} alt={event.title} /></div>
            <div ><h3 style={{margin:'0.6rem', display:'inline'}}>{event.title} 
            <button className="buttonOnBrand" onClick={()=>getDetails(event)}>Details</button></h3></div>
        </div>
        </>
    )
}