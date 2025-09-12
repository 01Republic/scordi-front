import {ReactElement, ReactNode} from 'react';
import Tippy from '@tippyjs/react';

interface Props {
    Icon: () => JSX.Element;
    name: JSX.Element | ReactElement | ReactNode;
    onClick: () => any;
}

export function IconButton(props: Props) {
    const {Icon, name, onClick} = props;

    return (
        <Tippy placement="top" arrow={false} offset={[0, 5]} content={name} className="text-12">
            <button
                type="button"
                className="btn btn-ghost no-animation btn-animation w-[28px] min-h-[28px] h-[28px] p-1.5 whitespace-nowrap rounded-[6px] text-14 text-gray-500 hover:bg-gray-200/70"
                onClick={onClick}
            >
                <Icon />
            </button>
        </Tippy>
    );
}
