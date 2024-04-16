import {ReactComponentLike, ReactElementLike} from 'prop-types';
import {Fragment, MemoExoticComponent, NamedExoticComponent} from 'react';

export type ComponentLike = ReactElementLike | ReactComponentLike;

export const renderAll = (list: ComponentLike[]) => list.map(renderOne);

export function renderOne(Component: ComponentLike, i?: number) {
    if (typeof Component === 'function') {
        return <Component key={i} />;
    } else {
        return <Fragment key={i}>{Component}</Fragment>;
    }
}

export type PureComponent<Props> = (props: Props) => JSX.Element;
export type MemoizedComponent<Props> =
    | MemoExoticComponent<(props: Props) => JSX.Element>
    | NamedExoticComponent<(props: Props) => JSX.Element>;
export type ComponentType<Props> = PureComponent<Props> | MemoizedComponent<Props>;
