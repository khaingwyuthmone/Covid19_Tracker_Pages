
import './App.css';
import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Charts';
import DatePicker from './components/DatePicker/DatePicker';
import { fetchData } from './api';
import styles from './App.module.css'
import { useEffect, useState } from 'react';
import image from './images/image.png';

function App() {
  const [summary,setSummary] = useState({});
  const [error, setError] = useState(false);
  const [selectedDate, setSelectedDate ] = useState(null);
  
  useEffect(() => {
    const fetch = async() => {
      const summaryData =  await fetchData();
      if(summaryData === "error"){
        setError(true);
      }else{
        setSummary(summaryData);
      }
    }

    fetch();
    
  },[]);

  const dateChangeHandler = (date) => {
    setSelectedDate(date);
  }

  
  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} alt="COVID-19" />
      {!error && <Cards data={summary}/>}
      <DatePicker dateChangeHandler={dateChangeHandler}/>
      <Chart selectedDate={selectedDate}/>
    </div>
  );
}

export default App; 
