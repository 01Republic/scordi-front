import {MemoExoticComponent} from 'react';

type Component<T> = (props: {value: T | string}) => JSX.Element;
export type ValueComponent<T> = Component<T> | MemoExoticComponent<Component<T>>;
