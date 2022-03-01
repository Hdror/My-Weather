import React from "react";

import { utilsService } from "../services/utils.service.js"
import { removeFavorite, addFavorite } from "../store/favortie.action.js";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons'

export class WeatherDisplay extends React.Component {

    state = {
        forecast: this.props.forecast
    }


    onAddFavorite = () => {

    }

    isFavorite = (city) => {
      return  this.props.favorites.some(favorite => favorite.Key === city.Key)
    }

    render() {
        const { forecast } = this.state
        const { city } = this.props
        const heartIcon = (this.isFavorite(city)) ? fullHeart : emptyHeart
        return <div className="weather-display flex">
            <FontAwesomeIcon onClick={this.props.onAddFavorite} className="heart-icon" icon={heartIcon} />
            <div className="test">Yuval the city is {city.LocalizedName} </div>
            <div className="weather-display-container ">

                {forecast.map(dailyForecast => {
                    return <div className="forecast-card" key={dailyForecast.Date}>
                        <img src={`https://www.accuweather.com/images/weathericons/${dailyForecast.Day.Icon}.svg`} alt="" />
                        <div className="card-info">

                            <h3>{utilsService.getDay(dailyForecast.EpochDate)} {utilsService.getDate(dailyForecast.EpochDate)}</h3>
                        </div>
                    </div>
                })}
            </div>


        </div>
    }

}