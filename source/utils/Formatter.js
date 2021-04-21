const genericMask = (value, pattern) => {
    const v = value.toString();

    if (v.length != (pattern.match(/#/g) || []).length) return false;
    let i = 0;

    return pattern.replace(/#/g, () => v[i++] || '');
}

module.exports = genericMask;
