// https://fakestoreapi.com/products
//  title, price, category, description and image

// https://fakestoreapi.com/products/categories

import React from "react";
import ReactPaginate from "react-paginate";

import {
  Container,
  Navbar,
  InputGroup,
  Form,
  FormControl,
  ButtonGroup,
  Button,
} from "react-bootstrap";

import ProductItem from "./components/ProductItem";

import { API } from "../../utils/api";

import "./index.scss";
import "./pagination.css";

export default class Product extends React.Component {
  state = {
    productList: [],
    filteredProductList: [],
    displayedProductList: [],
    categories: [],
    numberPerPage: 5,
    currentPage: 0,
  };

  categoryRef = React.createRef();
  searchContentRef = React.createRef();

  componentDidMount() {
    this.searchProductList();
    this.searchCategories();
  }

  async searchProductList() {
    const res = await API.get("/products");

    this.setState({
      productList: res.data,
      filteredProductList: res.data,
    });

    this.setDisplayedPage(this.state.currentPage);
  }

  async searchCategories() {
    const res = await API.get("/products/categories");

    this.setState({
      categories: res.data,
    });
  }

  filterByCategory(categoryName, productList) {
    if (categoryName === "all") {
      return productList;
    } else {
      let result = productList.filter(
        (product, index) => product.category === categoryName
      );
      return result;
    }
  }

  searchProduct = (keyword, productList) => {
    if (keyword.trim()) {
      const newList = productList.filter(
        (product, i) =>
          product.title.includes(keyword.trim()) ||
          product.description.includes(keyword.trim())
      );

      this.setState({
        filteredProductList: newList,
      });
    } else {
      this.setState({
        filteredProductList: productList,
      });
    }
  };

  async filter() {
    const category = this.categoryRef.current.value;
    const searchContent = this.searchContentRef.current.value;

    await this.searchProduct(
      searchContent,
      this.filterByCategory(category, this.state.productList)
    );

    await this.setState({
      currentPage: 0,
    });

    await this.setDisplayedPage(0);
  }

  async sortByPrice(order, productList) {
    const sortedList = productList.sort((a, b) => {
      if (order === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    await this.setState({
      currentPage: 0,
      filteredProductList: sortedList,
    });

    await this.setDisplayedPage(0);
  }

  handlePageClick = (data) => {
    this.setState({
      currentPage: data.selected,
    });
    this.setDisplayedPage(data.selected);
  };

  setDisplayedPage(page) {
    const numberPerPage = this.state.numberPerPage;
    const start = numberPerPage * page;
    const end = numberPerPage * page + numberPerPage;
    const result = this.state.filteredProductList.slice(start, end);

    this.setState({
      displayedProductList: result,
    });
  }

  renderCategories() {
    return this.state.categories.map((category, i) => (
      <option key={i}>{category}</option>
    ));
  }

  renderProductItem() {
    return this.state.displayedProductList.map((product, i) => (
      <ProductItem
        key={i}
        src={product.image}
        title={product.title}
        description={product.description}
        category={product.category}
        price={product.price}
      ></ProductItem>
    ));
  }

  render() {
    return (
      <div className="product">
        <Container>
          <Navbar className="bg-light justify-content-between">
            <Form className="productCategory" inline>
              <InputGroup>
                <Form.Control
                  ref={this.categoryRef}
                  onChange={() => this.filter()}
                  as="select"
                  defaultValue="all"
                >
                  <option>all</option>
                  {this.renderCategories()}
                </Form.Control>
              </InputGroup>
            </Form>
            <Form className="productSearch" inline>
              <FormControl
                ref={this.searchContentRef}
                type="text"
                placeholder="Search"
                className=" mr-sm-2"
              />
              <Button onClick={() => this.filter()}>Search</Button>
            </Form>
            <Form className="productOrder" inline>
              <ButtonGroup aria-label="Basic example">
                <Button
                  onClick={() => {
                    this.sortByPrice("asc", this.state.filteredProductList);
                  }}
                  variant="primary"
                >
                  asc
                </Button>
                <Button
                  onClick={() => {
                    this.sortByPrice("desc", this.state.filteredProductList);
                  }}
                  variant="primary"
                >
                  desc
                </Button>
              </ButtonGroup>
            </Form>
          </Navbar>

          {this.renderProductItem()}

          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={Math.ceil(
              this.state.filteredProductList.length / this.state.numberPerPage
            )}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            forcePage={this.state.currentPage}
          />
        </Container>
      </div>
    );
  }
}
