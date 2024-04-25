import {atom} from 'recoil';
import {CodefParserDataDto} from './CodefParserFactory/CreateCodefParserDto';

export const serviceNameParamsAtom = atom({
    key: 'admin/codef-parser-factories/serviceNameParamsAtom',
    default: '',
});

export const currentCodefParserAtom = atom<CodefParserDataDto | null>({
    key: 'admin/codef-parser-factories/currentCodefParserAtom',
    default: null,
});
