let units = "metric";

async function weather() {
    var city = document.getElementById("ct").value;
    var api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=eef75ea9262913ae8f44ce69b2d4a531&units=${units}`;
    
     console.log(api);
    try {
        var d = await fetch(api);
        var data = await d.json();
        
        console.log(data);

        if (data.cod !== 200) {
            document.getElementById("info").innerHTML = `Error: ${data.message}`;
            return;
        }

        // Display weather details
        // document.getElementById("info").innerHTML = `Weather in: ${data.name}`;
        document.getElementById("temp").innerHTML = `${Math.ceil(data.main.temp)}°C`;
        document.getElementById("hum").innerHTML = `${Math.ceil(data.main.humidity)}%`;
        document.getElementById("wind").innerHTML = `${Math.ceil(data.wind.speed)} Km/h`;
        document.getElementById("main").innerHTML = `${data.weather[0].main}`;
        document.getElementById("feels_like").innerHTML = `${data.main.feels_like}°C`;
        document.getElementById("pres").innerHTML = `${data.main.pressure} mb`;
        document.getElementById("max").innerHTML = `${data.main.temp_max}°C`;
        document.getElementById("min").innerHTML = `${data.main.temp_min}°C`;

        // Convert visibility from meters to kilometers
        let visi = data.visibility;
        var visibility = visi / 1000;
        document.getElementById("visibility").innerHTML = `${visibility} km`;

        // Weather icon
        let iconValue = data.weather[0].icon;
        var img = `https://openweathermap.org/img/wn/${iconValue}.png`;
        document.getElementById("img").innerHTML = `<img src="${img}" alt="Weather Icon">`;
        // console.log(img);

        // Convert timezone to UTC format
        let normalTimezone = convertTimezone(data.timezone);
        document.getElementById("time").innerHTML = `${normalTimezone}`;

        // Convert sunset timezone to UTC format
        let sunsetTimezone = convertTimezone(data.sys.sunset);
        document.getElementById("sunsettime").innerHTML = `${sunsetTimezone}`;

        // Convert sunrise timezone to UTC format
        let sunriseTimezone = convertTimezone(data.sys.sunrise);
        document.getElementById("sunrisetime").innerHTML = `${sunriseTimezone}`;

    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("info").innerHTML = "Error fetching weather data.";
    }
}

// Function to convert timezone offset (in seconds) to UTC format
function convertTimezone(seconds) {
    let hours = seconds / 3600; // Convert seconds to hours
    let sign = hours >= 0 ? "+" : "-"; // Determine sign
    let absHours = Math.floor(Math.abs(hours)); // Get absolute hours
    let minutes = (Math.abs(hours) - absHours) * 60; // Get minutes

    return `UTC${sign}${absHours}:${minutes === 0 ? "00" : minutes}`;
}

// Function to get local time based on timezone offset
function convertToLocalTime(timezoneOffset) {
    let utcTime = new Date(); // Get current UTC time
    let localTime = new Date(utcTime.getTime() + timezoneOffset * 1000); // Convert to local time
    return localTime.toLocaleString(); // Format and return local time
}
