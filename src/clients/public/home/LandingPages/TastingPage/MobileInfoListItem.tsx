import React, {memo} from 'react';
import {ReactNodeLike} from 'prop-types';
import {WithChildren} from '^types/global.type';

export const MobileInfoListItem = memo(
    (props: {label: ReactNodeLike; value?: ReactNodeLike; className?: string} & WithChildren) => {
        const {label, value, children, className = ''} = props;

        return (
            <li className={`flex justify-between items-center text-[16px] min-h-[50px] ${className}`}>
                <div className="">{label}</div>
                {children ? (
                    <div className="max-w-[70%] text-right">{children}</div>
                ) : (
                    <div className="font-light">{value}</div>
                )}
            </li>
        );
    },
);
