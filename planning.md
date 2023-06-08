## User Story

AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

## Acceptance Criteria

GIVEN a weather dashboard with form inputs

    WHEN I search for a city

        THEN I am presented with current and future conditions for that city and that city is added to the search history

    WHEN I view current weather conditions for that city

        THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed

    WHEN I view future weather conditions for that city

        THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

    WHEN I click on a city in the search history

        THEN I am again presented with current and future conditions for that city

## Mock up

<img src='assets\images\06-server-side-apis-homework-demo.png'>

## Planning

### Bones

    - Header (include search?)
    - Search (autocomplete?)
    - Selected cities as buttons (should be generated dynamically)
    - Current forecast
        - temps in F and C
        - Windspeed (very important in sj lol)
        - humidity
        - air quality widget? (topical)
        - dynamically updated rain chance?
    - 5 day forecast

## Styling

## Working product

    - dayJS pull date
    - API pull
        - shine, rain, cloudy etc... icons?
        - temps in F and C
        - Windspeed (very important in sj lol)
        - humidity
        - air quality widget? (topical)
            - box with colour changing based on quality?
        - dynamically updated rain chance?
    - search & autocomplete
    - select city and it appears as a button
    - dynamically updated current forecast & 5 day forecasts
        - current will be hardcoded?
        - 5 day dynamically created?
    - localsorage push and pull for selected cities


## Finalize style

## Comment Code

## Deploy