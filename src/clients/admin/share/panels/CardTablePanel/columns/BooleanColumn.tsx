import {memo} from 'react';
import {ReactNodeLike} from 'prop-types';
import {FiCheck} from '@react-icons/all-files/fi/FiCheck';

interface BooleanColumnProps {
    value: boolean;
    trueVal?: ReactNodeLike;
    falseVal?: ReactNodeLike;
}

export const BooleanColumn = memo((props: BooleanColumnProps) => {
    const {value, trueVal = <FiCheck />, falseVal = '-'} = props;

    return <span className="whitespace-nowrap">{value ? trueVal : falseVal}</span>;
});
