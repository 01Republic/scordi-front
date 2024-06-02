import {getFinalSound} from '../util';
import {Formatter, toFormat} from './formatter';

export abstract class NounToBase {
    noun: string; // 명사: 단어 원본
    postpositionDic: {withFinalSound: string; withoutFinalSound: string};
    postposition: string; // 조사: 을/를 | 이/가
    constructor(noun: string) {
        this.noun = noun;
        const exist = this.finalSounds.length;
        this.postposition = exist ? this.postpositionDic.withFinalSound : this.postpositionDic.withoutFinalSound;
    }

    protected get finalSounds() {
        return getFinalSound(this.noun);
    }

    toString() {
        return this.toFormat('%w%s');
    }

    toFormat<R>(format: Formatter<R, {noun: string; postposition: string}> = '%w%s') {
        return toFormat(
            {
                noun: this.noun,
                postposition: this.postposition,
            },
            format,
        );
    }
}
