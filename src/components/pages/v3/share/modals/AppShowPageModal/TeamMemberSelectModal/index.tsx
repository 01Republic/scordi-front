import React, {memo, useEffect, useState} from 'react';
import {useTeamMemberSelectModal} from './hook';
import {TeamMemberSelectItem} from './TeamMemberSelectItem';

interface TeamMemberSelectModalProps {
    onConfirm: (selectedIds: number[]) => Promise<any> | any;
}

export const TeamMemberSelectModal = memo((props: TeamMemberSelectModalProps) => {
    const {isShow, hide, prevent, list} = useTeamMemberSelectModal();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const {onConfirm} = props;

    const title = '멤버를 선택해주세요';
    const subtitle = '이미 추가된 멤버는 뺐어요';

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
            data-modal="TeamMemberSelectModal-for-AppShowModal"
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
                            {list.map((teamMember, i) => (
                                <li key={i}>
                                    <TeamMemberSelectItem
                                        item={teamMember}
                                        onClick={(selected) => {
                                            toggleSelect(selected.id);
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
TeamMemberSelectModal.displayName = 'TeamMemberSelectModal';
