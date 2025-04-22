import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Menu from "./sidebars/Menu";
import Footer from "./sidebars/Footer";

const Models = () => {
  const { make } = useParams();
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/vehicles/models/${make}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(`Fetched models for ${make}:`, data);
        setModels(data);
      })
      .catch((err) => {
        console.error("Error fetching models:", err);
      });
  }, [make]);

  return (
    <>
      <Menu />
      <div className="holderhome">
        <h2 className="news-header" style={{ color: "white" }}>
          Select a model for <span style={{ textTransform: "capitalize" }}>{make}</span>
        </h2>
        <ul className="carmakes">
          {models.map((model, index) => (
            <li key={index}>
              <Link to={`/cars/${make}/${model.toLowerCase()}`}>
                <img
                  src={`http://localhost:3000/${model.toLowerCase()}.png`}
                  alt={model}
                  onError={(e) => (e.target.src = "/default.png")}
                />
                <h2>{model}</h2>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default Models;
