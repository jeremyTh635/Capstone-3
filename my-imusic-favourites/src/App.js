// Imports for app functionality
import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// Import component files
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Search from "./components/Search";
import Favourites from "./components/Favourites";

function App() {
  // Create props to pass to Search and Favourites components
  const [favourites, setFavourites] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }
  })

  // Render components in browser
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="search" element={<Search navigate={navigate} favourites={favourites} setFavourites={setFavourites}/>} />
        <Route path="favourites" element={<Favourites favourites={favourites} setFavourites={setFavourites}/>} />
      </Routes>
    </div>
  );
}

export default App;
