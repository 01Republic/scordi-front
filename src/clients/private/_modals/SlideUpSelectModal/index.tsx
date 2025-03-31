import React, {useEffect, useState} from 'react';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {LoadableBox, Spinner} from '^components/util/loading';
import {toast} from 'react-hot-toast';
import {ChevronLeft, Inbox} from 'lucide-react';

interface SlideUpSelectModalProps<T> {
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
    Button?: () => JSX.Element;

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

export const SlideUpSelectModal = <T,>(props: SlideUpSelectModalProps<T>) => {
    const {isOpened, onClose, onOpened: _onOpened, onClosed: _onClosed, onCreate, onSubmit: _onSubmit} = props;
    const {isLoading = false, items = [], Row, getId, Button} = props;
    const {
        titleCaption = '',
        title,
        ctaInactiveText = '',
        ctaActiveText = '',
        successMessage = '연결했어요.',
        emptyText,
    } = props;
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const onOpened = () => _onOpened && _onOpened();

    const onClosed = () => {
        _onClosed && _onClosed();
        setSelectedIds([]);
    };

    const toggleSelect = (id: number) => {
        setSelectedIds((ids) => {
            return ids.includes(id) ? ids.filter((_id) => _id !== id) : [...ids, id];
        });
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
            <div className="px-6 bg-white flex items-center justify-between">
                <div className="">
                    {titleCaption && <p className="text-12 text-scordi">{titleCaption}</p>}
                    <h3 className="text-18">{title}</h3>
                </div>

                <div></div>
            </div>

            <div className="px-6 pt-6">
                <div className="flex flex-col -mx-6 px-6 sm:max-h-[60vh] sm:min-h-[40vh] overflow-auto no-scrollbar">
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
                        <LoadableBox isLoading={isLoading} loadingType={2} noPadding>
                            {items.map((item, i) => (
                                <Row
                                    key={i}
                                    item={item}
                                    onClick={(selected) => toggleSelect(getId(selected))}
                                    isSelected={selectedIds.includes(getId(item))}
                                />
                            ))}
                        </LoadableBox>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-2 px-6 pb-4">
                {Button && <Button />}
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
SlideUpSelectModal.displayName = 'SlideUpSelectModal';
