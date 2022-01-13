const reducer = (arr) => {
    return arr.filter(function (a) {
        return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
    }, Object.create(null));
}

module.exports = reducer;
