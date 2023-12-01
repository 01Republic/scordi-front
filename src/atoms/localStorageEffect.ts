/**
 * 페이지 이동 시 atom 이 초기화되지 않도록 유지하는 역할을 수행합니다.
 * TODO 1. 필요에 따라 token 이 초기화될 수 있도록 수정 필요.
 * TODO 2. 타입 지정
 */
export const localStorageEffect = (key: string) => {
    return ({setSelf, onSet}: any) => {
        if (typeof window == 'undefined') return;

        const storage = window.localStorage;
        const savedValue = storage.getItem(key);

        // setSelf : 연결된 atom의 값을 초기화 해주는 함수
        if (savedValue) {
            setSelf(JSON.parse(savedValue));
        }

        // onSet : 해당하는 atom의 값이 변경이 되었을 때 실행되는 함수
        onSet((newValue: string, isReset: boolean) => {
            isReset ? storage.removeItem(key) : storage.setItem(key, JSON.stringify(newValue));
        });
    };
};
