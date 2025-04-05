import Menu from "../components/Menu";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [carMakes, setCarMakes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/vehicles/makes")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched car makes:", data);
        setCarMakes(data);
      })
      .catch((err) => console.error("Error fetching car makes:", err));
  }, []);
  

    return (
      <>
        <Menu />
      <div className="holderhome">
        <h2 style={{ color: "white" }}>Select your Vehicle</h2>
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
      </div>
      <Footer />
      </>
      );
}
 
export default Home;