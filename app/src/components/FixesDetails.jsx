import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Menu from "./sidebars/Menu";
import Footer from "./sidebars/Footer";
import { getFixByIssue } from "../services/FixService";

const FixesDetails = () => {
  const { issue } = useParams();
  const [fix, setFix] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFix();
  }, [issue]);

  const fetchFix = async () => {
    try {
      const decodedIssue = decodeURIComponent(issue);
      const fixData = await getFixByIssue(decodedIssue);
      
      if (!fixData) throw new Error("Fix not found");
      
      setFix({
        ...fixData,
        videoUrl: fixData.videourl
      });
    } catch (error) {
      console.error("Error loading fix:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{color: 'white', padding: '20px'}}>Loading...</div>;

  if (!fix) return <div style={{color: 'white', padding: '20px'}}>Fix not found</div>;

  return (
    <>
      <Menu />
      <div className="fixes-container">
        <h1 className="news-header" style={{color: 'white'}}>
          {fix.issue}
        </h1>
        <div className="fix-info-holder">
          {fix.description && (
            <div className="fix-description">
              <p style={{color: 'white'}}>{fix.description}</p>
            </div>
          )}
          {fix.videoUrl && (
            <div style={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center',
              width: '100%'
            }}>
              <iframe 
                width="560" 
                height="315" 
                src={`${fix.videoUrl}?rel=0`} 
                title={`${fix.issue} tutorial`}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
      <h1 className="news-header" style={{color: 'white'}}></h1>
      <Footer />
    </>
  );
};

export default FixesDetails;