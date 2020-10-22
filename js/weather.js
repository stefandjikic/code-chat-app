let gps = document.querySelector('.location');
let temperature = document.querySelector('.temp-value'); 
let climate = document.querySelector('.climate');
let tempIcon = document.getElementById('temp-icon');
let weatherBg = document.querySelector('.weather');

window.addEventListener('load', () => {
  let lon;
  let lat;
  const API_KEY = '6aa09af5145d411a95c21e710911e677';

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition( (position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api_call = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
      fetch(api_call)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        const {name} = data;
        const {feels_like} = data.main;
        const {id, main, icon} = data.weather[0];
        gps.textContent = name;
        climate.textContent = main;
        temperature.textContent = Math.round(feels_like-273);
        if(id<250){
          weatherBg.style.backgroundImage = "url('http://openweathermap.org/img/wn/11d.png')";
        } else if(id<350){
          weatherBg.style.backgroundImage  = url('http://openweathermap.org/img/wn/09d.png');
        } else if(id<550){
          weatherBg.style.backgroundImage  = "url('http://openweathermap.org/img/wn/10d.png')";
        } else if(id<650){
          weatherBg.style.backgroundImage  = "url('http://openweathermap.org/img/wn/13d.png')";
        } else if(id<750){
          weatherBg.style.backgroundImage  = "url('http://openweathermap.org/img/wn/50d.png')";
        } else if(id === 800) {
          weatherBg.style.backgroundImage  = "url('http://openweathermap.org/img/wn/01d.png')";
        } else if(id > 800) {
          weatherBg.style.backgroundImage  = "url('http://openweathermap.org/img/wn/02d.png')";
        }

        // console.log(weatherBg.style.backgroundImage)
      });
    });
  }
})