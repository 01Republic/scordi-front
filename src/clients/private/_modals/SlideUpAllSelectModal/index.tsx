import React, {useEffect, useState} from 'react';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {LoadableBox, Spinner} from '^components/util/loading';
import {toast} from 'react-hot-toast';
import {ChevronLeft, Inbox, Search} from 'lucide-react';

interface SlideUpAllSelectModalProps<T> {
    /**
     * Modal Control Options
     */
    isOpened: boolean;
    onClose: () => any;
    onOpened?: () => any;
    onClosed?: () => any;
    onCreate?: () => any;
    onSubmit?: (selectedIds: number[]) => any;

    /**
     * Api Response & Entry Handle Options
     */
    isLoading?: boolean;
    items?: T[];
    Row: (props: {item: T; onClick?: (selected: T) => any; isSelected?: boolean}) => JSX.Element;
    getId: (item: T) => number;

    /**
     * UI Text & Style Options
     */
    titleCaption?: string;
    title: string;
    ctaInactiveText?: string;
    ctaActiveText?: string;
    successMessage?: string;
    emptyText?: string;
}

export const SlideUpAllSelectModal = <T,>(props: SlideUpAllSelectModalProps<T>) => {
    const {isOpened, onClose, onOpened: _onOpened, onClosed: _onClosed, onCreate, onSubmit: _onSubmit} = props;
    const {isLoading = false, items = [], Row, getId} = props;
    const {
        titleCaption = '',
        title,
        ctaInactiveText = '',
        ctaActiveText = '',
        successMessage = '연결했어요.',
        emptyText = '',
    } = props;
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [isAllSelect, setIsAllSelect] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const onOpened = () => _onOpened && _onOpened();

    const onClosed = () => {
        _onClosed && _onClosed();
        setSelectedIds([]);
        setSearchTerm('');
    };

    const toggleSelect = (id: number) => {
        setSelectedIds((prevSelectedIds) => {
            return prevSelectedIds.includes(id)
                ? prevSelectedIds.filter((_id) => _id !== id)
                : [...prevSelectedIds, id];
        });
    };

    const handleSelectAll = () => {
        if (selectedIds.length === items.length) {
            setIsAllSelect(false);
            setSelectedIds([]);
        } else {
            setIsAllSelect(true);
            setSelectedIds(items.map((item) => getId(item)));
        }
    };

    const onSubmit = async () => {
        await (_onSubmit && _onSubmit(selectedIds));
        toast.success(successMessage);
        onCreate && onCreate();
    };

    useEffect(() => {
        if (isOpened) {
            onOpened();
        } else {
            setTimeout(onClosed, 500);
        }
    }, [isOpened]);

    if (isLoading) return <LoadableBox isLoading={isLoading} loadingType={2} noPadding />;

    return (
        <SlideUpModal open={isOpened} onClose={onClose} size="md" modalClassName="rounded-none sm:rounded-t-box p-0">
            <div className="flex items-center">
                <div
                    className="px-4 pt-5 pb-4 text-gray-400 hover:text-black transition-all cursor-pointer"
                    onClick={onClose}
                >
                    <ChevronLeft fontSize={24} />
                </div>
            </div>
            <div className="px-6 bg-white flex flex-col items-start justify-start">
                {titleCaption && <p className="text-12 text-scordi">{titleCaption}</p>}
                <div className="w-full flex items-center justify-between">
                    <h3 className="text-18">{title}</h3>
                </div>
                {items.length > 0 && (
                    <div className="w-full flex justify-end">
                        <button className="link link-primary no-underline text-14" onClick={handleSelectAll}>
                            {isAllSelect ? '선택취소' : '전체선택'}
                        </button>
                    </div>
                )}
            </div>

            {items.length > 0 && (
                <div className="relative w-[calc(100%-3rem)] mx-6 mt-6">
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        className="w-full border rounded-md border-gray-300 pl-10 pr-4 py-2"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search size={18} className="text-gray-400" />
                    </div>
                </div>
            )}

            <div className="px-6 pt-4">
                <div className="-mx-6 px-6 sm:max-h-[60vh] sm:min-h-[40vh] overflow-auto no-scrollbar flex flex-col">
                    {items.length === 0 ? (
                        <section className="w-full flex flex-1 flex-col justify-center items-center">
                            {isLoading ? (
                                <Spinner size={30} posY="center" />
                            ) : (
                                <section className="w-full flex flex-1 flex-col justify-center items-center gap-4">
                                    <Inbox className="size-[34px] text-gray-400" />
                                    <span className="text-base text-gray-400 font-semibold">{emptyText}</span>
                                </section>
                            )}
                        </section>
                    ) : (
                        <>
                            {items
                                .filter((item) => {
                                    if (!searchTerm.trim()) return true;
                                    const itemString = JSON.stringify(item).toLowerCase();
                                    return itemString.includes(searchTerm.toLowerCase());
                                })
                                .map((item, i) => (
                                    <Row
                                        key={i}
                                        item={item}
                                        onClick={(selected) => toggleSelect(getId(selected))}
                                        isSelected={selectedIds.includes(getId(item))}
                                    />
                                ))}

                            {searchTerm &&
                                items.filter((item) => {
                                    const itemString = JSON.stringify(item).toLowerCase();
                                    return itemString.includes(searchTerm.toLowerCase());
                                }).length === 0 && (
                                    <div className="py-8 text-center text-gray-500 text-sm">검색 결과가 없습니다.</div>
                                )}
                        </>
                    )}
                </div>
            </div>

            <div className="px-6 pb-4">
                {!selectedIds.length ? (
                    <button type="button" className="btn btn-scordi btn-block btn-disabled2">
                        {ctaInactiveText || '항목을 선택해주세요'}
                    </button>
                ) : (
                    <button type="button" className="btn btn-scordi btn-block" onClick={onSubmit}>
                        {(ctaActiveText || '%n개의 선택된 항목 제출하기').replace(
                            '%n',
                            selectedIds.length.toLocaleString(),
                        )}
                    </button>
                )}
            </div>
        </SlideUpModal>
    );
};
SlideUpAllSelectModal.displayName = 'SlideUpAllSelectModal';
