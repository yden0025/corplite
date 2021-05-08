import React from "react";

import { Card } from "react-bootstrap";

import "./index.scss";

export default class ProductItem extends React.Component {
  render() {
    return (
      <div className="productItem">
        <Card>
          <Card.Img
            className="productImage"
            variant="top"
            src={this.props.src}
          />
          <Card.Body className="productContent">
            <Card.Title>{this.props.title}</Card.Title>
            <Card.Text>{this.props.category}</Card.Text>
            <Card.Text>{this.props.description}</Card.Text>
          </Card.Body>
          <Card.Footer className="productPrice">
            <span>{this.props.price}</span>
          </Card.Footer>
        </Card>

        {/* <Card>
          <Card.Img
            className="productImage"
            variant="top"
            src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
          />
          <Card.Body className="productContent">
            <Card.Title>
              Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops
            </Card.Title>
            <Card.Text>men's clothing</Card.Text>
            <Card.Text>
              Your perfect pack for everyday use and walks in the forest. Stash
              your laptop (up to 15 inches) in the padded sleeve, your everyday
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <span>109.95</span>
          </Card.Footer>
        </Card> */}
      </div>
    );
  }
}
