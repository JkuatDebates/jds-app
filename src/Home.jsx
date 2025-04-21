import {Swiper,SwiperSlide} from 'swiper/react';
import {Autoplay,Pagination, Navigation} from 'swiper/modules';
import 'swiper/css';
import {Lectern ,Mic ,Trophy, Gavel, MessageCircle,Quote, Instagram,} from 'lucide-react';
import { NavLink } from "react-router-dom";
import {upcomingEvents, EventCard} from './Timelines.jsx';

function Home(){
    const slides=[
        {text:'Welcome to JDS', image:'/Community4.jpg'},
        {text:'Who are we?', image:'/Community2.jpg'},
        {text:'We are a community of thinkers', image:'Community.jpg'},
        {text:'We are a community of thinkers', image:'Community3.jpg'},
        {text:'We are friends', image:'/Friends.jpg'},
        {text:'We are friends', image:'/Friends2.jpg'},
        {text:'We are award winners', image:'/Award2.jpg'},
        {text:'We are award winners', image:'/Award.jpg'}
    ];
    const whatWeDo=[
        {icon:<Lectern size={40} className='icon'/>, 
        title:'Debates', desc:'Learn and develop debate skills'},
        {icon:<Mic size={40} className='icon'/>, 
        title:'Public Speaking', desc:'Hone your ability to speak to audiences and make impactful speeches'},
        {icon:<Gavel size={40} className='icon'/>, 
        title:'Adjudication', desc:'Learn how to judge debates and public speaking'},
        {icon:<Trophy size={40} className='icon'/>, 
        title:'Tournaments', desc:'Get a chance to participate in local, regional and international competitions'},
        {icon:<MessageCircle size={40} className='icon'/>, 
        title:'Discussions', desc:'Get a chance to air your thoughts and learn in free round table discussions about anthing and everything'},
    ];
    const testimonials=[
        {author:'Keneth (Kenkei) Mwaniki', test:'I wish I had found the club sooner. Such an accepting group of people. Never a dull moment around them'},
        {author:'Nina A. Wairimu', test:'A group of nerds who are, like, mko na a bit of separation anxiety. A bit of attachment issues but we accept. We love each other the way that we are'}
    ];
    
    return(
    <>
    <section className="carousel">
        <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
            delay: 4000,
            disableOnInteraction: false,
        }}
        pagination={{
            clickable: true,
        }}
        loop={true}
        className="mySwiper">{slides.map((slide,index)=>(
            <SwiperSlide key={index}>
                <div className="slide">
                    <img src={slide.image} alt={`Slide ${index}`}/>
                    <div className="caption">{slide.text}</div>
                </div>
            </SwiperSlide>
        ))}</Swiper>
        </section>
        <section className='textBlock'>
            <h2>About us</h2>
            <p>We are a community of JKUAT students(current, former and affiliated) dedicated to the spoken arts. 
                Debate and public speaking are our bread and butter.
                Ours is a safe space for thinkers, yappers and listeners alike. 
                It's a space to hone your speaking skills while sharpening your mind
                through intellectual debates, discussions and stimulating public speaking
                prompts. More than anything, we are a community of 
                open-minded fellows always willing to hear new perspectives out. Check us out.
            </p>
        </section>
        <section className='textBlock'>
            <h2>What we do</h2>
            <div className='whatWeDoCardContainer'>
                {whatWeDo.map((service, index)=>(
                    <div key={index} className='whatWeDoCard'>
                        <div className='iconWrapper'>{service.icon}</div>
                        <h3>{service.title}</h3>
                        <p>{service.desc}</p>
                    </div>
                ))}
            </div>
        </section>
        <section>
            <h2>What members say</h2>
            {testimonials.map((t,i)=>(
                <div key={i} className='testimonials'>
                    <Quote size={'1.5rem'} display={'inline'}/>
                    <h4>{t.test}</h4>
                    <p style={{textAlign:'right'}}>{t.author}</p>
                </div>
            ))}
        </section>
        <section className='textBlock'>
            <h2>Check out upcoming events</h2>
            Most Imminent Event:
            <EventCard event={upcomingEvents[upcomingEvents.length-1]}/>
            <NavLink to='/timelines'><button className='buttonOnBrand'>Other Events</button></NavLink>
        </section>
    </>
        
    )
}
export default Home