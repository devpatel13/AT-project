import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Row, Col } from "antd";
import Item from "../components/item";
import { useDispatch } from "react-redux";
import "../resources/HomePage.css";

function HomePage() {
  const [itemsData, setItemsData] = useState([]);
  const [selectdCategory, setSelectedCategory] = useState("fruits");
  const dispatch = useDispatch();

  const categories = [
    {
      name: "Groceries",
      imageURL:
        "https://scikey-wowprod-mumbaisouth.s3.amazonaws.com/upload/photos/2021/04/bVIRie8KFeZJWJOsdhEj_08_74b3ab8014603c17b5f3d07dc3403ee2_image.jpg",
    },
    {
      name: "Eatables",
      imageURL:
        "https://okcredit-blog-images-prod.storage.googleapis.com/2022/01/namkeen2.jpg",
    },
    {
      name: "Dairy Products",
      imageURL:
        "https://domf5oio6qrcr.cloudfront.net/medialibrary/9685/iStock-544807136.jpg",
    },
  ];

  const getAllItems = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/items/get-all-items")
      .then((response) => {
        //console.log(response.data)
        dispatch({ type: "hideLoading" });
        setItemsData(response.data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };
  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <DefaultLayout>
      <div className="d-flex categories">
        {categories.map((category) => {
          return (
            <div
              onClick={() => setSelectedCategory(category.name)}
              className={`d-flex category ${
                selectdCategory === category.name && "selected-category"
              }`}
            >
              <h4>{category.name}</h4>
              <img src={category.imageURL} height="60" width="80" />
            </div>
          );
        })}
      </div>

      <Row gutter={20}>
        {itemsData
          .filter((i) => i.category === selectdCategory)
          .map((item) => {
            return (
              <Col xs={24} lg={6} md={12} sm={6}>
                <Item item={item} />
              </Col>
            );
          })}
      </Row>
    </DefaultLayout>
  );
}

export default HomePage;
