export function getLikeQueryString(fo: boolean, bo: boolean, value: string) {
    const emptyValue = !fo && !bo && !value.trim().length;

    const _bo = emptyValue ? true : bo;
    const queryString = [fo ? '%' : '', value, _bo ? '%' : ''].join('');

    return encodeURIComponent(queryString); //.replace(/%/g, '%25');
}
