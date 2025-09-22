import React, {memo, ReactNode} from 'react';

interface BottomActionProps {
    children?: ReactNode;
}

export const BottomAction = memo((props: BottomActionProps) => {
    const {children} = props;
    return (
        <div className="fixed inset-x-0 bottom-5 z-40 flex justify-center pointer-events-none">
            <div className="container px-4 pointer-events-auto">{children}</div>
        </div>
    );
});
