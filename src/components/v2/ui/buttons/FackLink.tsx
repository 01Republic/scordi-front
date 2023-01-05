import {WithChildren} from '^types/global.type';
import React, {memo} from 'react';

type LinkProps = {
    href?: string | undefined;
    target?: string | undefined;
} & WithChildren;

export const FakeLink = memo((props: LinkProps) => {
    const {children} = props;
    return <>{children}</>;
});
