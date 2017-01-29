
const dataStorageKey = "dataKey";

function getFromLocalStorage()
{
    let sotrageString = localStorage.getItem(dataStorageKey);

    return sotrageString;
}

function setLocalStorage(item)
{
    localStorage.setItem(dataStorageKey, item);

    return true;
}

function clearLocalStorage(){
    localStorage.clear();
}

module.exports = {
    get: getFromLocalStorage,
    set: setLocalStorage,
    clear: clearLocalStorage
}
