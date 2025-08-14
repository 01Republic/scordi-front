import React, {memo} from 'react';
import {lpp} from '^utils/dateTime';
import {WithChildren} from '^types/global.type';

export const IdBadge = memo((props: WithChildren) => {
    const {children} = props;

    return <span className="badge badge-xs">{children}</span>;
});
