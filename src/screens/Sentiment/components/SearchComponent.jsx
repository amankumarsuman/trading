import React from "react";
import { CircularProgress, Grid, InputBase, Typography } from "@mui/material";
import TopCircleChart from "./TopCircleChart";
import { Usekey } from "../../../coreComponents/Keyboard";
import { useState } from "react";
import DoubleLayerCircle from "./DoubleLayerCircle";

const SearchComponent = (props) => {
  const topSearchData = props.searchData[0];
  const priceChange = parseFloat(topSearchData?.price_change || 0);
  const percentChange = parseFloat(topSearchData?.price_change_percentage || 0);
  const [fetchedSentimentData1, setFetchedSentimentData1] = useState([]);
  const [filteredData, setFilteredData] = useState({});
const [isLoading,setIsLoading]=useState(false)
const [search,setSearch]=useState("GEOS")
  const dataObj = {
    circleColour: priceChange > 0 ? "#00DE4C" : "#DE0000",
    bgColor: priceChange > 0 ? "#004B19" : "#4B0000",
  };

  
  const handleChange=(e)=>{
    setSearch(e.target.value?.toUpperCase())
  }

  const fetchSentimentData = async () => {
    try {
      console.log("Fetching daily heatmap data...");
      setIsLoading(true)
      const DailyStockResponse = await fetch(
       `https://dev-sentiment.stockiworld.com/daily-hot-list` //http://localhost:5000
      );
      console.log(
        "Response status for daily heatmap data:",
        DailyStockResponse
      );
      const data = await DailyStockResponse.json();
      if(data){
        
        setFetchedSentimentData1(data.data);
        const filteredItem=data?.data?.filter((el)=>el?.Symbol === search)
        setFilteredData(filteredItem)
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Error fetching daily heatmap data:", error);
    }
    setSearch("")
  };
  // console.log(fetchedSentimentData1,"fetchedSentimentData1")
  // console.log(filteredData,"filtereddata")
  // console.log(search,"search")

  Usekey("Enter", fetchSentimentData);
  Usekey("NumpadEnter", fetchSentimentData);


  return (
    <>
    {isLoading?
  <>
<CircularProgress />
  </>  :
  
    <Grid container spacing={2}>
      <Grid item md={10} xs={10} sm={12}>
        <InputBase
          fullWidth
          sx={{ backgroundColor: "white", borderRadius: "3px", px: 1 }}
          placeholder="Search"
          onChange={(e)=>handleChange(e)}
          value={search}
        />
      </Grid>
      <Grid container item md={12} sm={12}>
        <Grid item md={6} xs={6} sm={6} sx={{ textAlign: "center" }}>
          <img
            style={{ maxWidth: "80%", maxHeight: "80%" }}
            src="https://www.freepnglogos.com/uploads/tesla-logo-png-27.png"
            alt=""
          />
          <Typography variant="h6">{topSearchData?.Symbol}</Typography>
          <Typography sx={{ fontSize: "0.8rem" }}>
            ${filteredData[0]?.price}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.8rem",
              color: dataObj.circleColour,
            }}
          >
            {/* {`${priceChange.toFixed(2)} (${percentChange.toFixed(2)}%)`} */}
          </Typography>
        </Grid>
        <Grid item md={6} xs={6} sm={6}>
            <DoubleLayerCircle value={filteredData[0]?.sentiment}/>
          {/* <TopCircleChart item={dataObj} topSearchData={topSearchData} /> */}
        </Grid>
      </Grid>
    </Grid>
}
    </>
        
  );
};

export default SearchComponent;