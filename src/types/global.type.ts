import {FC, ReactElement, ReactNode} from 'react';
import {ReactElementLike, ReactNodeLike} from 'prop-types';

export interface WithChildren<Children = ReactNode> {
    children?: ReactNode | Children;
}

export type FCWithChildren = FC<WithChildren>;

export type ReactNodeElement = ReactNode | ReactElement;
export type ReactNodeElementLike = ReactNodeLike | ReactElementLike;
