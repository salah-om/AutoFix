import { useState, useEffect } from "react";
import Menu from "./sidebars/Menu";
import Footer from "./sidebars/Footer";
import { getAllFixesByName } from "../services/FixService";
import { Link } from "react-router-dom";

const CommonFixes = () => {
  const [fixes, setFixes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFixes();
  }, []);

  const fetchFixes = async () => {
    try {
      const data = await getAllFixesByName();
      setFixes(data);
    } catch (error) {
      console.error("Error fetching fixes:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading fixes...</div>;

  return (
    <>
      <Menu />
      <div className="fixes-container">
        <h1 className="news-header" style={{color: 'white'}}>
          Common Fixes Guide
        </h1>
        
        <div className="fixGuide-grid">
          {fixes.map((fix, index) => (
            <Link to={`/common-fixes/${encodeURIComponent(fix.issue)}`} key={index}>
              <div className="fixGuide-card">
                <h3 className="fixGuide-issue">{fix.issue}</h3>
                <div className="fixGuide-hoverContent">
                  <span>Learn more</span>
                  <span className="fixGuide-arrow">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CommonFixes;