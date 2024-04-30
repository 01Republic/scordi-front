import {useEffect} from 'react';
import {atom, AtomOptions, RecoilState, SetterOrUpdater, useRecoilState} from 'recoil';
import {recoilPersist} from 'recoil-persist';
import useLocalStorage from 'use-local-storage';
import {ClassConstructor, plainToInstance} from 'class-transformer';

// type LocalStorageAtomOptions<T, I> = AtomOptions<T> & {
//     typeCasting?: () => ClassConstructor<I>;
// };
//
// export function localStorageAtom2<T, I = any>(options: LocalStorageAtomOptions<T, I>) {
//     const {key, typeCasting, ...res} = options;
//
//     const parse = typeCasting
//         ? (value: string) => {
//               console.log('value', value);
//               return plainToInstance(typeCasting(), JSON.parse(value));
//           }
//         : JSON.parse;
//     const {persistAtom} = recoilPersist({
//         key: `scordi_storage/${key}`,
//         converter: {stringify: JSON.stringify, parse},
//     });
//
//     return atom<T>({
//         key,
//         ...res,
//         effects: [persistAtom],
//     });
// }

type LocalStorageAtomOptions<T> = AtomOptions<T> & {
    default: T;
};

interface LocalStorageAtoms<T> {
    options: LocalStorageAtomOptions<T>;
    dataAtom: RecoilState<T>;
    storageDataLoadedAtom: RecoilState<boolean>;
    storageDataLoadedAtom2: RecoilState<boolean>;
}

export function localStorageAtoms<T>(options: LocalStorageAtomOptions<T>): LocalStorageAtoms<T> {
    const dataAtom = atom<T>(options);
    const storageDataLoadedAtom = atom({key: `storageDataLoadedAtom/${options.key}`, default: false});
    const storageDataLoadedAtom2 = atom({key: `storageDataLoadedAtom2/${options.key}`, default: false});

    return {
        options,
        dataAtom,
        storageDataLoadedAtom,
        storageDataLoadedAtom2,
    };
}

type Serializer<T> = (object: T | undefined) => string;
type Parser<T> = (val: string) => T | undefined;
type Options<T> = Partial<{
    serializer: Serializer<T>;
    parser: Parser<T>;
    logger: (error: any) => void;
    syncData: boolean;
}>;

export function useLocalStorageState<T, D>(
    atoms: LocalStorageAtoms<T>,
    DataClass: ClassConstructor<D>,
    options: Options<T> = {},
): [T, SetterOrUpdater<T>] {
    const {key, default: defaultValue} = atoms.options;
    options.parser ||= (value: string) => {
        const plain = JSON.parse(value || JSON.stringify(defaultValue)) as T;
        return plainToInstance(DataClass, plain) as unknown as T;
    };

    const [storageData, setStorageData] = useLocalStorage<T>(`scordi_storage/${key}`, defaultValue, options);
    const [storageDataLoaded, setStorageDataLoaded] = useRecoilState(atoms.storageDataLoadedAtom);
    const [storageDataLoaded2, setStorageDataLoaded2] = useRecoilState(atoms.storageDataLoadedAtom2);
    const [data, setData] = useRecoilState(atoms.dataAtom);
    const serialize = (v: any) => JSON.stringify(v);

    /**
     * Read
     */
    useEffect(() => {
        if (typeof window === 'undefined') return; // 웹페이지가 로딩이 완료되었고
        if (serialize(data) !== serialize(defaultValue)) return; // 아톰에 데이터가 없는 경우만

        setStorageDataLoaded((val) => {
            if (val) return val; // 스토리지 데이터 불러오기가 완료된 이후라면 이하 생략.
            setTimeout(() => {
                setData(storageData);
                setStorageDataLoaded2(true);
            }, 0);
            return true;
        });
    }, []);

    /**
     * Write
     */
    useEffect(() => {
        if (typeof window === 'undefined') return; // 웹페이지가 로딩이 완료되었고
        if (!storageDataLoaded || !storageDataLoaded2) return; // 스토리지 데이터 불러오기가 완료된 이후 이어야 함
        if (serialize(data) == serialize(storageData)) return; // 스토리지 데이터와 아톰 데이터가 서로 다른 경우만

        setStorageData((v) => {
            if (serialize(v || defaultValue) == serialize(data)) return v;
            return data;
        });
    }, [data, storageDataLoaded, storageDataLoaded2]);

    return [data, setData];
}
