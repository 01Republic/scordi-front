import {Type} from './type.interface';
import {PropertiesAccessor} from '^types/utils/properties-accessor';

export function PartialType<T>(classRef: Type<T>): Type<Partial<T>> {
    const PartialClass = PropertiesAccessor.copyClass(classRef);
    return PartialClass;
    // const ParentClass = classRef;
    // class PartialClass {}
    // PropertiesAccessor.copyPropertyDescriptors(ParentClass, PartialClass);
    // PropertiesAccessor.copyPropertyDescriptors(new ParentClass(), PartialClass.prototype);
    // return PartialClass;
}
