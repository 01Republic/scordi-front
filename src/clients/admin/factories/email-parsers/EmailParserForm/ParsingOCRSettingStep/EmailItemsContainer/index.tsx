import {Dispatch, SetStateAction} from 'react';
import {Paginated} from '^types/utils/paginated.dto';
import {GmailItemDto} from '^models/InvoiceAccount/type';
import {EmailItemBadge} from './EmailItemBadge';

interface Props {
    data: Paginated<GmailItemDto>;
    focusedIndex: number;
    setFocusedIndex: Dispatch<SetStateAction<number>>;
}

export const EmailItemsContainer = (props: Props) => {
    const {data, focusedIndex, setFocusedIndex} = props;

    return (
        <div className="p-4 space-y-4 border-b border-gray-200">
            {data.items.length > 0 ? (
                <div className="flex items-center overflow-scroll no-scrollbar gap-3">
                    {data.items.map((emailItem, i) => (
                        <EmailItemBadge
                            key={i}
                            emailItem={emailItem}
                            isActive={focusedIndex === i}
                            onClick={() => setFocusedIndex(i)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-gray-500 text-13">불러온 데이터가 없습니다.</div>
            )}
        </div>
    );
};
