/**
 * ps: promise shift
 * @desc Promise 비동기 함수가 실행 완료될 때 까지 await 하지 않고 별도 프로세스로 미뤄두고 넘어갑니다.
 * 기능적으로 하는 일은 없지만, Promise 를 스코프에서 await 하지 않겠다는 의도를 명시적으로 밝혀두기 위하여 사용합니다.
 */
export const ps = (fn: Promise<any>) => {
    (() => fn)();
};
