import type { WeatherProvider } from "../type";

export interface OpenMeteoSample {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_weather: CurrentWeather;
    hourly_units: HourlyUnits;
    hourly: Hourly;
}

export interface CurrentWeather {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    time: string;
}

export interface Hourly {
    time: string[];
    temperature_2m: number[];
}

export interface HourlyUnits {
    time: string;
    temperature_2m: string;
}


/**
 * Get weather data
 * Returns a function to fetch more data (+- 1 day)
 * 
 * @param latitude 
 * @param longitude 
 * @returns 
 */
export const getWeatherData: WeatherProvider<OpenMeteoSample> = async (latitude, longitude) => {
    let today = new Date()
    let yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
    let tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)

    let params = new URLSearchParams({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        hourly: [
            "temperature_2m",
            "weathercode"
        ].join(","),
        current_weather: "true",
        timezone: "auto",
        start_date: yesterday.toISOString().slice(0, 10),
        end_date: tomorrow.toISOString().slice(0, 10)
    })

    let resp = <OpenMeteoSample>await fetch(
        `https://api.open-meteo.com/v1/forecast?` + decodeURIComponent(params.toString())
    )
        .then(r => r.json())

    return {
        temperature: resp.current_weather.temperature,
        temperatureUnit: resp.hourly_units.temperature_2m,
        wmo: resp.current_weather.weathercode,
        extra: resp
    }
}

export default getWeatherData