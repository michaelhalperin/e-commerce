import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "../style/body.module.css";
import { useHistory } from "react-router-dom";

const MainBody = ({ addProduct }) => {
  const url = "https://dummyjson.com/products";
  let [products, setProducts] = useState([]);
  const history = useHistory();

  const handleProducts = async () => {
    try {
      const { data } = await axios.get(url);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async (product) => {
    try {
      const token = localStorage.getItem("token");
      delete product.id
      delete product.discountPercentage;
      delete product.rating;
      delete product.stock;
      delete product.brand;
      delete product.category;
      delete product.thumbnail;
      const response = await axios.post(
        "http://localhost:3003/product",
        product,
        {
          headers: {
            "x-api-key": token,
          },
        }
      );
      const data = response.data;
      setProducts([data]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/login");
    } else {
      await axios
        .get("http://localhost:3003/users/myInfo", {
          headers: {
            "x-api-key": token,
          },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    handleProducts();
  }, []);

  const handleBtn = (item) => {
    addProduct(item);
    fetchProducts(item);
    checkToken();
    history.push("/list");
  };

  return (
    <div>
      <div className={style.container}>
        <h1 className={style._h1}>Products</h1>
        <ul className={style._ul}>
          {products.map((item) => (
            <li className={style._li} key={item.id}>
              <div style={{ display: "flex", margin: "25px" }}>
                <img
                  className={style._img}
                  src={item.images[0]}
                  alt="product"
                />
                <div style={{ display: "grid", margin: "auto" }}>
                  <p style={{ fontWeight: "bold" }}>{item.title}</p>
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    {item.price}$
                  </span>
                  <p style={{ fontSize: "15px", marginLeft: "5px" }}>
                    {item.description}
                  </p>
                </div>
              </div>
              <button
                className={style._btn}
                onClick={() => {
                  handleBtn(item);
                }}
              >
                Add To List
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainBody;
