import {memo} from 'react';
import {FiCheck} from '@react-icons/all-files/fi/FiCheck';
import {ReactNodeElement} from '^types/global.type';

interface BooleanColumnProps {
    value: boolean;
    trueVal?: ReactNodeElement;
    falseVal?: ReactNodeElement;
}

export const BooleanColumn = memo((props: BooleanColumnProps) => {
    const {value, trueVal = <FiCheck />, falseVal = '-'} = props;

    return <span className="whitespace-nowrap">{value ? trueVal : falseVal}</span>;
});
