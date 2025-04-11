import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Menu from "./Menu";
import Footer from "./Footer";

const ModelSummary = () => {
  const { make, model } = useParams();
  const [yearsData, setYearsData] = useState({
    years: [],
    worstYear: null,
    complaintsByYear: {},
    worstProblems: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [yearsRes, worstYearRes, complaintsRes, problemsRes] = await Promise.all([
          fetch(`http://localhost:3000/vehicles/years/${make}/${model}`),
          fetch(`http://localhost:3000/complaints/${make}/${model}/worst-year`),
          fetch(`http://localhost:3000/complaints/${make}/${model}/complaints-by-year`),
          fetch(`http://localhost:3000/complaints/${make}/${model}/worst-problems`)
        ]);

        const [years, worstYear, complaintsByYear, worstProblems] = await Promise.all([
          yearsRes.json(),
          worstYearRes.json(),
          complaintsRes.json(),
          problemsRes.json()
        ]);

        const complaintsMap = complaintsByYear.reduce((acc, item) => {
          acc[item.year] = item.count;
          return acc;
        }, {});

        setYearsData({
          years: years.sort((a,b) => a - b),
          worstYear,
          complaintsByYear: complaintsMap,
          worstProblems
        });
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [make, model]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Menu />
      <div className="holderhome">
        <h1>
          <span style={{ textTransform: "capitalize", color: "white", marginLeft: "37%" }}>{make} {model}</span>
        </h1>
        
        {/* Worst Model Year Section */}
        <div className="summary-section">
          <h3>Worst Model Year</h3>
          {yearsData.worstYear && (
            <div className="worst-year-card">
              <h2>{yearsData.worstYear.year}</h2>
              <p>{yearsData.worstYear.count} complaints 😠</p>
            </div>
          )}
        </div>

        {/* Model Year Comparison */}
        <div className="summary-section">
          <h3>MODEL YEAR COMPARISON</h3>
          <ul className="carmakes">
            {yearsData.years.map((year, index) => (
              <li key={index}>
                <Link to={`/cars/${make}/${model}/${year}`}>  
                  <h2>{year}</h2>
                  <p>{yearsData.complaintsByYear?.[year] || 0} complaints</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Worst Problems Section */}
        <div className="summary-section">
          <h3>WORST <span style={{ textTransform: "capitalize" }}>{make} {model}</span> PROBLEMS</h3>
          <div className="problems-list">
            {yearsData.worstProblems.map((problem, index) => (
              <div key={index} className="problem-card">
                <h4>{problem.issue}</h4>
                <p>Year: {problem.year}</p>
                <p>Average Cost: ${problem.maxCost? problem.maxCost: "N/A"}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="complaints-section">
          <h3 style={{color: "white"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Complaints:</h3>
          <div className="complaints-background">
            
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ModelSummary;