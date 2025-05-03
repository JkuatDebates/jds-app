import {profiles} from './profiles';
import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TagIcon, Calendar1Icon, Search} from 'lucide-react';

function Articles(){
    const [articles,setArticles]=useState([]);
    const [loading,setLoading]=useState(true);
    const filterRef=useRef(null);
    const searchRef=useRef(null);
    const articleTypes=['','Other','Debate Topics','PS Topics','Personal Takes','Tournament Review','Training'];

    useEffect(()=>{
        const fetchArticles=async ()=> {
            try{
                const response= await axios.get('https://jdsbackend.onrender.com/articles');
                setArticles(response.data);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchArticles();
        return()=>{
            setArticles(null);
        };
    },[]);

    function getProfilePic(a){
        const pic=profiles.filter(p=>p.name===a);
        return(pic[0].photo);
    }
    function renderArticles(){
        const filter=filterRef.current.value;
        const search=searchRef.current.value;
        console.log(`filter:${filter} \n search:${search}`);
    }

    return(
    <>
        <section className="textBlock">
            <h2>Articles</h2>
            <p>Below are articles to get you conversant with 
                everything debate/public speaking. They are authored by
                the club's wonderful members. Have fun.</p>
        </section>
        <section >
            {loading && <p>Loading...</p>}
            
            <div className='textBlock'>
                <h4>Filter <select ref={filterRef} onChange={renderArticles}>{articleTypes.map((t,i)=>
                <option key={i}>{t}</option>)}</select></h4>
                <div className='search'><Search onClick={renderArticles}/><input ref={searchRef} onKeyDown={(e)=>e.key==='Enter'&& renderArticles()} type="text" placeholder='Search Article' /></div>
            </div>            
            {articles && articles.map((a,i)=>
            <div key={i} className="textBlock">
                <Link to={`/articles/${a._id}`} style={{color:'hsl(213, 46%, 12%)'}}>
                <h3 style={{margin:'0'}}>{a.title}</h3></Link>                
                <strong style={{display:'flex', alignItems:'center',gap:'5px', margin:'10px', fontSize:'1rem'}}>{<img src={getProfilePic(a.author)} alt='/author.jpg' className='authorPic'/>} {a.author} <Calendar1Icon size={'1rem'} className='icon'/> {a.datePublished.split('T',1)} <TagIcon size={'1rem'} className='icon'/> {a.tag}</strong>
            </div>)}
        </section>

    </>
    )
}
export default Articles