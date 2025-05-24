export function getLikeQueryString(fo: boolean, bo: boolean, value: string) {
    const val = value.trim();
    const emptyValue = !fo && !bo && !val.length;

    const _bo = emptyValue ? true : bo;
    const queryString = [fo ? '%' : '', val, _bo ? '%' : ''].filter((e) => e).join('');

    return encodeURIComponent(queryString); //.replace(/%/g, '%25');
}
