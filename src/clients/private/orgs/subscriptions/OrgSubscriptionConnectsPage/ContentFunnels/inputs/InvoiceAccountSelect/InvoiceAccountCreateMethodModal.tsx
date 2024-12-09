import React, {memo} from 'react';
import {FcDataBackup, FcDataRecovery} from 'react-icons/fc';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {useGoogleLoginForInvoiceAccountSelect} from '^models/InvoiceAccount/hook';
import {CardCreateMethodOption} from '^clients/private/_modals/credit-cards';
import {InvoiceAccountCreateMethod} from '^clients/private/_modals/invoice-accounts';

interface InvoiceAccountCreateMethodModalProps {
    isOpened: boolean;
    onClose: () => any;
    onSelect: (createMethod: InvoiceAccountCreateMethod) => any;
}

export const InvoiceAccountCreateMethodModal = memo((props: InvoiceAccountCreateMethodModalProps) => {
    const {isOpened, onClose, onSelect} = props;
    const {launch} = useGoogleLoginForInvoiceAccountSelect();

    return (
        <SlideUpModal open={isOpened} onClose={onClose} size="md">
            <h3 className="font-bold text-xl">어떤 방법으로 추가할까요?</h3>

            <div className="py-4 flex flex-col gap-3">
                <CardCreateMethodOption
                    Icon={FcDataBackup}
                    title="청구서 메일 불러오기"
                    desc="구글 로그인으로 한 번에 불러와요"
                    onClick={() => {
                        launch(() => {
                            onClose();
                            onSelect(InvoiceAccountCreateMethod.Auto);
                        });
                    }}
                />
                <CardCreateMethodOption
                    Icon={FcDataRecovery}
                    title="직접 추가하기"
                    desc="이메일 주소를 입력한 뒤 추가해요"
                    onClick={() => {
                        onClose();
                        onSelect(InvoiceAccountCreateMethod.Manual);
                    }}
                />
            </div>
        </SlideUpModal>
    );
});
InvoiceAccountCreateMethodModal.displayName = 'InvoiceAccountCreateMethodModal';
