import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8081/search?searchTerm=${searchTerm}`);
      console.log(response);
      response.data.products.forEach((product, index) => {
        console.log(`Product ${index + 1} - Book Title: ${product.book_title}`);
      });
      // Update the state with search results
      setSearchResults(response.data.products);

      // Show the search results
      setShowResults(true);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleResultClick = (productId) => {
    // Handle the click on a search result (e.g., navigate to product details page)
    console.log(`Clicked on result with ID ${productId}`);
    navigate(`/detective/detail/${productId}`);
  };

  return (
    <div className="col-sm-3">
      <div className="search_box pull-right">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={() => setShowResults(true)}
          />
          <button type="submit">
            <i className="fa fa-search" />
          </button>
        </form>

        {/* Render the search results dropdown */}
        {showResults && (
          <div className="search-results-dropdown">
            {searchResults.map((result) => (
              <div
                key={result.book_id}
                onClick={() => handleResultClick(result.book_id)}
              >
                {/* <img className="img7" src={`http://localhost:8081/public/upload/${result.image_path}`} alt={result.name} /> */}
                <p>{result.book_title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
