let savedCities = ['Saint John', 'Toronto', 'Calgary', 'Vancouver'];

let selectedCity = `Saint John`

let elements = {
    cityButtonDiv: document.querySelector('#cityButtonDiv'),
    todayForecastBody: document.querySelector('#todayForecastBody')
};

let today = dayjs()

const todayForecast = {
    weatherIcon: './assets/images/istockphoto-1269411565-612x612.jpg',
    temp: `30*C`,
    wind: '12kp/h',
    humidity: `72%`
}

//consolidate these objects and use the pop method every 24 hours to remove the passed day and then
//add a new day at the end?

//need to fetch proper data

const fiveDayForecast = [
    dayOneForecast = {
        weatherIcon: './assets/images/istockphoto-1269411565-612x612.jpg',
        temp: `30*C`,
        wind: '12kp/h',
        humidity: `72%`
    },
    dayTwoForecast = {
        weatherIcon: './assets/images/istockphoto-1269411565-612x612.jpg',
        temp: `30*C`,
        wind: '12kp/h',
        humidity: `72%`
    },
    dayThreeForecast = {
        weatherIcon: './assets/images/istockphoto-1269411565-612x612.jpg',
        temp: `30*C`,
        wind: '12kp/h',
        humidity: `72%`
    },
    dayFourForecast = {
        weatherIcon: './assets/images/istockphoto-1269411565-612x612.jpg',
        temp: `30*C`,
        wind: '12kp/h',
        humidity: `72%`
    },
    dayFiveForecast = {
        weatherIcon: './assets/images/istockphoto-1269411565-612x612.jpg',
        temp: `30*C`,
        wind: '12kp/h',
        humidity: `72%`
    },

];

function generateCityButtons(city) {
    for (let i=0; i < city.length; i++) {
       elements.cityButtons = `<button id="button${i}">${city[i]}</button>`
       elements.cityButtonDiv.insertAdjacentHTML('beforeend', elements.cityButtons)
    }
};

function generateTodayForecast() {
    elements.todayForecastText = 
    `<h1>${selectedCity}(${today.format('MM/DD/YYYY')})</h1>
    <img src="${todayForecast.weatherIcon}">
    <p>${todayForecast.temp}</p>
    <p>${todayForecast.wind}</p>
    <p>${todayForecast.humidity}</p>`;

    elements.todayForecastBody.insertAdjacentHTML('beforeend', elements.todayForecastText)
}

function generateFiveDayForecast() {
    for (let i=0; i<fiveDayForecast.length; i++) {
        elements.todayForecastText = 
        `<h1>${today.format('MM/DD/YYYY')}</h1>
        <img src="${todayForecast.weatherIcon}">
        <p>${todayForecast.temp}</p>
        <p>${todayForecast.wind}</p>
        <p>${todayForecast.humidity}</p>`;
    }
}

generateCityButtons(savedCities);
generateTodayForecast()



