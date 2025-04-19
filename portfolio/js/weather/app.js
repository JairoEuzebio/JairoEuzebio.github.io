const capitalize = s =>
  typeof s === 'string' && s.length > 0 ? s[0].toUpperCase() + s.slice(1) : '';

async function populatetableRows() {
  try {
    const response = await fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=dublin,ie&units=metric&APPID=bc425ac2188d406c884f4fdd88b339f0'
    );

    if (!response.ok) {
      console.log('Error Status Code: ' + response.status);
      return;
    }

    const data = await response.json();
    console.log(data);

    let strTableRows = `
      <tr>
        <td><span>Summary</span></td>
        <td>${capitalize(data.weather[0].description)}</td>
      </tr>
      <tr>
        <td><span>Temperature</span></td>
        <td>${data.main.temp}°C</td>
      </tr>
      <tr>
        <td><span>Humidity</span></td>
        <td>${data.main.humidity} %</td>
      </tr>
      <tr>
        <td><span>Pressure</span></td>
        <td>${data.main.pressure} Pa</td>
      </tr>
    `;

    const tbody = document.querySelector("#table-weather-dublin tbody");
    if (tbody) {
      tbody.innerHTML = strTableRows;
    } else {
      console.error("Elemento <tbody> não encontrado.");
    }

  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}

function change_background() {
  let d = new Date();
  let n = d.getHours();
  const themeEl = document.querySelector(".theme-js");

  if (!themeEl) return;

  if (n >= 0 && n <= 6 || n > 23) {
    themeEl.style.backgroundImage = "url('assets/img/dublin-night.jpg')";
  } else {
    themeEl.style.backgroundImage = "url('assets/img/dublin-day.jpg')";
  }
}

change_background();
populatetableRows();