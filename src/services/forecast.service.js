import { storageService } from '../services/async.storage.service.js'

const axios = require('axios')
const STORAGE_KEY = 'cityDB'
const API_KEY = 'CcGOORXohLrHO43WtXfyAeUEgQQVL6oa'

export const forecastService = {
  getLocations,
  getForecast,
  getByKey
}

async function getByKey(cityKey) {
  const locations = await storageService.query(STORAGE_KEY)
  return locations.find(city => city.Key === cityKey)
}

async function getLocations(text) {
  try {
    const locations = await storageService.query(STORAGE_KEY)

    let filteredLocations = locations.filter(location => {
      console.log(location)
      let inputCity = text.toUpperCase()
      let dataCity = location.LocalizedName.toUpperCase()
      if (dataCity.startsWith(inputCity)) return location
    })

    if (!filteredLocations.length) {
      console.log('API Call')
      const res = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${text}`)
      filteredLocations = res.data

      let locationsToSave = filteredLocations.concat(locations)
      locationsToSave = [...new Map(locationsToSave.map((item) => [item.LocalizedName, item])).values()]
      console.log(locationsToSave);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(locationsToSave))
    }
    return filteredLocations
  } catch (err) {
    console.log('Error getting location:', err);
  }
}

async function getForecast(locationKey) {
  try {
    console.log(locationKey);
    const res = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?metric=true&apikey=${API_KEY}`)
    const forecast = res.data
    return forecast.DailyForecasts
  } catch (err) {
    console.log('Error getting Location key');
  }
}