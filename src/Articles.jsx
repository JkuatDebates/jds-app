
function Articles(){
    function renderArticle({article}){
        return(
            <div className="article">
                <section>
                    <h2>{article.title}</h2>
                    <h3>By {article.author} on {article.datePublished}</h3>
                    {article.thumbnail!==''&& <img src={article.thumbnail} alt=''></img>} 
                </section>
                <section>
                    {article.content.map((block,index)=>{
                        const Htag=block.tag;
                        switch(block.type){
                            case 'heading':
                                return <Htag key={index}>{block.text}</Htag>;
                            case 'paragraph':
                                return <p key={index}>{block.text}</p>;
                            case 'image':
                                return <img src={block.image} alt=''/>;
                            case 'quote':
                                return <Quote>{block.text}</Quote>;
                            default:
                                return null;
                        }
                    })}
                </section>
            </div>
        )
    }

    return(
    <>
        <section className="textBlock">
            <h2>Articles</h2>
            <p>Below are articles to get you conversant with 
                everything debate/public speaking. They are authored by
                the club's wonderful members. Have fun.</p>
        </section>
        <section className="textBlock">
            
        </section>

    </>
    )
}
export default Articles