import {NounToBase} from './NounToBase';

export const noun = {
    asObject: (noun: string) => new NounObject(noun),
};

class NounObject extends NounToBase {
    postpositionDic = {
        withFinalSound: '을',
        withoutFinalSound: '를',
    };
}
