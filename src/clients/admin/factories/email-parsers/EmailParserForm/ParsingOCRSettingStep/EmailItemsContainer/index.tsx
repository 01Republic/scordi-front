import {useState} from 'react';
import {GmailItemDto} from '^models/InvoiceAccount/type';
import {HeadingColumn} from './HeadingColumn';
import {EmailItemColumn} from './EmailItemColumn';
import {useEventListener} from '^hooks/useEventListener';
import {ArrowRightCircle} from 'lucide-react';

interface Props {
    emails: GmailItemDto[];
    isLoading?: boolean;
    focusedIndex: number;
    onFocus: (index: number) => any;
    onNext: () => any;
    totalPage: number;
    currentPage: number;
}

export const EmailItemsContainer = (props: Props) => {
    const {emails, isLoading = false, focusedIndex, onFocus, onNext, currentPage, totalPage} = props;
    const [isOpenedCheckerTable, setIsOpenedCheckerTable] = useState(false);
    const [pos, setPos] = useState<[number, number]>([0, 0]);

    useEventListener({
        eventName: 'keydown',
        deps: [],
        listener: (evt) => {
            if (evt.ctrlKey && evt.shiftKey && evt.key === 'ArrowUp') {
                evt.preventDefault();
                evt.stopPropagation();
                setIsOpenedCheckerTable(false);
            }
            if (evt.ctrlKey && evt.shiftKey && evt.key === 'ArrowDown') {
                evt.preventDefault();
                evt.stopPropagation();
                setIsOpenedCheckerTable(true);
            }
        },
        enable: true,
    });

    return (
        <div className="p-4 space-y-4 border-b border-gray-200">
            {emails.length > 0 ? (
                <div
                    className="flex items-start w-full"
                    onMouseEnter={() => document.querySelector('html')?.classList.add('overscroll-x-none')}
                    onMouseLeave={() => document.querySelector('html')?.classList.remove('overscroll-x-none')}
                >
                    <HeadingColumn
                        isExpanded={isOpenedCheckerTable}
                        setIsExpanded={setIsOpenedCheckerTable}
                        pos={pos}
                        setPos={setPos}
                    />

                    <div className="flex items-stretch overflow-scroll no-scrollbar">
                        {emails.map((email, i) => (
                            <EmailItemColumn
                                key={i}
                                email={email}
                                isActive={focusedIndex === i}
                                onClick={() => onFocus(i)}
                                isExpanded={isOpenedCheckerTable}
                                isLoading={isLoading}
                                x={i}
                                pos={pos}
                                setPos={setPos}
                            />
                        ))}

                        {currentPage < totalPage && (
                            <div
                                className="w-[140px] min-w-[140px] max-w-[140px] flex items-center justify-center cursor-pointer transition-all link link-primary hover:bg-gray-200/50"
                                onClick={onNext}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <ArrowRightCircle />
                                    <div>
                                        더보기 ({currentPage}/{totalPage})
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="text-gray-500 text-13">불러온 데이터가 없습니다.</div>
            )}
        </div>
    );
};
