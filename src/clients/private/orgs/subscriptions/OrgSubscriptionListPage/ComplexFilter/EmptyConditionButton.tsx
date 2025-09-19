import {memo} from 'react';
import {Plus} from 'lucide-react';

interface Props {
    onClick?: () => any;
}

export const EmptyConditionButton = memo(function (props: Props) {
    const {onClick} = props;

    return (
        <div className="btn btn-sm !border-none hover:bg-gray-200 gap-1" onClick={onClick}>
            <Plus />
            <span>필터</span>
        </div>
    );
});
