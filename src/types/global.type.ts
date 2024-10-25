import {FC, ReactElement, ReactNode} from 'react';
import {ReactElementLike, ReactNodeLike} from 'prop-types';

export interface WithChildren {
    children?: ReactNode;
}

export type FCWithChildren = FC<WithChildren>;

export type ReactNodeElement = ReactNode | ReactElement;
export type ReactNodeElementLike = ReactNodeLike | ReactElementLike;
