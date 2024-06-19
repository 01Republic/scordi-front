import {memo} from 'react';
import {WithChildren} from '^types/global.type';

export const CardContainerTableLayout = memo((props: WithChildren) => {
    const {children} = props;

    return (
        <div className="card card-bordered bg-white rounded-md relative">
            <div className="p-4">{children}</div>
        </div>
    );
});
CardContainerTableLayout.displayName = 'CardContainerTableLayout';
