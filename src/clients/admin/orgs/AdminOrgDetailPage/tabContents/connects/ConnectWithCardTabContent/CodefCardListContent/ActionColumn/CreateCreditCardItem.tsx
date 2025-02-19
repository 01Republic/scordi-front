import React, {memo} from 'react';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {useCodefCardSync} from '^models/CodefCard/hooks/useCodefCardSync';
import {codefCardApi} from '^models/CodefCard/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';

interface CreateCreditCardItemProps {
    codefCard: CodefCardDto;
    reload: () => Promise<any>;
}

export const CreateCreditCardItem = memo((props: CreateCreditCardItemProps) => {
    const {codefCard, reload} = props;
    const org = useRecoilValue(adminOrgDetail);
    const {isSyncRunning, setIsSyncRunning} = useCodefCardSync();

    const onClick = () => {
        if (!org) return;

        setIsSyncRunning(true);
        codefCardApi
            .createCreditCard(org.id, codefCard.id)
            .then(() => toast.success('스코디에 카드를 등록했어요'))
            .catch(errorToast)
            .finally(() => {
                setIsSyncRunning(false);
                return reload();
            });
    };

    return (
        <MoreDropdown.MenuItem className={`${isSyncRunning ? 'pointer-events-none opacity-20' : ''}`} onClick={onClick}>
            스코디에 카드 등록
        </MoreDropdown.MenuItem>
    );
});
CreateCreditCardItem.displayName = 'CreateCreditCardItem';
