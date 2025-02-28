import React, {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState, teamIdParamState} from '^atoms/common';
import {useCreditCardListForListPage} from '^models/CreditCard/hook';
import {teamCreditCardApi} from '^models/TeamCreditCard/api';
import {TeamCreditCardDto} from '^models/TeamCreditCard/type';
import {SlideUpSelectModal} from '^clients/private/_modals/SlideUpSelectModal';
import {CreditCardSelectItem} from '^models/CreditCard/components/CreditCardSelectItem';

interface AddPaymentModalProps {
    teamCreditCard: TeamCreditCardDto[];
    isOpened: boolean;
    onClose: () => any;
    onCreate?: () => any;
}

export const AddPaymentModal = memo((props: AddPaymentModalProps) => {
    const {teamCreditCard, isOpened, onClose, onCreate} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const teamId = useRecoilValue(teamIdParamState);
    const {result, search} = useCreditCardListForListPage();

    const onSave = async (selectedIds: number[]) => {
        const requests = selectedIds.map((creditCardId) =>
            teamCreditCardApi.create(orgId, {teamId: teamId, creditCardId: creditCardId}),
        );
        await Promise.allSettled(requests);
    };

    const entries = result.items.filter(
        (item) => !teamCreditCard?.map((item) => item.creditCard?.id).includes(item.id),
    );

    useEffect(() => {
        !!orgId && !!teamId && search({where: {organizationId: orgId}});
    }, [orgId, teamId]);

    return (
        <SlideUpSelectModal
            isOpened={isOpened}
            onClose={onClose}
            onCreate={onCreate}
            items={entries}
            getId={(item) => item.id}
            Row={({item, onClick, isSelected}) => (
                <CreditCardSelectItem creditCard={item} onClick={onClick} isSelected={isSelected} />
            )}
            onSubmit={onSave}
            titleCaption="이미 연결된 결제수단은 제외했어요."
            title="팀에 연결할 결제수단을 모두 선택해 주세요."
            ctaInactiveText="결제수단을 선택해주세요."
            ctaActiveText="%n개의 선택된 결제수단 연결하기"
            toastMessage="선택한 결제수단을 연결했어요."
        />
    );
});
