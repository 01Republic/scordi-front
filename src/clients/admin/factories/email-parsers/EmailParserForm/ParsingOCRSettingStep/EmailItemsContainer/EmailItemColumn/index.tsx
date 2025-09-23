import {Dispatch, memo, SetStateAction} from 'react';
import {useFormContext} from 'react-hook-form';
import {ClassConstructor, plainToInstance} from 'class-transformer';
import {GmailItemDto} from '^models/InvoiceAccount/type';
import {BasePropertyFormData, EmailParserFormData, ParserTypes} from '^models/EmailParser/types';
import {useEmailAttachments, useEmailHtml} from '../../hooks';
import {PropertyValueColumn} from './PropertyValueColumn';

interface EmailItemColumnProps {
    email: GmailItemDto;
    onClick?: () => any;
    isActive?: boolean;
    isExpanded?: boolean;
    isLoading?: boolean;
    x: number;
    pos: [number, number];
    setPos: Dispatch<SetStateAction<[number, number]>>;
}

export const EmailItemColumn = memo((props: EmailItemColumnProps) => {
    const {x, pos, setPos, email, onClick, isActive = false, isExpanded = false, isLoading = false} = props;
    const form = useFormContext<{filterQuery: string; parserData: EmailParserFormData}>();
    const {data: html = '', isFetching: isContentLoading} = useEmailHtml(email.contentUrl);
    const {data: attachments = [], isFetching: isAttchmentsLoading} = useEmailAttachments(email);

    const loading = isLoading || isContentLoading || isAttchmentsLoading;
    const parserData = form.getValues('parserData') || {};
    const keys = Object.keys(ParserTypes);
    const entries = Object.entries(parserData).sort(([aKey], [bKey]) => keys.indexOf(aKey) - keys.indexOf(bKey));
    const parsers = entries.map(([key, val]) => {
        const PropertyFormData = ParserTypes[key as keyof EmailParserFormData]?.FormData;
        if (!PropertyFormData) return undefined;
        return plainToInstance(PropertyFormData as ClassConstructor<BasePropertyFormData>, val);
    });

    return (
        <div className="w-[140px] min-w-[140px] max-w-[140px]">
            <div
                className={`px-1.5 h-[40px] flex items-center transition-all ${
                    isExpanded && pos[0] === x ? 'bg-indigo-50/50' : ''
                }`}
                onMouseEnter={() => isExpanded && setPos((p) => [x, p[1]])}
            >
                <div
                    className={`py-1 px-2 text-12 w-full flex items-center gap-2 border border-gray-200 ${
                        isActive
                            ? 'bg-indigo-100 border-indigo-300'
                            : 'bg-white text-gray-500 hover:bg-gray-100 hover:border-gray-300'
                    } rounded-full cursor-pointer transition-all`}
                    onClick={onClick}
                >
                    <div className="w-full overflow-hidden text-ellipsis">{email.mailId}</div>
                </div>
            </div>

            {isExpanded && (
                <div className="flex flex-col">
                    {parsers.map((defaultValue, j) => (
                        <PropertyValueColumn
                            key={j}
                            email={email}
                            html={html}
                            attachments={attachments}
                            isLoading={loading}
                            onClick={onClick}
                            defaultValue={defaultValue}
                            isFocused={pos[0] === x && pos[1] === j}
                            isReacted={pos[0] === x || pos[1] === j}
                            onMouseEnter={() => setPos([x, j])}
                        />
                    ))}
                </div>
            )}
        </div>
    );
});
