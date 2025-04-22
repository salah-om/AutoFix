import Menu from "../components/sidebars/Menu";
import Footer from "../components/sidebars/Footer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import http from "../http-common";

const Home = () => {
  const [carMakes, setCarMakes] = useState([]);
  const [bestCars, setBestCars] = useState([]);
  const [worstCars, setWorstCars] = useState([]);

  useEffect(() => {
    fetchCarData();
  }, []);
  
  const fetchCarData = async () => {
    try {
      const [makesResponse, bestResponse, worstResponse] = await Promise.all([
        http.get("/vehicles/makes"),
        http.get("/complaints/top-best"),
        http.get("/complaints/top-worst")
      ]);
      
      setCarMakes(makesResponse.data);
      setBestCars(bestResponse.data);
      setWorstCars(worstResponse.data);
    } catch (err) {
      console.error("Error fetching car makes:", err);
    } 
  };

    return (
      <>
        <Menu />
      <div className="holderhome">

        <h2 className="news-header" style={{ color: "white" }}>Select your Vehicle</h2>
        <ul className="carmakes">
          {carMakes.map((make, index) => (
            <li key={index}>
              <Link to={`/cars/${make.toLowerCase()}`}>
                <img src={`/${make.toLowerCase()}.png`} alt={make} />
                <h2>{make}</h2>
              </Link>
            </li>
          ))}
        </ul>
        <h2 className="news-header"></h2>
        <div className="car-rankings-container">
          <div className="car-ranking-box best-cars">
            <h3>Top 3 Best Models</h3>
            {bestCars.map((car, index) => (
              <div key={index} className="car-ranking-item">
                <h4>{car.make} {car.model} ({car.year})</h4>
              </div>
            ))}
          </div>
          
          <div className="car-ranking-box worst-cars">
            <h3>Top 3 Worst Models</h3>
            {worstCars.map((car, index) => (
              <div key={index} className="car-ranking-item">
                <h4>{car.make} {car.model} ({car.year})</h4>
              </div>
            ))}
          </div>
        </div> 
        <h2 className="news-header"></h2>
      </div>
      <Footer />
      </>
      );
}
 
export default Home;