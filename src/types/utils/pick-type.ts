import {Type} from './type.interface';

export function PickType<T, K extends keyof T>(
    classRef: Type<T>,
    keys: readonly K[],
): Type<Pick<T, (typeof keys)[number]>> {
    return classRef;
}
