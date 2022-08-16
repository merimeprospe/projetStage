export function removeItem(itemToRemove) {
    window.localStorage.removeItem(itemToRemove)
}

export function getItem(item) {
   return window.localStorage.getItem(item)
}

export function addItem(localestorageName, newitem) {
    window.localStorage.setItem(localestorageName, newitem)
}


