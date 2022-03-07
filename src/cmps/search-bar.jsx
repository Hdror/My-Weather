import React from 'react'
import { useState, useRef, useCallback } from 'react'
import debounce from 'lodash.debounce'
import { Link } from 'react-router-dom'

import { forecastService } from '../services/forecast.service.js'

import searchSvg from '../assest/img/search.svg'

export const SearchBar = () => {

    const [searchBy, setSearchBy] = useState('')
    const [cities, setCities] = useState([])
    const isModalOpen = useRef(false)

    const onCitySelect = (city) => {
        setSearchBy(city)
        isModalOpen.current = false
    }

    const onSubmitSearch = () => {
        const searchBy = ''
        setSearchBy(searchBy)
    }

    const debounced = useCallback(debounce(searchBy => forecastService.getLocations(searchBy)
        .then(city => {
            const cities = city.slice(0,10)
            console.log('DEBOUNCED FUNCTION ACTIVATED')
            setCities(cities)
        }), 2000), [])

    const handleChange = (ev) => {
        ev.preventDefault()
        const value = ev.target.value
        setSearchBy({ ...searchBy, LocalizedName: value })
        if (value.length) {
            debounced(value)
            isModalOpen.current = true
        } else {
            isModalOpen.current = false
            setCities([])
        }
    }

    return <div className="search-bar">
        <div className="search-bar-container flex">
            <input type="text" value={searchBy.LocalizedName ? searchBy.LocalizedName : ''} autoComplete="off" name="cities" placeholder="Search for cities" onChange={handleChange} />
            {isModalOpen.current && !!cities.length && <div className="autocomplite-menu flex">
                <div className="modal-text">Search Suggestions</div>
                {cities.map(city => {
                    return <div className="option-container" key={city.Key}>
                        <div className="dropdown-option" onClick={() => { onCitySelect(city) }}>  {city.LocalizedName}- {city.Country.LocalizedName} </div>
                    </div>
                })}
            </div>}
            <Link onClick={onSubmitSearch} to={`/${searchBy.Key}`}>
                <div className="search-icon-container flex" >
                    <img className="search-icon" src={searchSvg} alt="" />
                </div>
            </Link>
        </div>
    </div>
}
