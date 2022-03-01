import { storageService } from './async.storage.service.js'

const STORAGE_KEY = 'favoriteDB'

export const favoriteService = {
    query,
    getById,
    save,
    remove,
}

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(cityKey) {
    console.log(cityKey);
    if(!cityKey) return
    return storageService.get(STORAGE_KEY, cityKey)
}

function remove(city) {
    return storageService.remove(STORAGE_KEY, city.Key)
}

function save(favorite) {
    console.log(favorite);
    return storageService.post(STORAGE_KEY, favorite)
}


// export function loadTodos() {

//     return (dispatch, getState) => {
//         const { filterBy } = getState()
//         carService.query(filterBy)
//             .then(cars => {
//                 const action = { type: 'SET_CARS', cars };
//                 dispatch(action)
//             })
//     }
// }