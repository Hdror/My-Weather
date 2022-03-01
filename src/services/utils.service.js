
export const utilsService = {
    getDay,
    getDate
}

function getDay(timestamp) {
    var a = new Date(timestamp * 1000);
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var dayOfWeek = days[a.getDay()]
    return dayOfWeek
}

function getDate(timestamp) {
    var date = new Date(timestamp * 1000);
    const month = date.getMonth() + 1
    const day = date.getDay()
    const year = date.getFullYear()
    let dateToDisplay = `${(month < 10) ? '0' + month : month}/${(day < 10) ? '0' + day : day}/${year}`
    return dateToDisplay
}