import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { removeFavorite } from '../store/favortie.action.js'

export class _FavoritePage extends React.Component {


    onRemoveFavorite = (city) => {
        city.isFavorite = false
        this.props.removeFavorite(city)
    }

    render() {

        return <section>
            {this.props.favorites.map(city => {
                return <div className="main-container" key={city.Key}>
                    <Link to={`/${city.Key}`}>
                        <h1>
                            {city.LocalizedName}
                        </h1>
                    </Link>
                    <button onClick={() => { this.onRemoveFavorite(city) }}>Remove from favorites</button>
                </div>
            })}
        </section>
    }
}



function mapStateToProps(state) {
    return {
        favorites: state.favoriteModule.favorites,
    }
}

const mapDispatchToProps = {
    removeFavorite
}

export const FavoritePage = connect(mapStateToProps, mapDispatchToProps)(_FavoritePage)