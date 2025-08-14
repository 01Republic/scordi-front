import React, {memo, useEffect} from 'react';
import {useIdParam, useOrgIdParam} from '^atoms/common';
import {useCreditCards2} from '^models/CreditCard/hook';
import {teamCreditCardApi} from '^models/TeamCreditCard/api';
import {TeamCreditCardDto} from '^models/TeamCreditCard/type';
import {SlideUpSelectModal} from '^clients/private/_modals/SlideUpSelectModal';
import {CreditCardSelectItem} from '^models/CreditCard/components/CreditCardSelectItem';
import {useUpdateTeamCreditCard} from '^models/TeamCreditCard/hook';

interface AddPaymentModalProps {
    teamCreditCard: TeamCreditCardDto[];
    isOpened: boolean;
    onClose: () => any;
    onCreate?: () => any;
}

export const AddPaymentModal = memo((props: AddPaymentModalProps) => {
    const {teamCreditCard, isOpened, onClose, onCreate} = props;
    const orgId = useOrgIdParam();
    const teamId = useIdParam('teamId');
    const {result, search} = useCreditCards2(orgId, {
        itemsPerPage: 0,
        relations: ['holdingMember', 'subscriptions'],
        where: {organizationId: orgId},
    });

    const {mutateAsync} = useUpdateTeamCreditCard(orgId);

    const onSave = async (selectedIds: number[]) => {
        const requests = selectedIds.map((creditCardId) => mutateAsync({teamId: teamId, creditCardId: creditCardId}));
        await Promise.allSettled(requests);
    };

    const entries = result.items.filter(
        (item) => !teamCreditCard?.map((item) => item.creditCard?.id).includes(item.id),
    );

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
            successMessage="선택한 결제수단을 연결했어요."
            emptyText="연결할 결제수단이 없어요"
        />
    );
});
