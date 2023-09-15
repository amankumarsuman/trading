import React, { useEffect, useState } from 'react';
import './DoubleLayerCircle.css';

const DoubleLayerCircle = ({ sentiment="Sentiment", value }) => {
  // Determine the color based on the value
//   let colors = 'green';
  const [colors,setColors]=useState("red")

  
useEffect(()=>{
const percentages= parseFloat(value);

    if (percentages > 0 && percentages <= 50) {
      setColors('yellow');
    } else if (percentages > 50 && percentages <= 100) {
      setColors('green');
    }
},[value])


  // Calculate the percentage to fill the circle
  const percentage = (value / 100) * 100;

  return (
    <div className="circle-wrap">
    <div className="circle">
      
      <div className="mask full">
        <div className="fill"></div>
      </div>
     
      <div className="mask half">
        <div  className="fill"></div>
      </div>
      
      <div style={{background:colors}} className="inside-circle">
     
        {value}
      </div>
      
    </div>
    </div>
  );
};

export default DoubleLayerCircle;
