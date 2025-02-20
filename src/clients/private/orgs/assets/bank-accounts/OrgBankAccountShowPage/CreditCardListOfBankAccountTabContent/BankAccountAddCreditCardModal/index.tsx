import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {creditCardApi} from '^models/CreditCard/api';
import {useCreditCards} from '^models/CreditCard/hook';
import {SlideUpSelectModal} from '^clients/private/_modals/SlideUpSelectModal';
import {CreditCardSelectItem} from './CreditCardSelectItem';

interface BankAccountAddCreditCardModalProps {
    bankAccountId: number;
    isOpened: boolean;
    onClose: () => any;
    onCreate?: () => any;
}

export const BankAccountAddCreditCardModal = memo((props: BankAccountAddCreditCardModalProps) => {
    const {isOpened, onClose, onCreate, bankAccountId} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const {search, result, isLoading, reset} = useCreditCards();

    const onSubmit = async (selectedIds: number[]) => {
        const req = selectedIds.map((id) => creditCardApi.update(orgId, id, {bankAccountId}));
        await Promise.allSettled(req);
    };

    const addableSubscriptions = result.items.filter((item) => item.bankAccountId !== bankAccountId);

    return (
        <SlideUpSelectModal
            isOpened={isOpened}
            onClose={onClose}
            onOpened={() => search({})}
            onClosed={() => reset()}
            onCreate={onCreate}
            isLoading={isLoading}
            items={addableSubscriptions}
            getId={(item) => item.id}
            Row={({item, onClick, isSelected}) => (
                <CreditCardSelectItem creditCard={item} onClick={onClick} isSelected={isSelected} />
            )}
            onSubmit={onSubmit}
            titleCaption="새로운 카드 연결하기"
            title="연결할 카드를 모두 선택해주세요."
            ctaInactiveText="카드 선택"
            ctaActiveText="%n개의 선택된 카드 연결하기"
        />
    );
});
