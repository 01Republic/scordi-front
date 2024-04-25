import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface AdminPageContentProps extends WithChildren {
    className?: string;
    fluid?: boolean;
}

export const AdminPageContainer = memo((props: AdminPageContentProps) => {
    const {className = '', fluid = true, children} = props;

    return (
        <div className={`${fluid ? '' : 'container'} pt-10 px-2 sm:px-8 ${className}`}>
            <div className="w-full">{children}</div>
        </div>
    );
});
AdminPageContainer.displayName = 'AdminPageContent';
