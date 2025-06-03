import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { currentServer } from "../assets/urls";
import { QuoteIcon } from "lucide-react";


function ArticlesAdmin(){
    const navigate=useNavigate();
    const articleTagRef=useRef(['Other','Debate Topics','Personal Takes', 'Tournament Review','PS Topics','Training']);
    const addBlockRef=useRef(null);
    const blockRef=useRef(['paragraph','image','quote','list','heading']);
    const authorsRef=useRef([]);
    const pref=useRef(null);
    const iref=useRef(null);
    const qref=useRef(null);
    const lref=useRef(null);
    const dref=useRef(null);
    const blocksRef=useRef([]);
    const [blocks, setBlocks]=useState([]);
    //const sampleBlock=[{blockTag:'paragraph',blockData:'sample data'},{blockTag:'image',blockData:'/ken.jpg'},{blockTag:'quote', blockData:"That's what she said"},{blockTag:'list',blockData:['apple','banana','orange']}];
    const [adding,setAdding]=useState(false);
    const [articles, setArticles]=useState([]);
    const [creating, setCreating]=useState(false);
    const [submitting, setSubmitting]=useState(false);
    const [error, setError]=useState(false);
    const [errorMessage, setErrorMessage]=useState('Something went wrong');
    const [images, setImages]= useState([]);
    //const [updating, setUpdating]=useState(false);
    const blankArticle={
        title:'',
        author:'',
        datePublished:Date.now(),
        tag:'Other',
        content:[],
        displayed: false
    }
    const [article,setArticle]=useState(blankArticle);
    
    const getArticles=async ()=>{
        try{
        const res1= await axios.get(`${currentServer}/articles`)
        setArticles([...res1.data]);
        const res2=await axios.get(`${currentServer}/profiles`);
        authorsRef.current=[...res2.data];
        //console.log(authorsRef.current);
        }   
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getArticles();
    },[]);    

    function resizeTA(){
        const contentArea=pref.current;
        contentArea.style.height='auto';
        contentArea.style.height=`${contentArea.scrollHeight}px`;
        
    }
    function createBlock(){
        setAdding(true);
        newBlock();
    }
    function newBlock(){
        switch(addBlockRef.current.value){
            case 'paragraph':
                return <>
                <textarea ref={pref} style={{width:"90vw"}} onChange={resizeTA}></textarea>
                <button type="button" name="paragraph" onClick={addBlock}>Add</button>
                <button type="button" onClick={()=>setAdding(false)}>Cancel</button>
                </>
            case 'image':
                return <>
                <input type="file" ref={iref} accept="image/jpeg, image/png, image/jpg"/>
                <button type="button" name="image" onClick={addBlock}>Add</button>
                <button type="button" onClick={()=>setAdding(false)}>Cancel</button>
                </>
            case 'quote':
                return <>
                <input type="text" ref={qref}/>
                <button name="quote" type="button" onClick={addBlock}>Add</button>
                <button type="button" onClick={()=>setAdding(false)}>Cancel</button>
                </>
            case 'list':
                return <>
                <input type="text" ref={lref}/>
                <button type="button" name="list" onClick={addBlock}>Add</button>
                <button type="button" onClick={()=>setAdding(false)}>Cancel</button>
                </>
            case 'heading':
                return <>
                <input type="text" ref={dref}/>
                <button type="button" name="heading" onClick={addBlock}>Add</button>
                <button type="button" onClick={()=>setAdding(false)}>Cancel</button>
                </>
        }
    }
    function addBlock(e){
        //console.log(e.target.name);
        switch(e.target.name){
            case 'paragraph':
                blocksRef.current=[...blocksRef.current,{blockTag:'paragraph', blockData:pref.current.value}];
                break;
            case 'quote':
                blocksRef.current=[...blocksRef.current,{blockTag:'quote', blockData:qref.current.value}];
                break;
            case 'list':
                blocksRef.current=[...blocksRef.current,{blockTag:'list', blockData:lref.current.value}];
                break;
            case 'heading':
                blocksRef.current=[...blocksRef.current,{blockTag:'heading', blockData:dref.current.value}];
                break;
            case 'image':
                //console.log(iref.current.files[0].name);
                setImages([...images, iref.current.files[0]]);
                blocksRef.current=[...blocksRef.current,{blockTag:'image', blockData:previewImage(iref.current.files[0])}];
                break;
        }
        setBlocks(blocksRef.current);
        setArticle({...article, content:[...blocksRef.current]});
        setAdding(false);
    }

    function previewImage(i){
        const prev=URL.createObjectURL(i);
        //console.log(prev);
        return prev;
    }

    function renderBlocks(){
        if(blocks.length===0) return null
        return blocks.map((b,i)=>
                b.blockTag==='paragraph'?
                <p key={i}>{b.blockData}</p>
                :b.blockTag==='heading'?
                <h3 key={i}>{b.blockData}</h3>
                :b.blockTag==='image'?
                <img key={i} style={{width:'80vw',maxWidth:'500px', display:'flex', justifySelf:'center'}} src={b.blockData} alt=''/>
                : b.blockTag==='quote'?
                <p key={i} style={{display:'flex',alignItems:'center', justifyContent:'center'}}><QuoteIcon size={20}/>{b.blockData}</p>
                :b.blockTag==='list'?
                <ul key={i} >{b.blockData.map((l,x)=>
                <li style={{display:'list-item'}} key={x}>{l}</li>)}</ul>
                :null
                )
        }

    function handleFormChange(e){
        setError(false);
        setArticle({...article, [e.target.name]: e.target.value});
    }
        
    async function formSubmit(e){
        e.preventDefault();
        setError(false);
        setSubmitting(true);
        const formData=new FormData();
        formData.append('title',article.title);
        formData.append('author',article.author);
        formData.append('datePublished',article.datePublished);  
        formData.append('tag',article.tag);
        formData.append('content',JSON.stringify(article.content));
        images.forEach((img)=>{
            formData.append('images',img);
        })
        
        try{
            if(article.author!==''&&article.title!==''&&article.content!==''){
            const res=await axios.post(`${currentServer}/articles`,formData,{
                headers:{'Content-Type':'multipart/form-data'}
            });
            console.log(res);
            console.log('post succesful');
            setArticle(blankArticle);
            setBlocks([]);
            blocksRef.current=[];
            setImages([]);
            setSubmitting(false);
            setCreating(false);
            getArticles();
            }else{
                console.log('fill the necessary');
                setError(true);
                setSubmitting(false);
                setErrorMessage('Fill the necessary');
            }
        }
        catch(err){
            console.log(err);
            setError(true);
            setSubmitting(false);
            setErrorMessage('Saving failure');
        }
    }
    async function deleteArticle(a){
        try{
            const res=await axios.delete(`${currentServer}/articles`,{data: a});
            console.log(res);
            getArticles();
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <>
        <button onClick={()=>navigate('/admin')}>Admin Panel</button><button onClick={()=>setCreating(!creating)}>Create New</button>
        <section id="newArticle">
            {creating &&
                <form onSubmit={formSubmit}>
                <p>Title: <input type="text" name="title" onChange={handleFormChange} value={article.title}/></p>
                <label >
                    Select Author
                    <select name="author" value={article.author} onChange={handleFormChange}>
                        <option value=""></option>
                        {authorsRef.current.map(a=>a.name).map((a,i)=>
                        <option key={i}>{a}</option>)}
                    </select>
                </label>
                <p>Tag: <select name="tag" onChange={handleFormChange} value={article.tag}>{articleTagRef.current.map((t,i)=>
                <option key={i} value={t}>{t}</option>)}</select></p>
                <div className="articlePreview">
                    {blocks.length>0 && <h2>Preview</h2>}
                    {renderBlocks()}
                </div>
                {adding && newBlock()}
                <div>
                    <select style={{width:"50vw", maxWidth:"500px", display:'inline'}} ref={addBlockRef} onChange={()=>setAdding(false)}>
                    {blockRef.current.map((b,i)=>
                    <option key={i}>{b}</option>)}
                    </select>
                    <button type="button" onClick={createBlock}>+</button>
                </div>
                <br />
                <button type="submit" disabled={submitting}>{submitting?'Submitting...':'Submit'}</button>
                <button type="reset" onClick={()=>{
                    setBlocks([]);
                    blocksRef.current=[];
                    setArticle(blankArticle);
                    setImages([]);
                    setCreating(false);
                    }}>Cancel</button>
                {error && <p style={{color:'red'}}>{errorMessage}</p>}
            </form>}
        </section>
        <section id="existingArticles" className="textBlock">
            <h3>Existing Articles</h3>
            {articles.map((a,i)=><div key={i}className="articleCard">
                <h4>{a.title}</h4> <p>by {a.author} on {a.datePublished.split('T')[0]} <button onClick={()=>deleteArticle(a)}>Delete</button></p> 
            </div>)}
        </section>
        </>
    )
}
export default ArticlesAdmin