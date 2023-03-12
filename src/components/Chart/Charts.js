import React, { useEffect, useRef, useState } from "react"
import { fetchDailyData } from "../../api";
import styles from "./Chart.module.css";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);


export default function Charts ({selectedDate}){
    const [dailyData, setDailyData] = useState([]);
    const lineRef = useRef();
    let selectedData = {};

    console.log("Chart Component")
    if(lineRef?.current){
        lineRef.current = null;
    }

    useEffect(()=>{
        const fetch = async () =>{
            const dailyData = await fetchDailyData();
            setDailyData(dailyData);
        }

        fetch();
    },[]);


    if(selectedDate){
      const filteredData = dailyData.filter((data) => {
        return new Date(data.date).toDateString() === new Date(selectedDate).toDateString();
      });
      
      if(filteredData.length){
        selectedData = filteredData[0];
      }
    }

    const lineChart = (
      dailyData[0] ? (
        <Line
          data={
            {
            labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
            datasets: [
                {
                  data: dailyData.map((data) => data.confirmed),
                  label: 'Infected',
                  borderColor: '#3333ff',
                  fill: true,
                }, 
                {
                  data: dailyData.map((data) => data.deaths),
                  label: 'Deaths',
                  borderColor: 'red',
                  backgroundColor: 'rgba(255, 0, 0, 0.5)',
                  fill: true,
                }, 
                {
                  data: dailyData.map((data) => data.recovered),
                  label: 'Recovered',
                  borderColor: 'green',
                  backgroundColor: 'rgba(0, 255, 0, 0.5)',
                  fill: true,
                },
              ],
            }
          }
        />
      ) : null
    );

    const barChart = (
      selectedDate && selectedData ? (
        <Bar
            data={
              {
                labels : ['Infected', 'Recovered', 'Deaths'],
                datasets : [{
                  label :  "Covid 19 Info",
                  backgroundColor : ["rgba(0, 0, 255, 0.7)", "rgba(0, 255, 0, 0.7)", "rgba(255, 0, 0, 0.7)"],
                  data : [selectedData.confirmed, selectedData.confirmed - selectedData.deaths, selectedData.deaths]
                }]
              }
            }

            options={
              {
                legend : {display:false},
                title  : {display:true, text : `Current date in ${selectedDate}`}
              }
            }
        />
      ) : null
    );
  
    return (
      <>
        <div className={styles.container}>
            {lineChart}
        </div>
        <div className={styles.container}>
            {barChart}
        </div>
    
      </>
    )
        
}