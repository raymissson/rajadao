import React, {useState, useEffect} from 'react';
import './styles.css';
import axios from 'axios';
import logoImg from '../../assets/previsao.png';

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
                <img src={logoImg} alt="Lojas Bemol" />
            </section>
            <ul>
            <li>
              <img src="https://img.icons8.com/dotty/80/000000/temperature.png"/>
              Temperatura atual: {weather['main']['temp']}</li>
            <li>
              <img src="https://img.icons8.com/office/40/000000/temperature.png"/>
              Temperatura máxima: {weather['main']['temp_max']}</li>
            <li>
              <img src="https://img.icons8.com/ultraviolet/40/000000/temperature.png"/>
              Temperatura mínima: {weather['main']['temp_min']}</li>
            <li>Pressão: {weather['main']['pressure']}</li>
            <li>Umidade: {weather['main']['humidity']}</li>
            <li>Local: {weather['name']}</li>
            </ul>
        </div>
      </div>
    );
  }
}