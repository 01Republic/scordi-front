export const uniq = <T>(iter: T[]): T[] => {
    return iter.filter((a, i) => iter.indexOf(a) === i);
};

// export const splitChunk = <T>(chunkSize: number, arr: T[]) => {
//     return [].concat.apply(
//         [],
//         arr.map((elem, i) => {
//             return i % chunkSize ? [] : [arr.slice(i, i + chunkSize)];
//         }),
//     );
// };

export const captures = (str: string, regex: RegExp) => {
    const [_, ...matches] = str.match(regex) || [];
    return matches;
};

export const reverseArr = <T>(arr: T[]) => arr.slice().reverse();
export const firstOf = <T>(arr: T[], n = 1) => arr.slice(0, n);
export const lastOf = <T>(arr: T[], n = 1) => firstOf(reverseArr(arr), n).reverse();

export const undef = <T>(d: T): T | undefined => d;

export const isDefinedValue = <T>(value: T | undefined | null): value is T => !!value;

export async function allSettled<T>(values: T[]) {
    return Promise.allSettled(values);
}

/**
 * 병렬 요청을 실행한 뒤, 응답의 결과를 성공과 실패로 분류해 반환합니다.
 *
 * 응답은 두 개의 원소를 가진 배열이며,
 * 첫 번째 원소에 성공한 요청의 응답 배열을,
 * 두 번째 원소에는 실패한 요청의 응답 배열을 반환합니다.
 */
export async function allSettledGroup<T>(values: T[]): Promise<[Awaited<T>[], PromiseRejectedResult[]]> {
    const fulfilled: Awaited<T>[] = [];
    const rejected: PromiseRejectedResult[] = [];
    await allSettled(values).then((result) => {
        result.forEach((item) => {
            item.status === 'fulfilled' ? fulfilled.push(item.value) : rejected.push(item);
        });
    });
    return [fulfilled, rejected];
}

/**
 * Promise 배열을 병렬로 처리하고 성공한 Promise 값들의 배열을 반환합니다.
 *
 * 실패한 요청은 무시하고 성공한 것만 따로 응답데이터를 받아서 처리해야 할 때 사용하기 좋습니다.
 * 실패한 요청을 따로 다룰 필요가 있다면 두 번째 인자에 콜백함수를 통해 처리할 수 있습니다.
 */
export async function allFulfilled<T>(
    values: T[],
    callback?: (rejected: PromiseRejectedResult[]) => PromiseLike<any>,
): Promise<Awaited<T>[]> {
    const [fulfilled, rejected] = await allSettledGroup(values);
    callback && (await callback(rejected));
    return fulfilled;
}

/**
 * Promise 배열을 병렬로 처리하고 실패한 Promise 결과만을 포함하는 배열을 반환합니다.
 *
 * 성공한 요청은 무시하고 실패된 것만 따로 다룰 필요가 있을 때 사용하면 좋습니다.
 * 성공한 요청을 따로 다룰 필요가 있다면 두 번째 인자에 콜백함수를 통해 처리할 수 있습니다.
 */
export async function allRejected<T>(
    values: T[],
    callback?: (fulfilled: Awaited<T>[]) => PromiseLike<any>,
): Promise<PromiseRejectedResult[]> {
    const [fulfilled, rejected] = await allSettledGroup(values);
    callback && (await callback(fulfilled));
    return rejected;
}
