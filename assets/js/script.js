let savedCities = ['Saint John', 'Toronto', 'Calgary', 'Vancouver']; 

let selectedCity = `Saint John`; //this will be empty/undefined in the future

const elements = {
    cityButtonDiv: document.querySelector('#cityButtonDiv'),
    todayFCBody: document.querySelector('#todayFCBody'),
    fiveDayFCBody: document.querySelector('#fiveDayFC'),

};

let today = dayjs()

const todayFC = {
    weatherIcon: './assets/images/istockphoto-1269411565-612x612.jpg',
    temp: `30*C`,
    wind: '12kp/h',
    humidity: `72%`
}

//consolidate these objects and use the pop method every 24 hours to remove the passed day and then
//add a new day at the end?

//need to fetch proper data

const fiveDayFC = [
    dayOneFC = {
        weatherIcon: './assets/images/istockphoto-1269411565-612x612.jpg',
        temp: `30*C`,
        wind: '12kp/h',
        humidity: `72%`
    },
    dayTwoFC = {
        weatherIcon: './assets/images/istockphoto-1269411565-612x612.jpg',
        temp: `30*C`,
        wind: '12kp/h',
        humidity: `72%`
    },
    dayThreeFC = {
        weatherIcon: './assets/images/istockphoto-1269411565-612x612.jpg',
        temp: `30*C`,
        wind: '12kp/h',
        humidity: `72%`
    },
    dayFourFC = {
        weatherIcon: './assets/images/istockphoto-1269411565-612x612.jpg',
        temp: `30*C`,
        wind: '12kp/h',
        humidity: `72%`
    },
    dayFiveFC = {
        weatherIcon: './assets/images/istockphoto-1269411565-612x612.jpg',
        temp: `30*C`,
        wind: '12kp/h',
        humidity: `72%`
    },

];

const generateCityButtons = (city) => {
    for (let i=0; i < city.length; i++) {
       elements.cityButtons = `<button id="button${i}">${city[i]}</button>`
       elements.cityButtonDiv.insertAdjacentHTML('beforeend', elements.cityButtons)
    }
};

const generateTodayFC = () => {
    elements.todayFCText = 
    `<h1>${selectedCity}(${today.format('MM/DD/YYYY')})</h1>
    <img src="${todayFC.weatherIcon}">
    <p>${todayFC.temp}</p>
    <p>${todayFC.wind}</p>
    <p>${todayFC.humidity}</p>`;

    elements.todayFCBody.insertAdjacentHTML('beforeend', elements.todayFCText)
}

const generateFiveDayFC = () => {
    for (let i=0; i<fiveDayFC.length; i++) {
        elements.fiveDayFCText = 
        `<h1>${today.format('MM/DD/YYYY')}</h1>
        <img src="${todayFC.weatherIcon}">
        <p>${todayFC.temp}</p>
        <p>${todayFC.wind}</p>
        <p>${todayFC.humidity}</p>`;

        elements.fiveDayFCBody.insertAdjacentHTML('beforeend', elements.fiveDayFCText);
    }
}

generateCityButtons(savedCities);
generateTodayFC();
generateFiveDayFC();



// button select city -> pulls data from api today and days 1-5  ->
// carry current city forward and write data to forecast object