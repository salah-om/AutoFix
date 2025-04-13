import Menu from "../components/Menu";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import http from "../http-common";

const Home = () => {
  const [carMakes, setCarMakes] = useState([]);

  useEffect(() => {
    fetchCarMakes();
  }, []);
  
  const fetchCarMakes = async () => {
    try {
      const response = await http.get("/vehicles/makes");
      setCarMakes(response.data);
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
      </div>
      <Footer />
      </>
      );
}
 
export default Home;