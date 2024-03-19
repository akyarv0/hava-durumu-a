

const app = document.querySelector(".container");
const form = document.querySelector("form");
const input = document.querySelector("form input");



form.addEventListener("submit", async (e) => {
  e.preventDefault();


  if (!input.value.trim()) {
    alert("Input must be entered");
  } else {
    await getCity(input.value);
  }

  e.target.reset();
});
  




const getCity = async (cityName) => {
  const URL = "https://api.openweathermap.org/data/2.5/";
  const API_KEY = "45ce8bf0ed5487b4d6d54e83caf0a8e9";

  try {
    const res = await fetch(
      `${URL}weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=tr`
    );
    const data = await res.json();
    console.log(data);
    
    if (!res.ok) {
      throw new Error("Şehir bulunamadı.");
      
    }
    

    displayWeatherInfo(cityName, data); 

  } catch (error) {
    console.log(error);
    alert(error);
  }
};

const displayWeatherInfo = (cityName, data) => {
  const { main ,weather, wind } = data;
  const { temp, feels_like } = main;
  const { description } = weather[0];
  const { speed } = wind;
  
 
 

  const weatherInfo = `
    <h2>Weather Information for ${cityName.toUpperCase()}</h2>
    <p>Temperature: ${temp}°C</p>
    <p>Feels like: ${feels_like}°C</p>
    <p>Description: ${description}</p>
    <p>Wind speed: ${speed} m/s</p>
 
    

  `;

  const infoElement = document.querySelector(".info");
  infoElement.innerHTML = weatherInfo;

  infoElement.classList.remove("d-none");
};










