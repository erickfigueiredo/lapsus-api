const coordsHandler = (position) => {
    if (position.includes('POLYGON')) {
        return position.split('((')[1].replace('))', '').split(',');
    }

    return position.split('(')[1].replace(')', '').split(',');
}

module.exports = coordsHandler;
