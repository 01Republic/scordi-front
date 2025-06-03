import {Transform, TransformFnParams} from 'class-transformer';
import {applyPropertyDecorators} from './applyPropertyDecorators';

export function Renamed(key: string, transformFn?: (params: TransformFnParams) => any): PropertyDecorator {
    const decorators: PropertyDecorator[] = [Transform(({obj}) => obj[key])];

    if (transformFn) {
        decorators.push(
            Transform(({...params}) => {
                params.value = params.obj[key];
                return transformFn(params);
            }),
        );
    }

    return applyPropertyDecorators(...decorators.reverse());
}
