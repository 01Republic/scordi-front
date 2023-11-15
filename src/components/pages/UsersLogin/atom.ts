import {atom} from 'recoil';

const localStorageEffect = (key: string) => {
    return ({setSelf, onSet}: any) => {
        const savedValue = localStorage.getItem(key);

        // setSelf : 연결된 atom의 값을 초기화 해주는 함수
        if (savedValue) {
            setSelf(JSON.parse(savedValue));
        }

        // onSet : 해당하는 atom의 값이 변경이 되었을 때 실행되는 함수
        onSet((newValue: string, isReset: boolean) => {
            isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
        });
    };
};

export const googleCodeAtom = atom<string | null>({
    key: 'googleCodeAtom',
    default: null,
    effects: [localStorageEffect('code')],
});
