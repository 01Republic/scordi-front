import {Type} from './type.interface';
import {PropertiesAccessor} from '^types/utils/properties-accessor';

export function OmitType<T, K extends keyof T>(
    classRef: Type<T>,
    keys: readonly K[],
): Type<Omit<T, (typeof keys)[number]>> {
    const ParentClass = classRef;
    class PartialClass {}
    PropertiesAccessor.copyPropertyDescriptors(ParentClass, PartialClass);
    const instanceDescriptors = Object.getOwnPropertyDescriptors(new ParentClass());
    keys.forEach((key) => {
        delete instanceDescriptors[key];
    });
    Object.defineProperties(PartialClass.prototype, instanceDescriptors);
    return PartialClass as Type<Omit<T, (typeof keys)[number]>>;
}
