import Menu from "../components/sidebars/Menu";
import Footer from "../components/sidebars/Footer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { topBestCars, topWorstCars } from "../services/ComplaintService";
import { getMakes } from "../services/VehicleService";

/*
----------------------------------------------------------------------------------
  Purpose: Home page showing vehicle makes and complaint-based rankings
  Return:  - Lists car makes as links
           - Shows Top 3 Best and Worst vehicles based on complaints
----------------------------------------------------------------------------------
*/
const Home = () => {
  const [carMakes, setCarMakes] = useState([]);
  const [bestCars, setBestCars] = useState([]);
  const [worstCars, setWorstCars] = useState([]);

  useEffect(() => {
    fetchCarData();
  }, []);

  /*
  ----------------------------------------------------------------------------------
    Purpose: Fetch all required data for the home page
    Postcondition: Updates car makes and rankings from backend API
  ----------------------------------------------------------------------------------
  */
  const fetchCarData = async () => {
    try {
      const [makes, best, worst] = await Promise.all([
        getMakes(),
        topBestCars(),
        topWorstCars()
      ]);

      setCarMakes(makes);
      setBestCars(best);
      setWorstCars(worst);
    } catch (err) {
      console.error("Error fetching home page data:", err);
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
};

export default Home;
