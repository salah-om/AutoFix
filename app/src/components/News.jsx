import { useEffect, useState } from 'react';
import http from '../http-common';
import Menu from "./sidebars/Menu";
import Footer from "./sidebars/Footer";

const News = () => {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function getNewsData() {
        try {
            setLoading(true);
            const resp = await http.get("https://newsapi.org/v2/everything?q=vehicles&apiKey=780d2620d8de4c9fb8e11eeeae603969&pageSize=10");
            setNewsData(resp.data.articles);
        } catch (err) {
            setError("Failed to load news. Please try again later.");
            console.error("News fetch error:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getNewsData();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <Menu />
            <div className="news-container">
                <h1 className="news-header" style={{color: "white"}}>Latest Automotive News</h1>
                
                {loading ? (
                    <div className="loading-spinner" style={{color: "white"}}>Loading news...</div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    <div className="news-grid">
                        {newsData.map((article, index) => (
                            <article key={index} className="news-card">
                                {article.urlToImage && (
                                    <div className="news-image-container">
                                        <img 
                                            src={article.urlToImage} 
                                            alt={article.title}
                                            className="news-image"
                                            onError={(e) => {
                                                e.target.src = '/default-news.jpg'; // Fallback image
                                            }}
                                        />
                                    </div>
                                )}
                                <div className="news-content">
                                    <div className="news-source">
                                        {article.source?.name && <span>{article.source.name}</span>}
                                        {article.author && <span> • By {article.author}</span>}
                                        {article.publishedAt && <span> • {formatDate(article.publishedAt)}</span>}
                                    </div>
                                    <h2 className="news-title">
                                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                                            {article.title}
                                        </a>
                                    </h2>
                                    <p className="news-description">{article.description}</p>
                                    <a 
                                        href={article.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="read-more"
                                    >
                                        Read Full Story →
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
                <h1 className='news-header'></h1>
            </div>
            <Footer />
        </>
    );
}
 
export default News;