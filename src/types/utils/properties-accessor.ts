import {Type} from '^types/utils/type.interface';
import 'reflect-metadata';

export class PropertiesAccessor {
    getClassProperties(prototype: Type<unknown>) {}

    static copyPropertyDescriptors(fromObj: unknown, toObj: unknown) {
        const descriptors = Object.getOwnPropertyDescriptors(fromObj);
        if (descriptors['prototype']) {
            delete descriptors['prototype'];
            // @ts-ignore
            if (fromObj['__proto__'] && toObj['__proto__']) toObj.__proto__ = fromObj.__proto__;
        }
        Object.defineProperties(toObj, descriptors);
    }

    static copyClass<T>(classRef: Type<T>) {
        const ParentClass = classRef;
        class PartialClass {}
        this.copyPropertyDescriptors(ParentClass, PartialClass);
        this.copyPropertyDescriptors(new ParentClass(), PartialClass.prototype);
        return PartialClass;
    }
}
