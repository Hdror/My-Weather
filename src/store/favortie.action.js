import { favoriteService } from '../services/favorite.service.js'


export function loadFavorites() {
    return (dispatch) => {
        favoriteService.query()
            .then(favorites => {
                const action = { type: 'SET_FAVORITES', favorites }
                dispatch(action)
            })

    }
}

export function removeFavorite(favorite) {
    console.log(favorite);
    const favoriteKey = favorite.Key
    favorite.isFavorite = false
    return (dispatch) => {
        favoriteService.remove(favorite)
            .then(() => {

                dispatch({ type: 'REMOVE_FAVORITE',favoriteKey })
            })
            .catch(err => {
                console.log('Can\'t delete favorite ', err)
            })
    }
}

export function addFavorite(favorite) {
    return (dispatch) => {
        favoriteService.save(favorite)
            .then(() => {
                dispatch({ type: 'ADD_FAVORITE',favorite })
            })
            .catch(err => {
                console.log('Can\'t add favorite ', err)
            })
    }
}