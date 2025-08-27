import "./App.css";
import React, { useState, useEffect } from "react";
import BusinessList from "../BusinessList/BusinessList";
import SearchBar from "../SearchBar/SearchBar";
import getSuggestions from "../../utils/yelp";

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [showMessage, setShowMessage] = useState(false); // unlock access
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState(""); // 👈 nuevo

  const searchYelp = async (keyword, location, sort) => {
    try {
      const suggestions = await getSuggestions(keyword, location, sort);

      if (!suggestions) {
        setShowMessage(true); // unlock
        setNoResults(false);
        setError("");
        setBusinesses([]);
        return;
      }

      setShowMessage(false);

      if (Array.isArray(suggestions) && suggestions.length === 0) {
        setNoResults(true);
        setError("");
        setBusinesses([]);
      } else {
        setNoResults(false);
        setError("");
        setBusinesses(suggestions);
      }
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setError("❌ Ocurrió un error con la API (ej: ubicación inválida).");
      setBusinesses([]);
      setNoResults(false);
      setShowMessage(false);
    }
  };

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

        {/* unlock access */}
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

        {/* mensaje error */}
        {error && (
          <div className="message error">
            <p>{error}</p>
          </div>
        )}

        {/* mensaje no results */}
        {noResults && !error && !showMessage && (
          <div className="message">
            <p>
              No encontramos resultados para tu búsqueda.  
              Prueba con otra palabra clave o cambia la ubicación.
            </p>
          </div>
        )}

        <BusinessList businesses={businesses} />
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
