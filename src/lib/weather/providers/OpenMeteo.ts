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


const doRequest = async (latitude: number, longitude: number, extra: { [k: string]: string } = {}) => {
    let params = new URLSearchParams({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        hourly: [
            "temperature_2m",
            "weathercode"
        ].join(","),
        current_weather: "true",
        timezone: "auto",
        ...extra
    })

    return <OpenMeteoSample>await fetch(
        `https://api.open-meteo.com/v1/forecast?` + decodeURIComponent(params.toString())
    )
        .then(r => r.json())

}

/**
 * Get weather data
 * Returns a function to fetch more data (+- 1 day)
 * 
 * @param latitude 
 * @param longitude 
 * @returns 
 */
export const getWeatherData: WeatherProvider<() => Promise<OpenMeteoSample>> = async (latitude, longitude) => {
    const resp = await doRequest(latitude, longitude)

    return {
        temperature: resp.current_weather.temperature,
        wmo: resp.current_weather.weathercode,
        async extra() {
            let currentBin = new Date(resp.current_weather.time)
            let yesterday = new Date(currentBin.getTime() - 24 * 60 * 60 * 1000)
            let tomorrow = new Date(currentBin.getTime() + 24 * 60 * 60 * 1000)

            return doRequest(latitude, longitude, {
                start_date: yesterday.toISOString().slice(0, 10),
                end_date: tomorrow.toISOString().slice(0, 10)
            })
        }

    }
}

export default getWeatherData