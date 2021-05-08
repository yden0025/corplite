// https://fakestoreapi.com/carts/user/1
// https://fakestoreapi.com/products/1

import React from "react";

import { Container, Accordion, Table, Card, Button } from "react-bootstrap";

import { API } from "../../utils/api";

import "./index.scss";

export default class Cart extends React.Component {
  state = {
    userId: 1,
    cartList: [],
    productList: [],
  };

  componentDidMount() {
    this.searchProductList();
  }

  async searchProductList() {
    const res = await API.get("/products");

    await this.setState({
      productList: res.data,
    });

    await this.searchCartList();
  }

  async searchCartList() {
    const res = await API.get(`/carts/user/${this.state.userId}`);

    const finalRes = await res.data.map((cart, i) => {
      return { ...cart, products: this.populateProducts(cart.products) };
    });

    await this.setState({
      cartList: finalRes,
    });
  }

  populateProducts(cartProducts) {
    return cartProducts.map((product, i) => {
      // console.log("product.productId", product.productId);
      // console.log("this.state.productList", this.state.productList);
      const productInfo = this.state.productList.filter(
        (p, j) => p.id === product.productId
      );
      //console.log("productInfo", productInfo);

      return { product: productInfo[0], quantity: product.quantity };
    });
  }

  renderCartItem() {
    return this.state.cartList.map((cart, i) => (
      <Accordion key={i}>
        <Card className="cartItem">
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey={cart.id}>
              {cart.date}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={cart.id}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>id</th>
                  <th>image</th>
                  <th>title</th>
                  <th>qty</th>
                </tr>
              </thead>
              <tbody>{this.renderCartProducts(cart.products)}</tbody>
            </Table>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    ));
  }

  renderCartProducts(cartProductList) {
    return cartProductList.map((product, i) => (
      <tr key={i}>
        <td>{product.product.id}</td>
        <td>
          <img alt="" src={product.product.image} />
        </td>
        <td>{product.product.title}</td>
        <td>{product.quantity}</td>
      </tr>
    ));
  }

  render() {
    return (
      <div className="cart">
        <Container>{this.renderCartItem()}</Container>
      </div>
    );
  }
}
