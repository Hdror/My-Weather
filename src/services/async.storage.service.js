

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

function query(entityType, delay = 300) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(entities)
        }, delay)
    })
}

async function get(entityType, entityId) {
    const entities = await query(entityType)
    const en = entities.find(entity => entity.Key === entityId)
    return en
}

async function post(entityType, newEntity) {
    const entities = await query(entityType)
    entities.push(newEntity)
    _save(entityType, entities)
    return newEntity
}

async function put(entityType, updatedEntity) {
    const entities = await query(entityType)
    const idx = entities.findIndex(entity => entity.id === updatedEntity.id)
    entities.splice(idx, 1, updatedEntity)
    _save(entityType, entities)
    return updatedEntity
}

async function remove(entityType, entityId) {
    const entities = await query(entityType)
    const idx = entities.findIndex(entity => entity.Key === entityId)
    entities.splice(idx, 1)
    _save(entityType, entities)
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}
