// Weather codes (WMO) used by Open-Meteo -> icon + description
const CODES = {
  0: ["☀️", "Clear sky"], 1: ["🌤️", "Mostly clear"], 2: ["⛅", "Partly cloudy"], 3: ["☁️", "Overcast"],
  45: ["🌫️", "Fog"], 48: ["🌫️", "Fog"],
  51: ["🌦️", "Light drizzle"], 53: ["🌦️", "Drizzle"], 55: ["🌦️", "Heavy drizzle"],
  61: ["🌧️", "Light rain"], 63: ["🌧️", "Rain"], 65: ["🌧️", "Heavy rain"],
  71: ["🌨️", "Light snow"], 73: ["🌨️", "Snow"], 75: ["❄️", "Heavy snow"],
  80: ["🌦️", "Rain showers"], 81: ["🌧️", "Rain showers"], 82: ["⛈️", "Violent showers"],
  95: ["⛈️", "Thunderstorm"], 96: ["⛈️", "Thunderstorm with hail"], 99: ["⛈️", "Thunderstorm with hail"],
};

const form = document.getElementById("form");
const input = document.getElementById("city");
const statusEl = document.getElementById("status");
const result = document.getElementById("result");

function setStatus(text, isError) {
  statusEl.textContent = text;
  statusEl.className = isError ? "error" : "";
}

function info(code) {
  return CODES[code] || ["🌡️", "Unknown"];
}

// 1) city name -> latitude and longitude
async function findCity(name) {
  const url = "https://geocoding-api.open-meteo.com/v1/search?count=1&name=" + encodeURIComponent(name);
  const res = await fetch(url);
  if (!res.ok) throw new Error("Search failed");
  const data = await res.json();
  if (!data.results || data.results.length === 0) throw new Error("City not found");
  return data.results[0];
}

// 2) latitude and longitude -> weather
async function getWeather(lat, lon) {
  const url = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon +
    "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code" +
    "&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto";
  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather request failed");
  return res.json();
}

// 3) data -> page
function show(place, w) {
  const [icon, desc] = info(w.current.weather_code);
  document.getElementById("place").textContent = place.name + (place.country ? ", " + place.country : "");
  document.getElementById("icon").textContent = icon;
  document.getElementById("temp").textContent = Math.round(w.current.temperature_2m) + "°C";
  document.getElementById("desc").textContent = desc;
  document.getElementById("hum").textContent = w.current.relative_humidity_2m + "%";
  document.getElementById("wind").textContent = Math.round(w.current.wind_speed_10m) + " km/h";

  const days = document.getElementById("days");
  days.innerHTML = "";
  for (let i = 1; i < 6 && i < w.daily.time.length; i++) {
    const li = document.createElement("li");
    const name = new Date(w.daily.time[i] + "T12:00").toLocaleDateString("en", { weekday: "long" });
    li.innerHTML = '<span class="d"></span><span class="e"></span><span class="hi"></span><span class="lo"></span>';
    li.children[0].textContent = name;
    li.children[1].textContent = info(w.daily.weather_code[i])[0];
    li.children[2].textContent = Math.round(w.daily.temperature_2m_max[i]) + "°";
    li.children[3].textContent = Math.round(w.daily.temperature_2m_min[i]) + "°";
    days.appendChild(li);
  }
  result.hidden = false;
}

async function search(name) {
  setStatus("Loading...");
  try {
    const place = await findCity(name);
    const weather = await getWeather(place.latitude, place.longitude);
    show(place, weather);
    setStatus("");
    try { localStorage.setItem("weather-city", name); } catch (e) {}
  } catch (err) {
    result.hidden = true;
    setStatus(err.message === "City not found" ? "City not found. Try another name." : "Something went wrong. Check your connection.", true);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = input.value.trim();
  if (name) search(name);
});

// open with the last city (or Florence the first time)
let last = "Florence";
try { last = localStorage.getItem("weather-city") || last; } catch (e) {}
input.value = last;
search(last);
