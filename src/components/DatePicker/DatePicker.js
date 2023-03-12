import React, { useEffect, useState } from "react";
import styles from './DatePicker.module.css';


export default function DatePicker ({dateChangeHandler}){

    const [date, setDate] = useState(null);
    // const [error, setError] = useState(false);

    // useEffect(()=>{
    //     const fetch = async() =>{
    //         const countries = await fetchCountries();
    //         if(countries === 'error'){
    //             setError(true);
    //         }else{
    //             setContries(countries);
    //         }
    //     }

    //     fetch();
    // },[])

    

    return (
        <div className={styles.container}>
            
                <label>Please Select Date :</label>
                <input className="form-control" type="date" onChange={(e) => {
                    dateChangeHandler(e.target.value)
                    }
                }/>
            
            
            {/* <FormControl className={styles.formControl}>
                <NativeSelect>
                    <option value="global">Global</option>

                    {!error && countries.map((country) => 
                        <option>{country.Country}</option>
                    )}
                </NativeSelect>
            </FormControl> */}
        </div>
    )
}