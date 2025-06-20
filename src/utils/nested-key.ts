/**
 * 경로형태의 키를 기준으로 구조화된 자료객체로 변환
 * ---
 *
 * ```
 * convertToNestedObject({
 *      'validity.notAfter': 1764309599,
 *      'validity.notBefore': 1730242860,
 *      'version': 3,
 * })
 *
 * => {
 *     validity: {
 *         notAfter: 1764309599,
 *         notBefore: 1730242860,
 *     },
 *     version: 3,
 * }
 * ```
 */
export const convertToNestedObject = (flatObj: Record<string, any>) => {
    const nestedObj: any = {};

    Object.keys(flatObj).forEach((key) => {
        const keys = key.split('.');
        let current = nestedObj;

        keys.forEach((k, index) => {
            if (index === keys.length - 1) {
                current[k] = flatObj[key];
            } else {
                current[k] = current[k] || {};
                current = current[k];
            }
        });
    });

    return nestedObj;
};
