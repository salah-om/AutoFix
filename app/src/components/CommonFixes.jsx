import { useState, useEffect } from "react";
import Menu from "./sidebars/Menu";
import Footer from "./sidebars/Footer";
import http from "../http-common";

const CommonFixes = () => {
  const [fixes, setFixes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFixes();
  }, []);

  const fetchFixes = async () => {
    try {
      const response = await http.get("/fixes");
      setFixes(response.data);
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
            <div key={index} className="fixGuide-card">
              <h3 className="fixGuide-issue">{fix.issue}</h3>
              <div className="fixGuide-hoverContent">
                <span>Learn more</span>
                <span className="fixGuide-arrow">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CommonFixes;