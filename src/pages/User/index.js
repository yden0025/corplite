// https://fakestoreapi.com/users/1

import React from "react";
import { connect } from "react-redux";
import { Container, Card, Button, Modal, Form, Col } from "react-bootstrap";
import { API } from "../../utils/api";
import "./index.scss";

const mapStateToProps = (state) => {
  return {
    userInfo: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

class User extends React.Component {
  state = {
    userId: 1,
    show: false,
  };

  componentDidMount() {
    this.searchUserInfo();
  }

  async searchUserInfo() {
    const { dispatch } = this.props;

    const res = await API.get(`/users/${this.state.userId}`);

    await dispatch({ type: "LOGIN", payload: res.data });
  }

  handleShow() {
    this.setState({
      show: true,
    });
  }

  handleClose() {
    this.setState({
      show: false,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const firstname = form.elements.firstname.value;
    const lastname = form.elements.lastname.value;
    const email = form.elements.email.value;
    const username = form.elements.username.value;
    const password = form.elements.password.value;
    const number = form.elements.number.value;
    const street = form.elements.street.value;
    const city = form.elements.city.value;
    const zipcode = form.elements.zipcode.value;

    const updatedUserInfo = {
      name: { firstname, lastname },
      email,
      username,
      password,
      address: { city, street, number, zipcode },
    };

    const { dispatch } = this.props;
    dispatch({ type: "UPDATE", payload: updatedUserInfo });

    // const updatedRes = await API.post(
    //   `/users/${this.state.userId}`,
    //   updatedUserInfo
    // );
    // console.log("updatedRes", updatedRes);
  };

  render() {
    const { userInfo } = this.props;
    const { user } = userInfo;
    const {
      name: { firstname, lastname },
      email,
      username,
      password,
      address: { city, street, number, zipcode },
    } = user;

    return (
      <div className="user">
        <Container>
          <Card>
            <Card.Header as="h5">{firstname + " " + lastname}</Card.Header>
            <Card.Body>
              <Card.Title>email</Card.Title>
              <Card.Text>{email}</Card.Text>
              <Card.Title>username</Card.Title>
              <Card.Text>{username}</Card.Text>
              <Card.Title>password</Card.Title>
              <Card.Text>{password}</Card.Text>
              <Card.Title>address</Card.Title>
              <Card.Text>
                {number + " " + street + ", " + city + ", " + zipcode}
              </Card.Text>
              <Button variant="primary" onClick={() => this.handleShow()}>
                Edit
              </Button>
            </Card.Body>
          </Card>

          <Modal show={this.state.show} onHide={() => this.handleClose()}>
            <Modal.Header closeButton>
              <Modal.Title>Edit profile</Modal.Title>
            </Modal.Header>

            <Form onSubmit={this.handleSubmit}>
              <Modal.Body>
                <Form.Row>
                  <Form.Group as={Col} controlId="firstname">
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control defaultValue={firstname} />
                  </Form.Group>

                  <Form.Group as={Col} controlId="lastname">
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control defaultValue={lastname} />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="email">
                    <Form.Label>email</Form.Label>
                    <Form.Control defaultValue={email} />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control defaultValue={username} />
                  </Form.Group>

                  <Form.Group as={Col} controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" defaultValue={password} />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group controlId="number">
                    <Form.Label>Number</Form.Label>
                    <Form.Control defaultValue={number} />
                  </Form.Group>

                  <Form.Group as={Col} controlId="street">
                    <Form.Label>Street</Form.Label>
                    <Form.Control defaultValue={street} />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control defaultValue={city} />
                  </Form.Group>

                  <Form.Group as={Col} controlId="zipcode">
                    <Form.Label>Zipcode</Form.Label>
                    <Form.Control defaultValue={zipcode} />
                  </Form.Group>
                </Form.Row>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={() => this.handleClose()}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => this.handleClose()}
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </Container>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
