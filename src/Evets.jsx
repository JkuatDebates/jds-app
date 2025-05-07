import { useState } from "react";
import { FaLocationDot,FaClock, FaMoneyBillWave, FaCreditCard} from "react-icons/fa6";
import {BsCalendar2DateFill} from "react-icons/bs";

const today=new Date().toISOString().split('T')[0];
const events=[
    {
        title: 'Mashujaa Opens XIV',
        venue: 'Strathmore University',
        venueLink:'',
        date: '2025-04-13',
        time:'8 AM EAT',
        cost:'Ksh.200 per speaker',
        registrationLink:'',
        paymentDetails:"",
        description:"14th edition of Strathmore University's signature debate tournament"
    },
    {
        title: "Sadaqah Li Qaadiya 2025: Debate for Hope's Children's Home",
        venue: 'DAK Discord(online)',
        venueLink:'https://discord.com/invite/YRkBRpa4',
        time:'8 AM EAT',
        cost: "Ksh. 100 (100% donated to children's Home)",
        date:'2025-05-01',
        paymentDetails:"Paybill, Business No: 247247, Account No: *140923, Name: Unis Debate Kenya",
        registrationLink:'https://forms.gle/hmkiKCrFXDE9d2Nt6',
        description:"Online debate open no novice and opens speakersfor a charitable course"
    },
    {
        title: "Illouwa III",
        venue: 'TBA',
        venueLink:'',
        cost: "TBA",
        time:'8 AM EAT',
        date:'2025-10-04',
        paymentDetails:"TBA",
        registrationLink:'',
        description:"3rd Edition of JKUAT'S very own debate tournament"
    },
];

export const upcomingEvents=events.filter(e=>e.date>=today)
        .sort((a,b)=>b.date.localeCompare(a.date));
const pastEvents=events.filter(e=>e.date<=today)
            .sort((a,b)=>b.date.localeCompare(a.date));
function Evets(){

    function eventList(events){
        return events.map((e,i)=>(<EventCard key={i} event={e}/>))
    }
    
    return(
        <div className="events">
            <h1>JDS and Circuit Events</h1>
            <div className="upcomingEvents">
                <h3>Upcoming Events</h3>
                {eventList(upcomingEvents)}
            </div>
            <div className="pastEvents">
                <h3>Past Events</h3>
                {eventList(pastEvents)}
            </div>
        </div>
    )
}
export function EventCard({event}){
    const [details, setDetails]=useState(false);

    return(
        <div className="eventCard">
            <div className="eventHeader" onClick={()=>setDetails(!details)}>
                <h4><BsCalendar2DateFill size={20} className="icon2"/>({event.date}) {event.title}</h4>
            </div>
            
            {details? <div className="eventDetails">
                <p><strong>Desc:</strong>{event.description}</p>
                <p><FaLocationDot size={20} className="icon2"/>{event.venueLink!==''?<a href={event.venueLink}>{event.venue}</a>:event.venue}</p>
                <p><FaClock size={20} className="icon2"/>{event.time}</p>
                <p><FaMoneyBillWave size={20} className="icon2"/>{event.cost}</p>
                {event.paymentDetails!==''?<p><FaCreditCard size={20} className="icon2"/>{event.paymentDetails}</p>:''}
                {event.registrationLink!==''?<p><a href={event.registrationLink} target="_blank" rel="noreferrer" style={{textDecoration:'none'}}>
                    <button className="buttonOnBrand">Register Now</button></a></p>:''}
                </div> :''}

        </div>
    );
}
export default Evets