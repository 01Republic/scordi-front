function recur(arr: number[], a: number, stop: number): number[] {
    if (a < stop) {
        arr.push(a);
        return recur(arr, a + 1, stop);
    } else {
        arr.push(stop);
        return arr;
    }
}

export function rangeToArr(from: number, to: number) {
    return recur([], from, to);
}
