import {atom} from 'recoil';
import {EmailParserDto} from '^models/EmailParser/types';

export const emailParserAtom = atom<EmailParserDto | null>({
    key: 'emailParserAtom',
    default: null,
});
