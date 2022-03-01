import React from 'react'
import { connect } from 'react-redux'

import { loadFavorites, addFavorite, removeFavorite } from '../store/favortie.action.js'
import { favoriteService } from '../services/favorite.service.js'

import { SearchBar } from '../cmps/search-bar.jsx'
import { WeatherDisplay } from '../cmps/weather-display.jsx'



import { forecastService } from '../services/forecast.service.js'

export class _HomePage extends React.Component {

    state = {
        forecast: [],
        city: null
    }

    componentDidMount() {
        this.props.loadFavorites()
        this.submitSearch()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params !== this.props.match.params)
            this.submitSearch()
    }

    submitSearch = () => {
        const { cityId } = this.props.match.params
        console.log(this.props.match.params)
        if (!cityId) return this.setState({ forecast: [], city: null })
        return (async () => {
            console.log(cityId);
            const city = await forecastService.getByKey(cityId)

            console.log(city);
            const forecast = await forecastService.getForecast(city.Key)
            this.setState({ forecast, city }, () => { console.log(this.state) })
        })()
    }


    onAddFavorite = (ev) => {
        const { city } = this.state
        ev.preventDefault()

        if (this.props.favorites.some(favorite => favorite.Key === city.Key)) {
            city.isFavorite = false
            return this.props.removeFavorite(city)
        }else{

            city.isFavorite = true
            this.props.addFavorite(city)
        }
    }


    render() {
        const { forecast, city } = this.state
        const { favorites } = this.props
        return <section className="main-container">
            <SearchBar submitSearch={this.submitSearch} />
            {!!this.state.forecast.length &&
                <WeatherDisplay onAddFavorite={this.onAddFavorite} favorites={favorites} city={city} forecast={forecast} />
            }
        </section>
    }
}


function mapStateToProps(state) {
    return {
        favorites: state.favoriteModule.favorites
    }
}

const mapDispatchToProps = {
    loadFavorites,
    addFavorite,
    removeFavorite
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)