import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Search({ favourites, setFavourites }) {
  const [term, setTerm] = useState("");
  const [entity, setEntity] = useState("album");
  const [data, setData] = useState([]);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSearch = async () => {
    try {
      console.log(localStorage.getItem("token"))
      const response = await axios.get(`http://localhost:8000/search`, {
        params: { term, entity },
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      });
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
              <Form.Control
                ref={inputRef}
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
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
