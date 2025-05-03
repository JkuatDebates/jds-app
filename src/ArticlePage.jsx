import { profiles } from "./profiles";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { TagIcon, Calendar1Icon} from 'lucide-react';

function ArticlePage(){
    const {id}= useParams();
    const [loading, setLoading]=useState(true);
    const [article, setArticle]=useState();
    let nav=useNavigate();
    
    useEffect(()=>{
            const fetchArticle=async ()=> {
                try{
                    const response= await axios.get('https://jdsbackend.onrender.com/articles');
                    const res=response.data.find(a=> a._id===id);
                    //console.log(res);
                    setArticle(res);
                    setLoading(false);
                }
                catch(err){
                    console.log(err);
                    setLoading(false);
                }
            }
            fetchArticle();
            return()=>{
                setArticle(null);
            };
        },[]);
        function getProfilePic(a){
            const pic=profiles.filter(p=>p.name===a);
            return(pic[0].photo);
        }
    function renderText(b){
        const paragraphs= b.trim().split(/\n\s*\n/)
        return paragraphs.map((p,i)=><p key={i}>{p.trim()}</p>)

    }

    return(<>
    {loading && <p>Loading...</p>}
    {article&&<>
    <div className="textBlock">
                <h3 style={{margin:'0'}}>{article.title}</h3>                
                <strong style={{display:'flex', alignItems:'center',gap:'5px', margin:'10px', fontSize:'0.9rem'}}>{<img src={getProfilePic(article.author)} alt='/author.jpg' className='authorPic'/>} {article.author} <Calendar1Icon size={'1rem'} color='hsl(166, 100%, 20%)'/> {article.datePublished.split('T',1)} <TagIcon size={'1rem'} color='hsl(166, 100%, 20%)'/>{article.tag}</strong>
            </div>
            <section>
                <div className="article">{renderText(article.content)}</div>
                <button style={{backgroundColor:'hsl(166, 100%, 20%)'}} onClick={()=>nav('/articles')}>View Other Articles</button>
            </section>
        </>}
    </>)
}
export default ArticlePage