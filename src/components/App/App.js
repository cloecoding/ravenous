import "./App.css";
import React, { useState, useEffect } from "react";
import BusinessList from "../BusinessList/BusinessList";
import SearchBar from "../SearchBar/SearchBar";
import getSuggestions from "../../utils/yelp";

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [showMessage, setShowMessage] = useState(false); // unlock access
  const [noResults, setNoResults] = useState(false);     // nuevo estado

  const searchYelp = async (keyword, location, sort) => {
    try {
      const suggestions = await getSuggestions(keyword, location, sort);
      setBusinesses(Array.isArray(suggestions) ? suggestions : []);
      
      // si la API pide desbloquear cors-anywhere
      if (!suggestions) {
        setShowMessage(true);
      } else {
        setShowMessage(false);
      }

      // si la búsqueda devuelve array vacío
      if (Array.isArray(suggestions) && suggestions.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setBusinesses([]);
      setNoResults(true);
    }
  };

  // búsqueda inicial (demo)
  useEffect(() => {
    searchYelp("food", "US", "best_match");
  }, []);

  const handleUnlockAccess = () => {
    window.open("https://cors-anywhere.herokuapp.com/corsdemo", "_blank");
  };

  return (
    <div className="App">
      <header>
        <h1>Ravenous</h1>
      </header>
      <main>
        <SearchBar searchYelp={searchYelp} />

        {/* mensaje unlock access */}
        {showMessage && (
          <div className="message">
            <p>
              To use this app, you must temporarily unlock access to the demo.{" "}
              Click{" "}
              <span className="link" onClick={handleUnlockAccess}>
                here
              </span>{" "}
              to proceed.
            </p>
          </div>
        )}

        {/* mensaje no results */}
        {noResults && !showMessage && (
          <div className="message">
            <p>
              No encontramos resultados para tu búsqueda.  
              Prueba con otra palabra clave o cambia la ubicación.
            </p>
          </div>
        )}

        {/* lista de negocios */}
        <BusinessList businesses={businesses} />
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
