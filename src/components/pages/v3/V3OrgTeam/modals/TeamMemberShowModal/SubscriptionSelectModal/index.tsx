import React, {memo, useEffect, useState} from 'react';
import {useSubscriptionSelectModal} from './hook';
import {SubscriptionSelectItem} from './SubscriptionSelectItem';

export * from './hook';

interface SubscriptionSelectModalProps {
    onConfirm: (selectedIds: number[]) => Promise<any> | any;
}

// 이 모달은 여러 장소에서 사용될 수 있습니다.
// 따라서, 모달이 사용되는 곳의 사정에 맞게
// 주요 설정을 속성으로 주입할 수 있도록 만들었습니다.
// 속성으로 주입해 모달을 사용하는 경우,
// 설정을 주입하는 컴포넌트를 한 번 감싸서 사용해주세요.
export const SubscriptionSelectModal = memo(function SubscriptionSelectModal(props: SubscriptionSelectModalProps) {
    const {isShow, hide, prevent, searchForm} = useSubscriptionSelectModal();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const {onConfirm} = props;

    const title = '구독서비스를 선택해주세요';
    const subtitle = '이미 갖고 있는건 뺐어요';

    useEffect(() => {
        if (!isShow) {
            setSelectedIds([]);
        }
    }, [isShow]);

    const toggleSelect = (selectedId: number) => {
        setSelectedIds((ids) => {
            if (ids.includes(selectedId)) {
                return [...ids.filter((id) => id !== selectedId)];
            } else {
                return [...ids, selectedId];
            }
        });
    };

    const submitSelected = () => {
        onConfirm(selectedIds);
        hide();
    };

    return (
        <div
            data-modal="SubscriptionSelectModal-for-TeamMemberDetailModal"
            className={`modal modal-bottom ${isShow ? 'modal-open' : ''}`}
            onClick={() => hide()}
        >
            <div className="modal-box max-w-lg p-0" onClick={prevent}>
                <div className="p-4 bg-scordi">
                    <h3 className="font-bold text-lg text-white">{title}</h3>
                    <p className="text-sm text-white opacity-70">{subtitle}</p>
                </div>
                <div className="px-4 pb-4 flex flex-col h-[50vh] overflow-y-auto no-scrollbar">
                    <div className="flex-1 py-4 px-2 text-sm">
                        <ul>
                            {searchForm.selectableItems().map((subscription, i) => (
                                <li key={i}>
                                    <SubscriptionSelectItem
                                        subscription={subscription}
                                        onClick={(sub) => {
                                            toggleSelect(sub.id);
                                        }}
                                        isModalShown={isShow}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="p-4 bg-white">
                    <button
                        disabled={selectedIds.length < 1}
                        className="btn btn-lg btn-scordi btn-block rounded-box disabled:border-indigo-100 disabled:bg-indigo-100 disabled:text-indigo-300"
                        onClick={submitSelected}
                    >
                        {selectedIds.length < 1 ? '선택한 항목이 없습니다' : `${selectedIds.length}개의 선택된 항목`}
                    </button>
                </div>
            </div>
        </div>
    );
});
