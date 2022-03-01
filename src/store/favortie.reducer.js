const initialState = {
    favorites: [],
}

export function favoriteReducer(state = initialState, action) {

    let newState = state;

    switch (action.type) {
        case 'SET_FAVORITES':
            newState = { ...state, favorites: [...action.favorites] }
            break;
        case 'ADD_FAVORITE':
            newState = { ...state, favorites: [...state.favorites, action.favorite] }
            break;
        case 'REMOVE_FAVORITE':
            newState = { ...state, favorites: state.favorites.filter(favorite => favorite.Key !== action.favoriteKey) }
            console.log(action.favoriteId);
            break;
        case 'UPDATE_FAVORITE':
            newState = {
                ...state, favorites: state.favorites.map(currFavorite => {
                    return (currFavorite._id === action.favorite._id) ? action.favorite : currFavorite
                })
            }
            break;
        case 'SET_FILTER':
            newState = { ...state, filterBy: { ...action.filterBy } };
            break;
        default:
    }
    return newState;
}
