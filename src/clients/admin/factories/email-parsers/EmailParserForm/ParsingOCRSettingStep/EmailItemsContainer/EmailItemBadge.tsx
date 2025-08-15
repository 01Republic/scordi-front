import {memo} from 'react';
import {GmailItemDto} from '^models/InvoiceAccount/type';

interface EmailItemBadgeProps {
    emailItem: GmailItemDto;
    onClick?: () => any;
    isActive?: boolean;
}

export const EmailItemBadge = memo((props: EmailItemBadgeProps) => {
    const {emailItem, onClick, isActive = false} = props;

    return (
        <div
            className={`py-1 px-2 text-12 flex items-center gap-2 border border-gray-200 ${
                isActive
                    ? 'bg-indigo-100 border-indigo-300'
                    : 'bg-white text-gray-500 hover:bg-gray-100 hover:border-gray-300'
            } rounded-full cursor-pointer transition-all`}
            onClick={onClick}
        >
            <div>{emailItem.mailId}</div>
        </div>
    );
});
EmailItemBadge.displayName = 'EmailItemBadge';
