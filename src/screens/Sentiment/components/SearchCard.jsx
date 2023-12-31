import React, { useState } from "react";
import { CircularProgress, Grid, InputBase, Typography } from "@mui/material";
import TopCircleChart from "./TopCircleChart";
import CustomCircularProgressbar from "./CircleWithPercentage";
import { Usekey } from "../../../coreComponents/Keyboard";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import DoubleLayerCircle from "./DoubleLayerCircle";

const SearchCard = (props) => {
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


    <Grid
      container
      spacing={2}
      sx={{
        
        textAlign: "center",
        margin: "auto",
        alignItems: "center",
      
      }}
      direction="column"
    >
      <Grid item md={10} xs={10} sm={12} sx={{ textAlign: "center" }}>
        <InputBase
          fullWidth
          sx={{ backgroundColor: "white", borderRadius: "3px", px: 1 }}
          placeholder="Search"
          onChange={(e)=>handleChange(e)}
          value={search}
          
          // inputProps={{ style: { textTransform: "uppercase" } }}
        />
      </Grid>

      <Grid item md={3} xs={3} sm={3} sx={{ textAlign: "center" }}>
        <img
          style={{ maxWidth: "30%", maxHeight: "30%", margin: "auto" }}
          src="https://www.freepnglogos.com/uploads/tesla-logo-png-27.png"
          alt=""
        />
        
        <Typography variant="h6">{filteredData[0]?.Symbol}</Typography>
        <Typography sx={{ fontSize: "0.8rem" }}>
            ${filteredData[0]?.price}
          </Typography>
          {/* <Typography
            sx={{
              fontSize: "0.8rem",
              color: dataObj.circleColour,
            }}
          >
            {`${priceChange.toFixed(2)} (${percentChange.toFixed(2)}%)`}
          </Typography> */}
        <Grid item md={3} xs={3} sm={3} sx={{marginLeft:"35%"}}>
          {/* <CustomCircularProgressbar percentage={20} /> */}
          {/* <DoubleLayerCircle value={`${filteredData[0]?.sentiment}`} /> */}

          {/* <CustomCircularProgressbar percentage={`${filteredData[0]?.sentiment}`} /> */}
         <DoubleLayerCircle/>

        </Grid>
      </Grid>
    </Grid>
  }
    </>
  );
};

export default SearchCard;
