import type { WeatherResult } from "./type";
import WMOCode from "./type";

// This is true AI

export function Question(weather: WeatherResult) {

    const isIt = {
        get cloudy() {
            switch (weather.wmo) {
                case WMOCode.MAINLY_CLEAR:
                    return "basically no"
                case WMOCode.PARTLY_CLOUDY:
                    return "kinda"
                default:
                    return "na"
            }
        },

        get raining() {
            switch (weather.wmo) {
                case WMOCode.LIGHT_DRIZZLE:
                case WMOCode.LIGHT_FREEZING_DRIZZLE:
                case WMOCode.DENSE_DRIZZLE:
                case WMOCode.DENSE_FREEZING_DRIZZLE:
                case WMOCode.SLIGHT_RAIN:
                case WMOCode.SLIGHT_RAIN_SHOWER:
                case WMOCode.LIGHT_FREEZING_RAIN:
                    return "ish"

                case WMOCode.MODERATE_RAIN:
                case WMOCode.MODERATE_RAIN_SHOWER:
                case WMOCode.HEAVY_RAIN:
                case WMOCode.HEAVY_FREEZING_RAIN:
                case WMOCode.VIOLENT_RAIN_SHOWER:
                    return "yup"

                default:
                    return "nope"
            }
        },

        get thundering() {
            switch (weather.wmo) {
                case WMOCode.THUNDERSTORM:
                case WMOCode.THUNDERSTORM_SLIGHT_HAIL:
                case WMOCode.THUNDERSTORM_HEAVY_HAIL:
                    return true
                default:
                    return false
            }
        }
    }

    return {
        isIt,
        shouldI: {
            get buyIt() {
                return "yes."
            },
            get goOutside() {
                if (isIt.raining == "yup") return "It do be wet"
                if (isIt.thundering) return "Nope. Thunder go brrr"
                if (weather.temperature < 20) return "It kinda cold tho"
                return "Yeah sure whatever"
            }
        },


    }
}
