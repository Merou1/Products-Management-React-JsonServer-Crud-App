import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCheckCircle,
  faCircle,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { deleteProduct, getProducts, checkProduct } from "../app/app";
import { query } from "express";

const Products = () => {
  const [query, setQuery] = useState("");
  const [state, setState] = useState({
    products: [],
    currentPage: 1,
    pageSize: 4,
    keyword: "",
    totalPages: 0,
  });
  useEffect(() => {
    handleGetProducts(state.keyword, state.currentPage, state.pageSize);
  }, []);

  const handleGetProducts = (keyword, page, size) => {
    getProducts(keyword, page, size)
      .then((resp) => {
        const totalElements = 100;
        let totalPages = Math.floor(totalElements / size);
        if (totalElements % size !== 0) ++totalPages;
        setState({
          products: resp.data,
          keyword: keyword,
          currentPage: page,
          pageSize: size,
          totalPages: totalPages,
        });
      })
      .catch((e) => console.log(e));
  };
  const handleDeleteProduct = (product) => {
    deleteProduct(product)
      .then((resp) => {
        const newProducts = state.products.filter((p) => p.id != product.id);
        setState({ ...state, products: newProducts });
      })
      .catch((e) => console.log(e));
  };
  const handleCheckButton = (product) => {
    checkProduct(product)
      .then((resp) => {
        const newProducts = state.products.map((p) => {
          if (p.id == product.id) {
            p.checked = !p.checked;
          }
          return p;
        });
        setState({ ...state, products: newProducts });
      })
      .catch((e) => console.log(e));
  };
  const handleGoToPage = (page) => {
    handleGetProducts(state.keyword, page, state.pageSize);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setState({ ...state, keyword: query });
  };
  return (
    <div className="p-1 m-1">
      <div className="row">
        <div className="col-md6">
          <div className="card m-1">
            <div className="card-body">
              <form onSubmit={handleSearch} action="">
                <div className="row g-2">
                  <div className="col-auto">
                    <input
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                      }}
                      className="form-control"
                      type="text"
                    />
                  </div>
                  <div className="col-auto">
                    <button className="btn btn-success">
                      <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="card m-1">
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Checked</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {state.products.map((product) => {
                    return (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>
                          <button
                            onClick={() => handleCheckButton(product)}
                            className="btn btn-outline-success"
                          >
                            <FontAwesomeIcon
                              icon={
                                product.checked.toString() == "true"
                                  ? faCheckCircle
                                  : faCircle
                              }
                            ></FontAwesomeIcon>
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => handleDeleteProduct(product)}
                            className="btn btn-outline-danger"
                          >
                            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <ul className="nav nav-pills">
                {new Array(state.totalPages).fill(0).map((v, index) => {
                  return (
                    <li>
                      <button
                        onClick={() => handleGoToPage(index + 1)}
                        className={
                          index + 1 == state.currentPage
                            ? "btn btn-info ms-1"
                            : "btn btn-outline-info ms-1"
                        }
                      >
                        {index + 1}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
