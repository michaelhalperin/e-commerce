import React, { useEffect, useState } from "react";
import "../index.css";
import style from "../style/body.module.css";
import axios from "axios";
import { Card, Button } from "react-bootstrap";

const ShoppingList = ({ sendProduct, setsendProduct }) => {
  let [title, setTitle] = useState("");
  let [price, setPrice] = useState("");
  let [images, setImages] = useState("");
  const [amount, setAmount] = useState("");
  let [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  const showProducts = async () => {
    try {
      const userData = await axios.get("http://localhost:3003/users/myInfo", {
        headers: {
          "x-api-key": token,
        },
      });

      const { data } = await axios.get("http://localhost:3003/product");
      const userProducts = data.filter(
        (product) => product.user_id === userData.data._id
      );
      setProducts(userProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleValues = async (e) => {
    e.preventDefault();
    const newProduct = {
      title: title,
      price: price,
      images: [images],
    };
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3003/product",
        newProduct,
        {
          headers: {
            "x-api-key": token,
          },
        }
      );
      const data = response.data;
      setProducts([...products, data]);
      console.log([...products, data]);
    } catch (error) {
      console.log(error);
    }
    setsendProduct([...sendProduct, newProduct]);
    console.log([...sendProduct, newProduct]);
    setTitle("");
    setPrice("");
    setImages("");
  };

  const deleteProduct = async (product) => {
    try {
      console.log(product);
      const { data } = await axios.delete(
        `http://localhost:3003/product/${product._id}`,
        {
          headers: {
            "x-api-key": token,
          },
        }
      );
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showProducts();
  }, []);

  return (
    <div>
      <form onSubmit={handleValues}>
        <input
          id="title_input"
          className="text_input"
          placeholder="title of the product"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          required
        />
        <input
          id="price_input"
          className="text_input"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          name="price"
          required
        />
        <input
          id="images_input"
          className="text_input"
          placeholder="images (url)"
          value={images}
          onChange={(e) => setImages(e.target.value)}
          name="images"
          required
        />
        <button id="button_submit" className="text_button" type="submit">
          submit
        </button>
      </form>
      <div id="form"></div>
      <div className="_container">
        {products.map((product) => {
          return (
            // <div key={product._id}>
            //   <ul className="text_card">
            //     <div className="card_container">
            //       <img
            //         style={{ width: "100px", marginBottom: "25px" }}
            //         // variant="top"
            //         src={product.images[0]}
            //       />
            //       <li>
            //         <h3 style={{ textAlign: "center" }}>
            //           {product.title}
            //         </h3>
            //         <p
            //           style={{
            //             textAlign: "center",
            //             color: "green",
            //             fontWeight: "bold",
            //           }}
            //         >
            //           {product.price}$
            //         </p>
            //         <p style={{ textAlign: "center" }}>
            //           {product.description}
            //         </p>
            <li className={style._li} key={product.id}>
              <div style={{ display: "flex", margin: "25px" }}>
                <img
                  className={style._img}
                  src={product.images[0]}
                  alt="product"
                />
                <div style={{ display: "grid", margin: "auto" }}>
                  <p style={{ fontWeight: "bold" }}>{product.title}</p>
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    {product.price}$
                  </span>
                  <p style={{ fontSize: "15px", marginLeft: "5px" }}>
                    {product.description}
                  </p>
                </div>
              </div>
              <Button
                className="delete_product"
                onClick={() => deleteProduct(product)}
              >
                delete
              </Button>
              <Button
                className="edit_product"
                id="edit"
                onClick={() => {
                  title = setTitle(product.title);
                  price = setPrice(product.price);
                  images = setImages(product.images[0]);
                  const submitButton = document.createElement("button");
                  let title_input = document.getElementById("title_input");
                  let price_input = document.getElementById("price_input");
                  let images_input = document.getElementById("images_input");
                  submitButton.innerText = "Submit Button";
                  submitButton.className = "submit_button";
                  submitButton.addEventListener("click", async () => {
                    try {
                      const newProduct = {
                        title: title_input.value,
                        price: price_input.value,
                        images: [images_input.value],
                      };
                      console.log(product);
                      console.log(newProduct);
                      const { data } = await axios.put(
                        `http://localhost:3003/product/${product._id}`,
                        newProduct,
                        {
                          headers: {
                            "x-api-key": token,
                          },
                        }
                      );
                      window.location.reload();
                      setProducts([...newProduct, data]);
                    } catch (error) {
                      console.log(error);
                    }
                  });
                  const button = document.getElementById("button_submit");
                  const form = document.getElementById("form");
                  button && form.appendChild(submitButton);
                  button && button.remove();
                }}
              >
                edit
              </Button>
              <input
                placeholder="0"
                onChange={(e) => setAmount(e.target.value)}
                className="number_input"
                type="number"
              />
            </li>
            // </div>
            // </ul>
            // </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShoppingList;
