import React, {useState, useEffect} from 'react';
import './styles.css';
import axios from 'axios';
import logoImg from '../../assets/lgbt.png';

export default function Tempo(){
    // usuário aprovar o uso da location
  const [location, setLocation] = useState(false);
  // armazenar a chave da api
  const [weather, setWeather] = useState(false);
  // chamada da api
  let getWeather = async (lat, long)=>{
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
    console.log(res.data);
  }
  // rodar assim que o app for iniciado
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, []) 

  if(location===false){
    return(
      <div className="tempo-container">
          Você precisa habilitar a localização do navegador :/
      </div>
    );
  }else if(weather===false){
    return(
      <div className="tempo-container">
          Carregando clima...
      </div>
    );
  }else{
    return (
      <div className="tempo-container">
        <div className="content">
            <section>
              <h1>
                Previsão do Tempo
                <img src="https://img.icons8.com/clouds/100/000000/sun.png"/>
              </h1>
            </section>
            <section>
              <h3>
                {weather['name']}
                <img src="https://img.icons8.com/clouds/100/000000/map-marker.png" width="60px" height="60px"/>
              </h3>
              <br />
              <p>
                Temperatura atual: {weather['main']['temp']}°C
                <img src="https://img.icons8.com/dotty/80/000000/temperature.png" width="40px" height="40px"/>
              </p>
              <br />
              <p>
                Temperatura máxima: {weather['main']['temp_max']}°C
                <img src="https://img.icons8.com/office/40/000000/temperature.png"/>
              </p>
              <br />
              <p>
                Temperatura mínima: {weather['main']['temp_min']}°C
                <img src="https://img.icons8.com/ultraviolet/40/000000/temperature.png"/>
              </p>
              <br /><br />
              <p>
                Umidade: {weather['main']['humidity']}%
              </p>
            </section>
        </div>
      </div>
    );
  }
}