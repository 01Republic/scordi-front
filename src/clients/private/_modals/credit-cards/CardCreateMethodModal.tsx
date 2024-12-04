import React, {memo} from 'react';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {FcDataBackup, FcDataRecovery} from 'react-icons/fc';
import {FaChevronRight} from 'react-icons/fa6';
import {IconType} from '@react-icons/all-files';

export enum CardCreateMethod {
    // (자동) 카드사 계정 연동
    Auto = 'AUTO',
    // (수동) 카드 직접 입력
    Manual = 'MANUAL',
}

interface CardCreateMethodModalProps {
    isOpened: boolean;
    onClose: () => any;
    onSelect: (cardCreateMethod: CardCreateMethod) => any;
}

export const CardCreateMethodModal = memo((props: CardCreateMethodModalProps) => {
    const {isOpened, onClose, onSelect} = props;

    return (
        <SlideUpModal open={isOpened} onClose={onClose} size="md">
            <h3 className="font-bold text-xl">카드를 어떻게 추가할까요?</h3>

            <div className="py-4 flex flex-col gap-3">
                <CardCreateMethodOption
                    Icon={FcDataBackup}
                    title="자동으로 연동하기"
                    desc="카드사 로그인으로 간단하게 추가해요"
                    onClick={() => {
                        onClose();
                        onSelect(CardCreateMethod.Auto);
                    }}
                />
                <CardCreateMethodOption
                    Icon={FcDataRecovery}
                    title="직접 입력하기"
                    desc="사용 중인 카드를 수기로 입력해요"
                    onClick={() => {
                        onClose();
                        onSelect(CardCreateMethod.Manual);
                    }}
                />
            </div>
        </SlideUpModal>
    );
});
CardCreateMethodModal.displayName = 'CardCreateMethodModal';

interface Props {
    Icon: IconType;
    title: string;
    desc: string;
    onClick: () => any;
}

export const CardCreateMethodOption = (props: Props) => {
    const {Icon, title, desc, onClick} = props;

    return (
        <div
            className="flex items-center -mx-3 px-3 py-3 rounded-box cursor-pointer group hover:bg-scordi-50 transition-all"
            onClick={onClick}
        >
            <div className="">
                <Icon size={24} />
            </div>

            <div className="flex-auto px-3">
                <p className="text-14">{title}</p>
                <p className="text-12 text-gray-400">{desc}</p>
            </div>

            <div>
                <FaChevronRight className="text-gray-400 group-hover:text-black transition-all" />
            </div>
        </div>
    );
};
