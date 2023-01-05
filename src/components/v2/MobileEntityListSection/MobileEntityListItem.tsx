import {memo, MouseEventHandler} from 'react';
import {WithChildren} from '^types/global.type';
import {Size} from '^components/v2/ui/buttons/types';

type MobileEntityListItemProps = {
    id?: string | undefined;
    size?: Size;
    onClick?: MouseEventHandler<HTMLDivElement> | undefined;
} & WithChildren;

export const MobileEntityListItem = memo((props: MobileEntityListItemProps) => {
    const {id, size = 'lg', onClick, children} = props;

    return (
        <div id={id} className="bs-col-12">
            <div className={`btn btn-block btn-${size} cursor-pointer mb-3`} onClick={onClick && onClick}>
                {children}
            </div>
        </div>
    );
});
