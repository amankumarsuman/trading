import React, { useEffect, useState } from "react";
import "../TableGrid/TableGrid.scss";
import axios from "axios";

function TableGrid({price}) {
  const [dataList, setDataList] = useState({}); 

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentData = price[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        (prevIndex + 1) % price.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    axios
      .get(
        "https://dev-ai-prediction-backend.stockiworld.com/model1/forecast/tsla/",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("res", res?.data);
        setDataList(res?.data);
      })
      .catch((error) => {
        console.log("error_", error);
      });
  }, []);

  return (
    <div className="grid_wrapper">
      <div className="icon_box"></div>
      <div className="">
        <p>{currentData?.symbol}</p>
      </div>
      <div className="">
        <p className="small_head">Price</p>
        <p className="head">{currentData?.price}</p>
      </div>
      <div className="content_wrapper">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* {dataList?.items?.map((list, index) => {
            return (
              <p className="small_head">
                {list?.charAt(0)?.toUpperCase() +
                  (list !== undefined ? list?.slice(1) : "")}
              </p>
            );
          })} */}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {dataList?.values?.map((list, index) => {
            return <p className="head">{list.toFixed(2)}</p>;
          })}
        </div>
      </div>
      {/* <div className="content_wrapper">
        <p className="small_head">2 Day</p>
        <p className="head red_text">260.00</p>
      </div>
      <div className="content_wrapper">
        <p className="small_head">3 Day</p>
        <p className="head red_text">258.00</p>
      </div>
      <div className="content_wrapper">
        <p className="small_head">4 Day</p>
        <p className="head green_text">290.00</p>
      </div>
      <div className="content_wrapper">
        <p className="small_head">5 Day</p>
        <p className="head green_text">293.00</p>
      </div>
      <div className="content_wrapper">
        <p className="small_head">6 Day</p>
        <p className="head green_text">298.00</p>
      </div>
      <div className="content_wrapper">
        <p className="small_head">7 Day</p>
        <p className="head green_text">300.00</p>
      </div>
      <div className="content_wrapper">
        <p className="small_head">8 Day</p>
        <p className="head green_text">310.00</p>
      </div> */}
    </div>
  );
}

export default TableGrid;
