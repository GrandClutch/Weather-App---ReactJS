import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import searchIcon from '../assets/search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'


const Weather = () => {

    const API_KEY = "ENTER YOUR API KEY";

    const inputRef = useRef();

    const [weatherData, setweatherData] = useState(false);

    const allIcon = {
        "01d" : clear,
        "01n" : clear,
        "02d" : cloud,
        "02n" : cloud,
        "03d" : cloud,
        "03n" : cloud,
        "04d" : drizzle,
        "04n" : drizzle,
        "09d" : rain,
        "09n" : rain,
        "10d" : rain,
        "10n" : rain,
        "13d" : snow,
        "13n" : snow,
    }


    const search = async (city) => {
        if(city === ""){
            alert("Enter City Name!");
            return;
        }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.mesasge);
                return;
            }

            console.log(data);

            const icon = allIcon[data.weather[0].icon] || clear;

            setweatherData({
                humidity: data.main.humidity,
                wind: data.wind.speed,
                temp: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            })

        }catch (error){
            setweatherData(false);
            console.error("Error in fetching weather data!")
        }
    }

    useEffect(()=>{
        search("Phnom Penh")
    },[])

  return (
    <div className='weather'>
        <div className='searchBar'>
            <input ref={inputRef} type="text" placeholder='Search...' onKeyDown={(e) => {
                if(e.key === "Enter"){
                    search(inputRef.current.value);
                }
            }}/>
            <img src={searchIcon} alt="searchIcon" onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData ? <>
            
        <img src={weatherData.icon} alt="Clear" className='weatherIcon'/>
        <p className='temperature'>{weatherData.temp} °C</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidity} alt="Humidity" />
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind} alt="Wind" />
                <div>
                    <p>{weatherData.wind} km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
        </>:<></>}
    </div>
  )
}

export default Weather