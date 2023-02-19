import './App.css';
// import React, { Component } from 'react';
//import UilReact from '@iconscout/react-unicons/icons/uil-react'
import Topbuttons from './components/TopButtons';
import Inputs  from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';
//import { data } from 'autoprefixer';
//import { title } from 'process';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
     
    const [query,setQuery]=useState({q:"berlin"});
    const [units,setUnits]=useState("metric");
    const [weather,setWeather]=useState(null);

    useEffect(()=>{
        const fetchWeather= async () =>{

            const message= query.q? query.q : "Current Location";
            toast.info('Fetching weather for '+message);

             await getFormattedWeatherData({...query,units}).then(data => {

                toast.success(`Successfully Fetched Weather for ${data.name},${data.country}.`)

                setWeather(data);
                console.log(data);
             });
        };
        fetchWeather();

    },[query, units]);

    const formatbackground=()=>{
        if (!weather) return 'from-cyan-700 to-blue-700'
        const threshold=units === 'metric'? 30 : 60
        if(weather.temp<= threshold) return 'from-cyan-700 to-blue-700'
        return 'from-yellow-700 to-orange-700'
    };

    return ( 
        <div className={`mx-auto max-w-screen-md mt-1.5 py-2 px-32 bg-gradient-to-br
        h-fit shadow-xl shadow-gray-400 ${formatbackground()}`}>

            <Topbuttons setQuery={setQuery}/>
            <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>
            

            {weather && (
             <div>
                <TimeAndLocation weather={weather} />
                <TemperatureAndDetails weather={weather} />
    
                <Forecast title="hourly forecast" items={weather.hourly}/>
                <Forecast title="daily forecast" items={weather.daily}/>
             </div>
            )}

            <ToastContainer autoClose={3000} theme='colored' newestOnTop={true}/>
        </div>
        
    );
}

export default App;