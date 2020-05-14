import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';

function App() {
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

  if(location==false){
    return(
      <Fragment>
        Você precisa habilitar a localização do navegador :/
      </Fragment>
    );
  }else if(weather==false){
    return(
      <Fragment>
        Carregando o clima...
      </Fragment>
    );
  }else{
    return (
      <Fragment>
        <h3>Clima e suas coordenadas ({weather['weather'][0]['description']})</h3>
        <hr />
        <ul>
          <li>Temperatura atual: {weather['main']['temp']}</li>
          <li>Temperatura máxima: {weather['main']['temp_max']}</li>
          <li>Temperatura mínima: {weather['main']['temp_min']}</li>
          <li>Pressão: {weather['main']['pressure']}</li>
          <li>Umidade: {weather['main']['humidity']}</li>
          <li>Local: {weather['name']}</li>
        </ul>
      </Fragment>
    );
  }
}

export default App;
