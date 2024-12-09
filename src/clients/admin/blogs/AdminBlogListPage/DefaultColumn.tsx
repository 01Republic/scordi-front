import {memo} from 'react';
import {ReactNodeElement} from '^types/global.type';

interface DefaultColumnProps {
    value: ReactNodeElement;
}

export const DefaultColumn = memo((props: DefaultColumnProps) => {
    const {value} = props;

    return <>{value}</>;
});
