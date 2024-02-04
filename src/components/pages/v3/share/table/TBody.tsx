import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {Loading} from '^v3/share/Loading';

interface TBodyProps extends WithChildren {
    entries: any[];
    cols: number;
    isLoading?: boolean;
}

export const TBody = memo((props: TBodyProps) => {
    const {children} = props;

    return <tbody>{children}</tbody>;
});
TBody.displayName = 'TBody';
