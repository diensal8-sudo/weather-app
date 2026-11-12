# Weather App

A weather app built from scratch with **HTML, CSS and JavaScript**. No libraries, no frameworks, **no API key**: it uses the free [Open-Meteo](https://open-meteo.com) API.

> 🌦️ **Try it:** add your GitHub Pages link here (`https://your-name.github.io/weather-app/`)

Part of the *Feral Frame Studio* series: small projects built step by step.

## How to use it

- Type a city name and press **Enter** (or **Search**).
- You see the current temperature, the weather, humidity and wind, plus the next 5 days.
- If the city does not exist, or you are offline, the app shows a clear message.
- The app remembers your **last city** (localStorage).

## The files

| File | What it does |
|---|---|
| `index.html` | The search form and the places where the data is shown |
| `style.css` | The look: dark card, blue accents |
| `script.js` | The API calls and all the logic |

## The main ideas

**1. What is an API?** A web address that returns data instead of a page. We ask, the server answers in JSON.

**2. `fetch` and `async/await`.** `fetch(url)` asks the server. It takes time, so we use `await` to wait for the answer without freezing the page, inside an `async` function.

**3. Two calls.** First the *geocoding* API turns a city name into latitude and longitude. Then the *forecast* API gives the weather for that place.

**4. Weather codes.** The API sends a number (0 = clear sky, 61 = rain...). An object maps each code to an emoji and a description.

**5. Errors.** `try/catch` around the calls: city not found, no internet, server problem. The user always gets a message.

**6. Showing the data.** `show()` writes the values into the page with `textContent` (safe) and builds the 5-day list with `document.createElement`.

## Publish it for free (GitHub Pages)

1. Create a **public** repository on GitHub (for example `weather-app`).
2. Upload `index.html`, `style.css` and `script.js`.
3. **Settings → Pages**, choose branch `main` and folder `/ (root)`, press **Save**.
4. Wait a minute or two: your link appears.

## Make it yours

- Add a °C / °F button.
- Add a "Use my location" button with `navigator.geolocation`.
- Show hourly forecast, or change the colors by weather.

---

## In italiano

App meteo fatta da zero con **HTML, CSS e JavaScript**, senza librerie e **senza chiave API**: usa l'API gratuita Open-Meteo.

- Scrivi il nome di una città e premi Invio: vedi temperatura, meteo, umidità, vento e i prossimi 5 giorni.
- Se la città non esiste o sei offline, compare un messaggio chiaro.
- L'app ricorda l'ultima città (localStorage).

**Idee principali:** una API è un indirizzo web che restituisce dati; `fetch` con `async/await` aspetta la risposta; due chiamate (geocoding: città → coordinate, poi previsioni); un oggetto traduce i codici meteo in emoji; `try/catch` gestisce gli errori.

**Pubblicazione:** repository pubblico su GitHub, carica i 3 file, Settings → Pages, branch `main`.
