import { useEffect, useState } from "react";
import { fetchVehicleNews } from "../services/NewsService";
import Menu from "./sidebars/Menu";
import Footer from "./sidebars/Footer";

/*
----------------------------------------------------------------------------------
  Purpose: Displays latest automotive-related news using News API
  Return:  - Shows loading while fetching data
           - Lists fetched news articles in a formatted card layout
----------------------------------------------------------------------------------
*/
const News = () => {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getNewsData();
    }, []);

    /*
    ----------------------------------------------------------------------------------
      Purpose: Fetch and set automotive news articles from API
      Postcondition: Updates state with fetched data or sets an error message
    ----------------------------------------------------------------------------------
    */
    const getNewsData = async () => {
        try {
            setLoading(true);
            const articles = await fetchVehicleNews();
            setNewsData(articles);
        } catch (err) {
            console.error("News fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    /*
    ----------------------------------------------------------------------------------
      Purpose: Formats the data to make it look more pleasing
      Param: - string: date
      Postcondition: Updates state of data to clean format
    ----------------------------------------------------------------------------------
    */
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <>
            <Menu />
            <div className="news-container">
                <h1 className="news-header" style={{ color: "white" }}>
                    Latest Automotive News
                </h1>

                {loading ? (
                    <div className="loading-spinner" style={{ color: "white" }}>
                        Loading news...
                    </div>
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
                                                e.target.src = "/default-news.jpg"; // Fallback image
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
                <h1 className="news-header"></h1>
            </div>
            <Footer />
        </>
    );
};

export default News;
