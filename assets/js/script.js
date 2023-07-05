const elements = {
    cityButtonDiv: document.querySelector('#cityButtonDiv'),
    citySearchText: document.querySelector('#citySearchText'),
    citySearchButton: cityTextArea.nextElementSibling,
    todayFCBody: document.querySelector('#todayFCBody'),
    fiveDayFCBody: document.querySelector('#fiveDayFC'),
    cityTextArea: document.querySelector('#cityTextArea'),

};

let savedCities = [];

elements.cityTextArea.value = 'Saint John';

let selectedCity =`${elements.cityTextArea.value}`;

const units = ['standard', 'metric', 'imperial']

let unit = 'metric'

/*|| City Select */

elements.citySearchButton.addEventListener('click', () => {
    event.preventDefault()

    selectedCity = elements.cityTextArea.value;

    let inSaved = savedCities.includes(selectedCity);

    if (!inSaved) {
        savedCities.push(selectedCity)
    };

    if (elements.todayFCText) {
        $('.cards').remove()
        $('.cityButton').remove()
    };
    
    generate(selectedCity);
});

/*|| API PULL ALGORITHMS */

const API_KEY = process.env.API_KEY


const apiAlgo = async (selectedCity) => {

    const apiPull = async (url) => {
        const response = await fetch(url)
    
        if (!response.ok) {
            console.log(`error status:${response.status}`)
            return;
        }
        
        const data = await response.json();
        return data;       
    };

    const geoCodeCity = `http://api.openweathermap.org/geo/1.0/direct?q=${selectedCity}&limit=1&appid=${API_KEY}`

    const  repsonseGeoCode = await apiPull(geoCodeCity)
    const dataGeoCode = await repsonseGeoCode;
    const lat = (dataGeoCode[0].lat);
    const lon = (dataGeoCode[0].lon);

    console.log(`lat ${lat} lon ${lon}`)

    const currentFcURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`

    const responseCurrentFC = await apiPull(currentFcURL)
    const datacurrentFC = await responseCurrentFC;

    console.log(datacurrentFC)

    const fiveFcURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
    
    const responseFiveFC = await apiPull(fiveFcURL)
    const dataFiveFC = await responseFiveFC;

    console.log(dataFiveFC)

    const Forecast = [
        current = datacurrentFC,
        fiveDay = [
            dataFiveFC.list[4],
            dataFiveFC.list[12],
            dataFiveFC.list[20],
            dataFiveFC.list[28],
            dataFiveFC.list[36],
        ]
    ]
    
    return Forecast

}

/*|| HTML GENERATION ALGORITHMS */
const generate = async (selectedCity) => {
    if (elements.todayFCText) {
        $('.cards').remove()
        $('.cityButton').remove()
    };

    const Forecast = await apiAlgo(selectedCity);

    console.log(Forecast)
    
    let today = dayjs()
    
    const todayFC = Forecast[0]
    
    //consolidate these objects and use the pop method every 24 hours to remove the passed day and then
    //add a new day at the end?
    
    //need to fetch proper data
    
    const fiveDayFC = Forecast[1];
    
    const generateCityButtons = (city) => {
        for (let i=0; i < city.length; i++) {
        elements.cityButtons = `<button class='cityButton' id="button">${city[i]}</button>`
        elements.cityButtonDiv.insertAdjacentHTML('beforeend', elements.cityButtons)
    };

    $('.cityButton').on('click', () => {
        event.preventDefault();

        console.log(event.target.innerHTML == selectedCity)

        _isSelected = event.target.innerHTML == selectedCity;

        if (!_isSelected) {
            elements.cityTextArea.value = event.target.innerHTML;
            selectedCity = elements.cityTextArea.value;
        
            if (elements.todayFCText) {
                $('.cards').remove()
                $('.cityButton').remove()
            };
            
            generate(selectedCity);
            return
        } else {
            return
        }
    });
}
    
    const generateTodayFC = () => {
        elements.todayFCText = 
            `<div class="cards" id='TodayFCDiv'>
                <h1>${selectedCity}(${today.format('MM/DD/YYYY')})</h1>
                <img class="weatherIcon" src="http://openweathermap.org/img/w/${todayFC.weather[0].icon}.png" alt='${todayFC.weather.main}'>
                <p>Temp: ${todayFC.main.temp}C</p>
                <p>Wind: ${todayFC.wind.speed}km/h</p>
                <p>Humidity: ${todayFC.main.humidity}%</p>
            </div>`;
    
        elements.todayFCBody.insertAdjacentHTML('beforeend', elements.todayFCText)
    }
    
    const generateFiveDayFC = () => {
        for (let i=0; i<fiveDayFC.length; i++) {

            let dt = fiveDayFC[i].dt;

            let day = dayjs(new Date(dt*1000))

            elements.fiveDayFCText = 
                `<div id='fiveDayFCcard'class="cards">
                    <h1>${day.format('MM/DD/YYYY')}</h1>
                    <img class="weatherIcon" src="http://openweathermap.org/img/w/${todayFC.weather[0].icon}.png" alt='${fiveDayFC[i].weather.main}'>
                    <p>Temp: ${fiveDayFC[i].main.temp}C</p>
                    <p>Wind: ${fiveDayFC[i].wind.speed}km/h</p>
                    <p>Humidity: ${fiveDayFC[i].main.humidity}%</p>
                </div>`;
    
            elements.fiveDayFCBody.insertAdjacentHTML('beforeend', elements.fiveDayFCText);
        }
    }

    // button select city -> pulls data from api today and days 1-5  ->
    // carry current city forward and write data to forecast object

    generateCityButtons(savedCities);
    generateTodayFC();
    generateFiveDayFC();
};


(() => {
    generate(selectedCity);
})();





