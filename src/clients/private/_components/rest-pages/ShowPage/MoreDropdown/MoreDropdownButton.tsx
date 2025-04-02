import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {MoreHorizontal} from 'lucide-react';

interface MoreDropdownButtonProps extends WithChildren {
    className?: string;
}

export const MoreDropdownButton = memo((props: MoreDropdownButtonProps) => {
    const {className = '', children} = props;

    return (
        <button
            tabIndex={0}
            className={`btn ${
                className || 'btn-square'
            } !bg-white border border-slate-300 rounded-md hover:border-slate-400 hover:shadow transition-all mb-1`}
        >
            {children || <MoreHorizontal fontSize={20} />}
        </button>
    );
});
MoreDropdownButton.displayName = 'MoreDropdownButton';
