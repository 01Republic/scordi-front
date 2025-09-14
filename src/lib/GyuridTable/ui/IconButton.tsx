import {ReactElement, ReactNode} from 'react';
import Tippy from '@tippyjs/react';
import {Button} from '^lib/GyuridTable/ui';

interface Props {
    Icon: () => JSX.Element;
    name: JSX.Element | ReactElement | ReactNode;
    onClick: () => any;
}

export function IconButton(props: Props) {
    const {Icon, name, onClick} = props;

    return (
        <Tippy placement="top" arrow={false} offset={[0, 5]} content={name} className="text-12">
            <div>
                <Button ghost square className="" onClick={onClick}>
                    <Icon />
                </Button>
            </div>
        </Tippy>
    );
}
