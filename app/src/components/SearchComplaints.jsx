import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Menu from "./sidebars/Menu";
import Footer from "./sidebars/Footer";
import ComplaintList from "./ComplaintList";
import { searchComplaints } from "../services/ComplaintService";

/*
---------------------------------------------------------------------------
  Purpose: Displays search results for complaint searches
  Return: - Handles search parameter from URL
          - Shows results via ComplaintList component
--------------------------------------------------------------------------
 */
const SearchComplaints = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (query) fetchResults();
    }, [query]);

    /*
    -------------------------------------------------------------------------------
      Purpose: Fetch and set data related to searched complaints based on keywords
      Postcondition: Updates state with fetched complaint-related data
    ------------------------------------------------------------------------------
    */
    const fetchResults = async () => {
      try {
          setLoading(true);
          const searchResults = await searchComplaints(query);
          setResults(searchResults);
      } catch (err) {
          console.error("Search error:", err);
      } finally {
          setLoading(false);
      }
  };

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
                    <ComplaintList 
                        complaints={results} 
                        title={`Search Results for "${query}"`}
                    />
                )}
            </div>
            <Footer />
        </>
    );
};

export default SearchComplaints;