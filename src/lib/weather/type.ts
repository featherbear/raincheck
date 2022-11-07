export interface WeatherResult<T = null> {
    wmo: WMOCode
    temperature: number
    extra?: T
}

export type WeatherProvider<T = null> = (latitude: number, longitude: number) => Promise<WeatherResult<T>>

/**
 * https://open-meteo.com/en/docs
 */
enum WMOCode {
    CLEAR = 0,
    MAINLY_CLEAR = 1,
    PARTLY_CLOUDY = 2,
    OVERCAST = 3,
    FOG = 45,
    DEPOSITING_RIME_FOG = 48,
    LIGHT_DRIZZLE = 51,
    MODERATE_DRIZLE = 53,
    DENSE_DRIZZLE = 55,
    LIGHT_FREEZING_DRIZZLE = 56,
    DENSE_FREEZING_DRIZZLE = 57,
    SLIGHT_RAIN = 61,
    MODERATE_RAIN = 63,
    HEAVY_RAIN = 65,
    LIGHT_FREEZING_RAIN = 66,
    HEAVY_FREEZING_RAIN = 67,
    SLIGHT_SNOW = 71,
    MODERATE_SNOW = 73,
    HEAVY_SNOW = 75,
    SNOW_GRAINS = 77,
    SLIGHT_RAIN_SHOWER = 80,
    MODERATE_RAIN_SHOWER = 81,
    VIOLENT_RAIN_SHOWER = 82,
    SLIGHT_SNOW_SHOWER = 85,
    HEAVY_SNOW_SHOWER = 86,
    THUNDERSTORM = 95,
    THUNDERSTORM_SLIGHT_HAIL = 96,
    THUNDERSTORM_HEAVY_HAIL = 99
}


export default WMOCode