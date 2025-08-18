import {FetchedAttachmentFile, GmailItemDto} from '^models/InvoiceAccount/type';
import {BasePropertyFormData} from '^models/EmailParser/types';
import {FocusableColumn} from '../Column';
import {Empty} from './Empty';
import {cn} from '^public/lib/utils';

interface PropertyValueColumnProps<V extends BasePropertyFormData> {
    email: GmailItemDto;
    html: string;
    attachments: FetchedAttachmentFile[];
    isLoading?: boolean;
    onClick?: () => any;
    defaultValue?: V;
    className?: string;
    isFocused?: boolean;
    isReacted?: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export const PropertyValueColumn = <V extends BasePropertyFormData>(props: PropertyValueColumnProps<V>) => {
    const {
        email,
        html,
        attachments = [],
        isLoading = false,
        isFocused = false,
        isReacted = false,
        onClick,
        defaultValue,
        className = '',
        onMouseEnter,
        onMouseLeave,
    } = props;

    if (!defaultValue) return <></>;

    const {resultValue} = defaultValue.parse(email, html, attachments);

    return (
        <FocusableColumn
            isFocused={isFocused}
            isReacted={isReacted}
            className={cn(`overflow-hidden text-12 ${isLoading ? 'opacity-40 pointer-events-none' : ''}`, className)}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <TextItem text={isLoading ? '로딩중' : resultValue} />
        </FocusableColumn>
    );
};

function TextItem(props: {text: string}) {
    const {text} = props;

    if (!text) return <Empty />;

    return <div className="w-full overflow-hidden text-ellipsis">{text}</div>;
}
