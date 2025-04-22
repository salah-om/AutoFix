import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import http from "../http-common";
import Menu from "./sidebars/Menu";
import Footer from "./sidebars/Footer";
import ComplaintList from "./ComplaintList";

const SearchComplaints = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await http.get(`/complaints/search?query=${query}`);
        setResults(response.data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <>
      <Menu />
      <div className="container mt-4">
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <ComplaintList complaints={results} title={`Search Results for "${query}"`}/>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchComplaints;