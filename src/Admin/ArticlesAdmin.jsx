import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";


function ArticlesAdmin(){
    const navigate=useNavigate();
    const articleTagRef=useRef(['Other','Debate Topics','Personal Takes', 'Tournament Review','PS Topics','Training']);
    const cbref=useRef(null);
    const [articles, setArticles]=useState([]);
    const [rerender, setRerender]=useState(false);
    const [article,setArticle]=useState({
        title:'',
        author:'',
        datePublished:Date.now,
        tag:'Other',
        thumbnail:'',
        content:'',
        displayed: false
    });
    axios.get('https://jdsbackend.onrender.com/articles')
        .then(response=>{
            setArticles([...response.data]);
            //console.log(articlesRef.current);
        })
        .catch(error=>console.log(error));

    function resizeTA(){
        const contentArea=cbref.current;
        contentArea.style.height='auto';
        contentArea.style.height=`${contentArea.scrollHeight}px`;
        
    }
    function handleFormChange(e){
        setArticle({...article, [e.target.name]: e.target.value});
        if(e.target===cbref.current)
            resizeTA();
    }
        
    function formSubmit(e){
        e.preventDefault();        
        cbref.current.style.height=`auto`;
        try{
            if(article.author!==''&&article.title!==''&&article.content!=='')
                axios.post('https://jdsbackend.onrender.com/articles',article)
                    .then(console.log('post succesful'));
            else{
                console.log('fill the necessary');
            }
            setArticle({
                title:'',
                author:'',
                datePublished:Date.now,
                tag:'Other',
                thumbnail:'',
                content:'',
                displayed: false
            });
        }
        catch(err){
            console.log(err);
        }
    }
    function deleteArticle(a){
        try{
            axios.delete('https://jdsbackend.onrender.com/articles',{data: a})
                .then(res=>console.log(res));
            setRerender(!rerender);
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <>
        <section className="textBlock">
            <button onClick={()=>navigate('/admin')}>Admin Panel</button>
            <h3>Create New Article</h3>
            <form onSubmit={formSubmit}>
                <p>Title: <input type="text" name="title" onChange={handleFormChange} value={article.title}/></p>
                <p>Author: <input type="text" name="author" onChange={handleFormChange}value={article.author}/></p>
                <p>Date Published: <input type="date" onChange={handleFormChange} value={article.datePublished} name="datePublished"/></p>
                <p>Tag: <select name="tag" onChange={handleFormChange} value={article.tag}>{articleTagRef.current.map((t,i)=>
                <option key={i} value={t}>{t}</option>)}</select></p>
                <p><strong>Content</strong></p>
                <textarea ref={cbref} name="content" onChange={handleFormChange} value={article.content}></textarea>
                <button type="submit">Submit</button>
                <button type="reset">Cancel</button>
            </form>
        </section>
        <section className="textBlock">
            <h3>Existing Articles</h3>
            {articles.map((a,i)=><div key={i}className="articleCard">
                <h4>{a.title}</h4> <p>by {a.author} on {a.datePublished.split('T')[0]} <button onClick={()=>deleteArticle(a)}>Delete</button></p> 
            </div>)}
        </section>
        </>
    )
}
export default ArticlesAdmin