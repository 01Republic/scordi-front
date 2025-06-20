import {atom} from 'recoil';
import {CodefCardParserDto} from '^models/_codef/CodefCardParser/type/CodefCardParser.dto';

export const codefCardParserAtom = atom<CodefCardParserDto | null>({
    key: 'codefCardParserAtom',
    default: null,
});
