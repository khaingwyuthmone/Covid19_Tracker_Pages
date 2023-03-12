import axios from "axios";

// const from = GetOneMonthAgoDate(new Date());
// const to   = GetToday(new Date());


const url = "https://api.covid19api.com/summary";
// const mmLastOneYearConfirmedUrl = `https://api.covid19api.com/country/myanmar/status/confirmed?from=${from}&to=${to}`;
// const mmLastOneYearDeathsUrl    = `https://api.covid19api.com/country/myanmar/status/deaths?from=${from}&to=${to}`;

export const fetchData =async () => {
    try{
        const {data} = await axios.get(url);
        const globalData = await data.Global;
        const modifiedData = {
            confirmed : globalData.TotalConfirmed,
            recovered : globalData.TotalRecovered,
            deaths    : globalData.TotalDeaths,
            lastUpdate : globalData.Date
        }
        return modifiedData;
        
    }catch(error){
        return "error";
    }
}

export const fetchDailyData = async () => {
    try {
      const { data } = await axios.get('https://api.covidtracking.com/v1/us/daily.json');
      data.sort((a,b) => {
        return new Date(a.dateChecked) - new Date(b.dateChecked);
      })
      return data.map(({ positive, recovered, death, dateChecked: date }) => ({ confirmed: positive, recovered, deaths: death, date }));
    } catch (error) {
      return error;
    }
};

export const fetchCountries = async() => {
    try{
        const {data} = await axios.get('https://api.covid19api.com/countries');
        return data;
    }catch(error){
        return "error";
    }
}

// export const fetchDailyData = async () => {
//     try{
//         const confirmedData = await axios.get(mmLastOneYearConfirmedUrl);
//         const confirmedModifiedData = confirmedData.data.map(value=>value.Cases);
        
//         const labels  = confirmedData.data.map(value=> new Date(value.Date).toDateString());
        
//         const deathData = await axios.get(mmLastOneYearDeathsUrl);
//         const deathModifiedData = deathData.data.map(value=>value.Cases);

//         const returnData = {
//             label              : labels,
//             dailyConfirmedData : confirmedModifiedData,
//             dailyDeathData     : deathModifiedData
//         }
//         return returnData;
        
//     }catch(error){
//         console.log(error)
//     }
// }

// function GetOneMonthAgoDate(date){
//     let oneMonthAgo = new Date(date.setMonth(date.getMonth()-1));
//     let year = oneMonthAgo.getFullYear();
//     let month = oneMonthAgo.getMonth()+1;
//     if(month < 10){
//         month = '0'+month;
//     }
//     let day  = oneMonthAgo.getDate();
//     return year+'-'+month+'-'+day;
// }

// function GetToday(date){
//     let year = date.getFullYear();
//     let month = date.getMonth()+1;
//     if(month < 10){
//         month = '0'+month;
//     }
//     let day  = date.getDate();
//     return year+'-'+month+'-'+day;
// }