export interface ForecastDay {
  date: Date
  waterNeededLiters: number
  temperatureCelsius: number
  humidityPercent: number
  windSpeedKmh: number
  pumpingCost: number
}

export function generateMockForecast(
  baseWaterLiters: number,
  baseCost: number,
): ForecastDay[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const baseTemp = 28
  const baseHumidity = 55
  const baseWind = 12

  const variations = [
    { water: 1.0, temp: 0, humidity: 0, wind: 0, cost: 1.0 },
    { water: 1.08, temp: 2, humidity: -5, wind: 3, cost: 1.08 },
    { water: 0.95, temp: -1, humidity: 8, wind: -2, cost: 0.95 },
    { water: 1.12, temp: 3, humidity: -8, wind: 5, cost: 1.12 },
    { water: 0.90, temp: -3, humidity: 12, wind: -4, cost: 0.90 },
  ]

  return variations.map((v, i) => {
    const date = new Date(today)
    date.setDate(date.getDate() + i)

    return {
      date,
      waterNeededLiters: Math.round(baseWaterLiters * v.water),
      temperatureCelsius: baseTemp + v.temp,
      humidityPercent: baseHumidity + v.humidity,
      windSpeedKmh: baseWind + v.wind,
      pumpingCost: parseFloat((baseCost * v.cost).toFixed(2)),
    }
  })
}
