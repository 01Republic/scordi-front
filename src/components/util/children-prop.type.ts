import React from 'react';

export interface ChildrenProp {
    children?:
        | JSX.Element
        | JSX.Element[]
        | React.ReactChild
        | React.ReactChild[]
        | React.ReactNode
        | React.ReactNode[]
        | string
        | string[];
}
