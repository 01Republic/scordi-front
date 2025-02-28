import {useEffect, useState} from 'react';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {FaChevronLeft} from 'react-icons/fa6';
import {LoadableBox} from '^components/util/loading';
import {toast} from 'react-hot-toast';

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

    /**
     * UI Text & Style Options
     */
    titleCaption?: string;
    title: string;
    ctaInactiveText?: string;
    ctaActiveText?: string;
    toastMessage?: string;
}

export const SlideUpSelectModal = <T,>(props: SlideUpSelectModalProps<T>) => {
    const {isOpened, onClose, onOpened: _onOpened, onClosed: _onClosed, onCreate, onSubmit: _onSubmit} = props;
    const {isLoading = false, items = [], Row, getId} = props;
    const {titleCaption = '', title, ctaInactiveText = '', ctaActiveText = '', toastMessage = '연결했어요.'} = props;
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
        toast.success(toastMessage);
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
                <div className="p-6 text-gray-400 hover:text-black transition-all cursor-pointer" onClick={onClose}>
                    <FaChevronLeft fontSize={16} />
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
                <div className="-mx-6 px-6 sm:max-h-[60vh] sm:min-h-[40vh] overflow-auto no-scrollbar">
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
SlideUpSelectModal.displayName = 'SlideUpSelectModal';
