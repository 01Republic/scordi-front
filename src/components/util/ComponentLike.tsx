import {ReactComponentLike, ReactElementLike} from 'prop-types';
import {Fragment} from 'react';

export type ComponentLike = ReactElementLike | ReactComponentLike;

export const renderAll = (list: ComponentLike[]) => list.map(renderOne);

export function renderOne(Component: ComponentLike, i?: number) {
    if (typeof Component === 'function') {
        return <Component key={i} />;
    } else {
        return <Fragment key={i}>{Component}</Fragment>;
    }
}
