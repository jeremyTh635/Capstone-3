// Necessary imports for functionality of Home component
import React from "react";
import { useState } from "react";
import axios from "axios";
// Bootstrap imports to style component
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

// Declare function for Home component
function Home() {
  // State constants for modal login form
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

// Show/Hide modal login form
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


// Send login credentials and add token to local storage
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/login", {
        username: username,
        password: password
      })
      .then(function (response) {
        localStorage.setItem("token", response.data.token)
        console.log(response.status, response.data);
      })
      // Error handling if login unsuccessful
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Welcome</h1>
      <img src="images/notes.jpg" alt="music notes" width={600} />
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <p className="info">
            Welcome to the “My iMusic favourites” app. This app enables you to search the iMusic database for albums and other media by entering the names of your favourite artists in the search field and then build a list of favourites from the results. To use our search facility, you first need to log in. Click the 'Go to Login' button at the bottom of this age and a login form will pop up. Enter your username and password, click 'Submit' and you will be good to go. Currently, this project is still in beta so, if you want to test it out and give feedback, enter “user12” for the username and “uvw456” for the password and you will be able to access the rest of the app. Enjoy!
            </p>
            <Button variant="success" onClick={handleShow}>
              Go to Login
            </Button>
          </Col>
          <Col></Col>
        </Row>
        {/* Form to login user */}
      </Container>
      <Modal show={show} style={{color: "black"}} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form method="post" onSubmit={handleSubmit}>
              <Form.Label>Please enter your username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Form.Label>Please enter your password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button className="mainButton" id="loginButton" variant="secondary" type="submit" >Submit</Button>
            </Form>
            <Modal.Footer>
              <Button variant="dark" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Home;
