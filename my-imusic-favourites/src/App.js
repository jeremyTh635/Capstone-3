import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Search from "./components/Search";
import Favourites from "./components/Favourites";

function App() {
  const [favourites, setFavourites] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }
  })

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="search" element={<Search favourites={favourites} setFavourites={setFavourites}/>} />
        <Route path="favourites" element={<Favourites favourites={favourites} setFavourites={setFavourites}/>} />
      </Routes>
    </div>
  );
}

export default App;
