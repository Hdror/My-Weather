

import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { forecastService } from '../services/forecast.service.js'

import searchSvg from '../assest/img/search.svg'

export class SearchBar extends React.Component {
    state = {
        searchBy: {},
        cities: [],
        isModalOpen: false
    }

    // const [city, setCity] = useState('')
    // const [citiesList, setCitiesList] = useState([])

    onCitySelect = (city) => {
        this.setState({ searchBy: city, isModalOpen: false })
    }

    onSubmitSearch = () => {
        // const { searchBy } = this.state
        // this.props.submitSearch()
        this.clearInput()
    }

    clearInput = () => {
        this.setState({ searchBy: { ...this.state.searchBy, LocalizedName: '' } })
    }

    handleChange = (ev) => {

        const value = ev.target.value
        this.setState({ searchBy: { ...this.state.searchBy, LocalizedName: value }, isModalOpen: true })

        forecastService.getLocations(value)
            .then(city => {
                this.setState({ cities: city })
            })
    }


    render() {
        const { cities, isModalOpen, searchBy } = this.state
        return <div className="search-bar">
            <div className="search-bar-container flex">
                <input type="text" value={searchBy.LocalizedName ? searchBy.LocalizedName : ''} autoComplete="off" name="cities" placeholder="Search for cities" onChange={this.handleChange} />
                {isModalOpen && <div className="autocomplite-menu flex">
                    <div className="modal-text">Search Suggestions</div>
                    {cities.map(city => {
                        return <div className="option-container" key={city.Key}>
                            <div className="dropdown-option" onClick={() => { this.onCitySelect(city) }}>  {city.LocalizedName} </div>
                        </div>
                    })}
                </div>}
                <Link onClick={this.onSubmitSearch} to={`/${searchBy.Key}`}>
                <div className="search-icon-container flex" >
                    <img className="search-icon" src={searchSvg} alt="" />
                </div>
                </Link>
            </div>
        </div>
    }
}