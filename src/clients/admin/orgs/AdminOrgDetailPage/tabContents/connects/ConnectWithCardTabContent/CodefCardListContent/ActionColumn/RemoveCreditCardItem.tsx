import React, {memo} from 'react';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {errorToast} from '^api/api';
import {confirm2, confirmed} from '^components/util/dialog';
import {creditCardApi} from '^models/CreditCard/api';
import {toast} from 'react-hot-toast';

interface RemoveCreditCardItemProps {
    codefCard: CodefCardDto;
    reload: () => Promise<any>;
}

export const RemoveCreditCardItem = memo((props: RemoveCreditCardItemProps) => {
    const {codefCard, reload} = props;
    const org = useRecoilValue(adminOrgDetail);

    // 연결된 결제수단(카드) 제거
    const disconnectCreditCard = (title?: string) => {
        if (!org || !codefCard.creditCardId) return;
        const creditCardId = codefCard.creditCardId;

        return confirmed(confirm2(title || '진짜 삭제할까요?'))
            .then(() => creditCardApi.destroy(org.id, creditCardId))
            .then(() => toast.success('Successfully disconnected'))
            .then(() => reload())
            .catch(errorToast);
    };

    return (
        <MoreDropdown.MenuItem onClick={() => disconnectCreditCard()}>스코디에 등록된 카드 삭제</MoreDropdown.MenuItem>
    );
});
RemoveCreditCardItem.displayName = 'RemoveCreditCardItem';
