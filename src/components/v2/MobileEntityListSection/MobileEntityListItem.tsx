import {memo, MouseEventHandler} from 'react';
import {WithChildren} from '^types/global.type';

type MobileEntityListItemProps = {
    onClick?: MouseEventHandler<HTMLDivElement> | undefined;
} & WithChildren;

export const MobileEntityListItem = memo((props: MobileEntityListItemProps) => {
    const {onClick, children} = props;

    return (
        <div className="bs-col-12">
            <div className="btn btn-block btn-lg cursor-pointer mb-3" onClick={onClick && onClick}>
                {children}
            </div>
        </div>
    );
});
