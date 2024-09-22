import {Type} from '^types/utils/type.interface';
import {PropertiesAccessor} from '^types/utils/properties-accessor';

export function MixinType<T, M>(BaseCls: Type<T>, MixinCls: Type<M>): Type<T & M> {
    // @ts-ignore
    const NewClass = class extends BaseCls {};
    PropertiesAccessor.copyPropertyDescriptors(MixinCls, NewClass);
    PropertiesAccessor.copyPropertyDescriptors(new MixinCls(), NewClass.prototype);
    // @ts-ignore
    return NewClass;
}

// export const Mixin = <M>(classRef: Type<M>) => {
//     return <T>(constructor: Type<T>): Type<T & M> => {
//         return MixinType(constructor, classRef);
//     };
// };
