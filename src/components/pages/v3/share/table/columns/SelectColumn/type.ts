import {MemoExoticComponent} from 'react';

type Component<T, Props = any> = (props: {value: T | string} & Props) => JSX.Element;
export type ValueComponent<T, Props = any> = Component<T, Props> | MemoExoticComponent<Component<T, Props>>;
