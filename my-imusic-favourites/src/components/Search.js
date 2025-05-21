// Imports for component functionality
import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
// Imports for bootstrap styling
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Declare function with passed props
function Search({ favourites, setFavourites, navigate }) {
  // State variables for searching and receiving data
  const [musicArtist, setMusicArtist] = useState("");
  const [entity, setEntity] = useState("album");

  // Array to contain search results
  const [data, setData] = useState([]);

  const inputRef = useRef();

  // Focus text input on page loading
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Send params to backend to query api
  const handleSearch = async () => {
    try {
      console.log(localStorage.getItem("token"))
      const response = await axios.get(`http://localhost:8000/search`, {
        params: { musicArtist, entity },
        // Use token to protect search route from unauthorized users
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      });
      // Add response to array
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  return (
    <div>
      <h1>Search</h1>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <Form>
              <Form.Label style={{ textAlign: "left" }}>
                Enter name of artist here
              </Form.Label>
              {/* Input for artist name */}
              <Form.Control
                ref={inputRef}
                type="text"
                value={musicArtist}
                onChange={(e) => setMusicArtist(e.target.value)}
              />
              {/* Select for type of media */}
              <Form.Select
                className="select"
                onChange={(e) => setEntity(e.target.value)}
              >
                <option>Select media type</option>
                <option value="album">Album</option>
                <option value="track">Track</option>
                <option value="musicVideo">Music Video</option>
                <option value="ebook">ebook</option>
                <option value="mix">Mix</option>
              </Form.Select>
              <Button
                className="mainButton"
                variant="success"
                onClick={handleSearch}
              >
                Search
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      {/* Conditionally render search results */}
      <ul className="resultsList">
        {data.length > 0 ? (
          data.map((item) => (
            <li key={item.collectionId}>
              <img src={item.artworkUrl60} alt="album-artwork" width={60} />
              &nbsp;&nbsp;&nbsp;&nbsp;Artist: {item.artistName}
              &nbsp;&nbsp;|&nbsp;&nbsp;Album: {item.collectionName}
              &nbsp;&nbsp;|&nbsp;&nbsp;Release Date:{" "}
              {item.releaseDate.substring(0, 4)}&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                className="addRemove"
                variant="dark"
                size="sm"
                onClick={() => {
                  setFavourites([...favourites, item]);
                }}
              >
                Make Favourite
              </Button>
            </li>
          ))
        ) : (
          <p>Waiting for some data...</p>
        )}
      </ul>
    </div>
  );
}

export default Search;
