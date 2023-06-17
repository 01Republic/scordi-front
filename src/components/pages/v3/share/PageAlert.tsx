import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface PageAlertProps extends WithChildren {
    method: 'alert-info' | 'alert-error' | 'alert-warning' | 'alert-success';
    flexed: boolean;
    className?: string;
}

export const PageAlert = memo((props: PageAlertProps) => {
    const {method, flexed, className = '', children} = props;

    return (
        <div className={`alert ${method} rounded-none ${className}`}>
            {flexed ? (
                children
            ) : (
                <div className="flex-1">
                    <div className="flex-1">{children}</div>
                </div>
            )}
        </div>
    );
});
