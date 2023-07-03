let savedCities = ['Saint John', 'Toronto', 'Calgary', 'Vancouver','New York', 
'Atlanta', 'Nashville','Los Angeles','San Franciso','Las Vegas','Portland','Seattle']; 

let selectedCity = `Saint John`; //this will be empty/undefined in the future

const units = ['standard', 'metric', 'imperial']

let unit = 'metric'

/*|| API PULL ALGORITHMS */

const API_KEY = 'c89d2b6eee9a9d6d4a1f10cf7f0471c1'


const apiAlgo = async (selectedCity) => {

    const apiPull = async (url) => {
        const response = await fetch(url)
    
        if (!response.ok) {
            console.log(`error status:${response.status}`)
            return;
        }
        
        const data = await response.json();
        return data;
    
        /*switch (url) {
            case getFiveFC:
                data;
                break;
            case geoCodeCity:
                data = await response[2].JSON();
                break;
            default:
                console.log('ERROR API PULL')
        }
        */
    
       
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



(async () => {
    const Forecast = await apiAlgo(selectedCity);

    console.log(Forecast)

    const elements = {
        cityButtonDiv: document.querySelector('#cityButtonDiv'),
        todayFCBody: document.querySelector('#todayFCBody'),
        fiveDayFCBody: document.querySelector('#fiveDayFC'),
        cityTextArea: document.querySelector('#cityTextArea'),
    
    };
    
    let today = dayjs()
    
    const todayFC = Forecast[0]
    
    //consolidate these objects and use the pop method every 24 hours to remove the passed day and then
    //add a new day at the end?
    
    //need to fetch proper data
    
    const fiveDayFC = Forecast[1];
    
    const generateCityButtons = (city) => {
        for (let i=0; i < city.length; i++) {
           elements.cityButtons = `<button id="button${i}">${city[i]}</button>`
           elements.cityButtonDiv.insertAdjacentHTML('beforeend', elements.cityButtons)
        }
    };
    
    const generateTodayFC = () => {
        elements.todayFCText = 
            `<div class="cards" id='TodayFCDiv'>
                <h1>${selectedCity}(${today.format('MM/DD/YYYY')})</h1>
                <img class="weatherIcon" src="${todayFC.weather[0].icon}" alt='${todayFC.weather.main}'>
                <p>${todayFC.main.temp}C</p>
                <p>${todayFC.wind.speed}km/h</p>
                <p>${todayFC.main.humidity}%</p>
            </div>`;
    
        elements.todayFCBody.insertAdjacentHTML('beforeend', elements.todayFCText)
    }
    
    const generateFiveDayFC = () => {
        for (let i=0; i<fiveDayFC.length; i++) {
            elements.fiveDayFCText = 
                `<div class="cards">
                    <h1>${today.format('MM/DD/YYYY')}</h1>
                    <img class="weatherIcon" src="${fiveDayFC[i].weather[0].icon}" alt='${fiveDayFC[i].weather.main}'>
                    <p>${fiveDayFC[i].main.temp}C</p>
                    <p>${fiveDayFC[i].wind.speed}km/h</p>
                    <p>${fiveDayFC[i].main.humidity}%</p>
                </div>`;
    
            elements.fiveDayFCBody.insertAdjacentHTML('beforeend', elements.fiveDayFCText);
        }
    }

    elements.cityTextArea.value = selectedCity;

    selectedCity = elements.cityTextArea.value;

    // button select city -> pulls data from api today and days 1-5  ->
    // carry current city forward and write data to forecast object

    generateCityButtons(savedCities);
    generateTodayFC();
    generateFiveDayFC();
})();





