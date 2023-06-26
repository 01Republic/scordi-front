import {memo} from 'react';
import {ReactNodeLike} from 'prop-types';

interface DefaultColumnProps {
    value: ReactNodeLike;
}

export const DefaultColumn = memo((props: DefaultColumnProps) => {
    const {value} = props;

    return <>{value}</>;
});
