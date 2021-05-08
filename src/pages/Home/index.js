import React from "react";
import { Route } from "react-router-dom";

import "./index.scss";

import Product from "../Product";
import Cart from "../Cart";
import User from "../User";

import { Navbar, Nav } from "react-bootstrap";

export default class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="/">Corplite</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/product">Product</Nav.Link>
            <Nav.Link href="/user">User</Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
          </Nav>
        </Navbar>

        <Route exact path="/" component={Product} />
        <Route path="/product" component={Product} />
        <Route path="/cart" component={Cart} />
        <Route path="/user" component={User} />
      </div>
    );
  }
}
