import React, {memo} from 'react';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {FcDataBackup, FcDataRecovery} from 'react-icons/fc';
import {FaChevronRight} from 'react-icons/fa6';
import {IconType} from '@react-icons/all-files';

export enum BankCreateMethod {
    // (자동) 은행 계정 연동
    Auto = 'AUTO',
    // (수동) 계좌 직접 입력
    Manual = 'MANUAL',
}

interface BankCreateMethodModalProps {
    isOpened: boolean;
    onClose: () => any;
    onSelect: (cardCreateMethod: BankCreateMethod) => any;
}

export const BankCreateMethodModal = memo((props: BankCreateMethodModalProps) => {
    const {isOpened, onClose, onSelect} = props;

    return (
        <SlideUpModal open={isOpened} onClose={onClose} size="md">
            <h3 className="font-bold text-xl">어떤 방식으로 계좌를 추가할까요?</h3>

            <div className="py-4 flex flex-col gap-3">
                {/* TODO: 공동인증서 작업 전 임시로 폐쇄 */}
                {/*<BankCreateMethodOption*/}
                {/*    Icon={FcDataBackup}*/}
                {/*    title="이체내역 불러오기"*/}
                {/*    desc="공동인증서로 간편하게 불러와요."*/}
                {/*    onClick={() => {*/}
                {/*        onClose();*/}
                {/*        onSelect(BankCreateMethod.Auto);*/}
                {/*    }}*/}
                {/*/>*/}
                <BankCreateMethodOption
                    Icon={FcDataRecovery}
                    title="직접 추가하기"
                    desc="계좌 정보를 입력한 뒤 추가해요."
                    onClick={() => {
                        onClose();
                        onSelect(BankCreateMethod.Manual);
                    }}
                />
            </div>
        </SlideUpModal>
    );
});
BankCreateMethodModal.displayName = 'BankCreateMethodModal';

interface Props {
    Icon: IconType;
    title: string;
    desc: string;
    onClick: () => any;
}

export const BankCreateMethodOption = (props: Props) => {
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
