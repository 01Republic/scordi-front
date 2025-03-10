import {memo} from 'react';
import {ReactNodeElement} from '^types/global.type';
import {Check} from 'lucide-react';

interface BooleanColumnProps {
    value: boolean;
    trueVal?: ReactNodeElement;
    falseVal?: ReactNodeElement;
}

export const BooleanColumn = memo((props: BooleanColumnProps) => {
    const {value, trueVal = <Check />, falseVal = '-'} = props;

    return <span className="whitespace-nowrap">{value ? trueVal : falseVal}</span>;
});
