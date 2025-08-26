async function Fetch() {
    const city = document.getElementById("city_name").value;
    if (!city) {
        document.getElementById("output").textContent = "Please enter a city name";
        return;
    }

    const geoApi = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=1df30398a6ea601d70680d8e23ae894a`;
    try {
        const response = await fetch(geoApi);
        const data = await response.json();

        if (data.length > 0) {
            const lat = data[0].lat;
            const lon = data[0].lon;

            const mainApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1df30398a6ea601d70680d8e23ae894a&units=metric`;
            const response2 = await fetch(mainApi);
            const data2 = await response2.json();

            const temp = data2.main.temp;
            const feels = data2.main.feels_like;
            const desc = data2.weather[0].description;
            
 document.getElementById("output").innerHTML = `
          <div class="cards">
            <div class="card"><span>Latitude:</span> ${lat}</div>
            <div class="card"><span>Longitude:</span> ${lon}</div>
            <div class="card"><span>Temp:</span> ${temp}°C</div>
            <div class="card"><span>Feels Like:</span> ${feels}°C</div>
            <div class="card"><span>Condition:</span> ${desc}</div>
          </div>
        `;

            document.getElementById("output").textContent = 
                `Lat: ${lat}, Lon: ${lon}, ${desc}, Temp: ${temp}°C, Feels like: ${feels}°C`;
        } else {
            document.getElementById("output").textContent = "City not found";
        }
    } catch (error) {
        console.error("Error fetching city weather:", error);
        document.getElementById("output").textContent = "Something went wrong";
    }
}

function geoLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("output").textContent = "Geolocation not supported";
    }
}

async function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1df30398a6ea601d70680d8e23ae894a&units=metric`;
    try {
        const response = await fetch(api);
        const data = await response.json();

        const temp = data.main.temp;
        const feels = data.main.feels_like;
        const desc = data.weather[0].description;
 document.getElementById("output").innerHTML = `
          <div class="cards">
            <div class="card"><span>Latitude:</span> ${lat}</div><br>
            <div class="card"><span>Longitude:</span> ${lon}</div>
            <div class="card"><span>Temp:</span> ${temp}°C</div>
            <div class="card"><span>Feels Like:</span> ${feels}°C</div>
            <div class="card"><span>Condition:</span> ${desc}</div>
          </div>
        `;

        document.getElementById("output").textContent = 
            `Lat: ${lat}, Lon: ${lon}, ${desc}, Temp: ${temp}°C, Feels like: ${feels}°C`;
    } catch (error) {
        console.error("Error fetching location weather:", error);
        document.getElementById("output").textContent = "Could not fetch weather for current location";
    }
}

function showError(error) {
    let message = "Unknown error";
    switch(error.code) {
        case error.PERMISSION_DENIED:
            message = "User denied the request for Geolocation";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "Location information is unavailable";
            break;
        case error.TIMEOUT:
            message = "The request to get user location timed out";
            break;
    }
    document.getElementById("output").textContent = message;
}