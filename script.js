function updateWeather(weatherData) {
    const weatherIcon = document.getElementById("weather-icon");
    const weatherDescription = document.getElementById("weather-description");
    const weatherTemperature = document.getElementById("weather-temperature");
  
    const icon = "☀️"; 
    const description = weatherData.condition; 
    const temperature = `${weatherData.temperature}°C`; 
  
    weatherIcon.textContent = icon;
    weatherDescription.textContent = description;
    weatherTemperature.textContent = temperature;
  }
  
function getWeatherXMLHttpRequest() {
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;
  
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    xhr.onload = function() {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        updateWeather(response.current_weather);
      } else {
        console.error("error", xhr.statusText);
      }
    };
    xhr.send();
  }

  function getWeatherFetch() {
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;
  
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
      .then(response => {
        if (!response.ok) {
          throw new Error('error ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        updateWeather(data.current_weather);
      })
      .catch(error => console.error('error ', error));
  }

  async function getWeatherAsyncAwait() {
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;
  
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
      if (!response.ok) {
        throw new Error('error' + response.statusText);
      }
      const data = await response.json();
      updateWeather(data.current_weather);
    } catch (error) {
      console.error('error ', error);
    }
  }
  