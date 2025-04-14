import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Menu from "./Menu";
import Footer from "./Footer";
import { getVehicleYears, getWorstYear, getComplaintsByYear, getWorstProblems, getAllComplaints } from "../services/ModelSummaryService";

const ModelSummary = () => {
  const { make, model } = useParams();
  const [yearsData, setYearsData] = useState({
    years: [],
    worstYear: null,
    complaintsByYear: {},
    worstProblems: []
  });
  
  const [allComplaints, setAllComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [make, model]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [years, worstYear, complaintsByYear, worstProblems, allComplaints] = await Promise.all([
        getVehicleYears(make, model),
        getWorstYear(make, model),
        getComplaintsByYear(make, model),
        getWorstProblems(make, model),
        getAllComplaints(make, model)
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

      setAllComplaints(allComplaints);
      setFilteredComplaints(allComplaints);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleYearClick = (year) => {
    setSelectedYear(year);
    if (year === null) {
      setFilteredComplaints(allComplaints);
    } else {
      setFilteredComplaints(allComplaints.filter(
        complaint => complaint.vehicle.year === year
      ));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Menu />
      <div className="holderhomeM">
        <div className="holderhome-summary">
        <h1>
          <span style={{ textTransform: "capitalize", color: "white", marginLeft: "37%" }}>
            {make} {model}
          </span>
        </h1>
        
        <div className="summary-sectionWM">
          <h3>Worst Model Year</h3>
          {yearsData.worstYear && (
            <div className="worst-year-card">
              <h2>{yearsData.worstYear.year}</h2>
              <p>{yearsData.worstYear.count} complaints 😠</p>
            </div>
          )}
        </div>

        <div className="summary-section">
          <h3 style={{marginLeft: '34%'}}>MODEL YEAR COMPARISON</h3>
          <ul className="carmakes">
            <li>
              <button 
                onClick={() => handleYearClick(null)}
                className={!selectedYear ? "active-year" : ""}
              >
                <h2>All Years</h2>
              </button>
            </li>
            {yearsData.years.map((year, index) => (
              <li key={index}>
                <button 
                  onClick={() => handleYearClick(year)}
                  className={selectedYear === year ? "active-year" : ""}
                >
                  <h2>{year}</h2>
                  <p>{yearsData.complaintsByYear?.[year] || 0} complaints</p>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="summary-section">
          <h3 style={{marginLeft: '30%'}}>WORST <span style={{ textTransform: "capitalize" }}>{make} {model}</span> PROBLEMS</h3>
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
      </div>

        <div className="complaints-section">
          <h3 style={{color: "white", textTransform: "capitalize", marginLeft: '33%'}}>
            {selectedYear ? `${make} ${model} ${selectedYear} Complaints` : `All ${make} ${model} Complaints`}
          </h3>
          <div className="complaints-list">
            {filteredComplaints.length > 0 ? (
              filteredComplaints.map((complaint) => (
                <div key={complaint.id} className="complaint-card">
                  <div className="complaint-header">
                    <span className="username">{complaint.user.username}</span>
                    <span className="date">
                      {new Date(complaint.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="vehicle-info">
                    {complaint.vehicle.year} {complaint.vehicle.make} {complaint.vehicle.model}
                  </div>
                  <h4 className="issue">{complaint.issue}</h4>
                  <p className="description">{complaint.description}</p>
                  <div className="complaint-footer">
                    <span className="cost">Repair Cost: ${complaint.cost}</span>
                  </div>
                </div>
              ))
            ) : (
              <p>No complaints found</p>
            )}
          </div>
        </div>
        <h1 className="news-header"></h1>
      </div>
      <Footer />
    </>
  );
};

export default ModelSummary;