import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle as fullCircle } from '@fortawesome/free-solid-svg-icons'
import { faCircleMinus as emptyCircle } from '@fortawesome/free-regular-svg-icons'

import { removeFavorite, loadFavorites } from '../store/favortie.action.js'

export class _FavoritePage extends React.Component {

    componentDidMount() {
        if (!this.props.favorites.length) {
            this.props.loadFavorites()
            console.log('loading');
        }
    }

    onRemoveFavorite = (city) => {
        city.isFavorite = false
        this.props.removeFavorite(city)
    }

    render() {

        return <main className="favorite-page main-container">
            <div className="favorites-container ">
                <h1>Your favorites</h1>
                <div className="favorite-list">
                    {this.props.favorites.map(city => {
                        return <Link key={city.Key} className="clean-link" to={`/${city.Key}`}>
                            <div className="favorite-card flex" >
                                <p>{city.LocalizedName}, <span>{city.Country.LocalizedName}</span></p>
                                <FontAwesomeIcon title="Remove" onClick={(ev) => { ev.preventDefault(); this.onRemoveFavorite(city) }} icon={fullCircle} />
                            </div>
                        </Link>
                    })}
                </div>
            </div>
        </main>
    }
}



function mapStateToProps(state) {
    return {
        favorites: state.favoriteModule.favorites,
    }
}

const mapDispatchToProps = {
    removeFavorite,
    loadFavorites
}

export const FavoritePage = connect(mapStateToProps, mapDispatchToProps)(_FavoritePage)