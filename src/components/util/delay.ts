export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * setTimeout Chaining
 * ---
 *
 * Inspired by [StackOverflow's answer](https://stackoverflow.com/a/62034951)
 *
 * To-be:
 *
 * ```
 *    timeoutChain(4000, [
 *      [5000, () => {
 *          setTitle('구성원 정보를 불러오고 있어요');
 *      }],
 *      [3000, () => {
 *          setTitle('구독 서비스를 불러오고 있어요');
 *      }],
 *      [2000, () => {
 *          setTitle('거의 다 가져왔어요');
 *          setDesc('조금만 기다려 주세요. 새로고침하면 처음부터 해야 해요!');
 *      }],
 *      [() => {
 *          setTitle('마지막으로 권한을 확인하고 있어요');
 *          setDesc('꼼꼼하게 확인하고 정리하는 중이에요!');
 *      }]
 *    ])
 * ```
 *
 * As-Is:
 *
 * ```
 *    setTimeout(() => {
 *      setTitle('구성원 정보를 불러오고 있어요');
 *
 *      setTimeout(() => {
 *        setTitle('구독 서비스를 불러오고 있어요');
 *
 *        setTimeout(() => {
 *          setTitle('거의 다 가져왔어요');
 *          setDesc('조금만 기다려 주세요. 새로고침하면 처음부터 해야 해요!');
 *
 *          setTimeout(() => {
 *            setTitle('마지막으로 권한을 확인하고 있어요');
 *            setDesc('꼼꼼하게 확인하고 정리하는 중이에요!');
 *          }, 2000);
 *
 *        }, 3000);
 *
 *      }, 5000);
 *
 *    }, 4000);
 *  ```
 */
export function timeoutChain(startTimeout: number, chains: ([number, () => any] | [() => any])[]) {
    let promise: Promise<any> = Promise.resolve();

    promise = promise.then(() => delay(startTimeout));

    for (const chain of chains) {
        const duration = typeof chain[0] === 'function' ? 0 : chain[0];
        const fn = (typeof chain[0] === 'number' ? chain[1] : chain[0])!;
        promise = promise.then(() => fn());
        promise = promise.then(() => delay(duration));
    }

    return promise;
}

export function timeoutChain2(startTimeout: number, chains: ([number, () => any] | [() => any])[]) {
    chains.forEach((chain) => {
        const sec = typeof chain[0] === 'function' ? 0 : chain[0];
        const fn = (typeof chain[0] === 'number' ? chain[1] : chain[0])!;
        setTimeout(() => fn(), sec * 1000);
    });
}

export function tChainStep(duration: number, cb: () => any): [number, () => any] {
    return [duration, cb];
}

export async function waitFor(func: () => boolean, interval = 1000, retry = 10) {
    let result = false;
    for (let i = 0; i < retry; i++) {
        await delay(interval);
        result = func();
        if (result) break;
    }
    return result;
}
