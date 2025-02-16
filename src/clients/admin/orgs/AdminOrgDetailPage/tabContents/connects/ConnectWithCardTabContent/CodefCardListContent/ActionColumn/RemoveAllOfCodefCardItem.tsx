import React, {memo} from 'react';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {confirm2, confirmed} from '^components/util/dialog';
import {codefCardApi} from '^models/CodefCard/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {creditCardApi} from '^models/CreditCard/api';

interface RemoveAllOfCodefCardItemProps {
    codefCard: CodefCardDto;
    reload: () => Promise<any>;
}

export const RemoveAllOfCodefCardItem = memo((props: RemoveAllOfCodefCardItemProps) => {
    const {codefCard, reload} = props;
    const org = useRecoilValue(adminOrgDetail);

    // 이 '코드에프 카드' 항목 삭제
    const removeCodefCard = () => {
        if (!org) return;
        const removeConfirm = () => {
            return confirm2(
                '진짜 삭제할까요?',
                <div>
                    <p>
                        나중에 카드사 계정 연동이 최신화 되었을 때, DB에 없는 카드가 감지되면 사용자에게 신규카드가
                        발견된 것 처럼 보일 수 있습니다.
                    </p>
                    <p>그래도 삭제할까요?</p>
                </div>,
            );
        };

        return confirmed(removeConfirm())
            .then(() => codefCardApi.destroy(org.id, codefCard.id))
            .then(() => toast.success(`코드에프 카드 (${codefCard.resCardName}) 삭제완료`))
            .then(() => codefCard.creditCardId && disconnectCreditCard('연결된 결제수단(카드)도 함께 제거 할까요?'))
            .then(() => reload())
            .catch(errorToast);
    };

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

    return <MoreDropdown.MenuItem onClick={() => removeCodefCard()}>전부 삭제</MoreDropdown.MenuItem>;
});
RemoveAllOfCodefCardItem.displayName = 'RemoveAllOfCodefCardItem';
