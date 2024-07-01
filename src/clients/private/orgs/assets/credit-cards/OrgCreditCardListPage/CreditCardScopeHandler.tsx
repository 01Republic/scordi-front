import {memo, useState} from 'react';
import {ScopeButton} from '^clients/private/orgs/team/team-members/OrgTeamMemberListPage/InviteStatusScopeHandler/ScopeButton';
import {CreditCardUsingStatus} from '^models/CreditCard/type';
import {useCreditCardListForListPage} from '^models/CreditCard/hook';

export const CreditCardScopeHandler = memo(function () {
    const {query, search} = useCreditCardListForListPage();
    const [usingStatus, setUsingStatus] = useState<CreditCardUsingStatus>();

    const searchResource = (val?: CreditCardUsingStatus) => {
        console.log('usingStatusValue', val);
        return search({...query, where: {usingStatus: val}}).then(() => {
            return setUsingStatus(val);
        });
    };

    return (
        <div className="flex items-center gap-2">
            <ScopeButton active={usingStatus === undefined} onClick={() => searchResource(undefined)}>
                전체
            </ScopeButton>
            <ScopeButton
                active={usingStatus === CreditCardUsingStatus.UnDef}
                onClick={() => searchResource(CreditCardUsingStatus.UnDef)}
            >
                미정
            </ScopeButton>
            <ScopeButton
                active={usingStatus === CreditCardUsingStatus.NoUse}
                onClick={() => searchResource(CreditCardUsingStatus.NoUse)}
            >
                미사용
            </ScopeButton>
            <ScopeButton
                active={usingStatus === CreditCardUsingStatus.InUse}
                onClick={() => searchResource(CreditCardUsingStatus.InUse)}
            >
                사용중
            </ScopeButton>
            <ScopeButton
                active={usingStatus === CreditCardUsingStatus.Expired}
                onClick={() => searchResource(CreditCardUsingStatus.Expired)}
            >
                만료
            </ScopeButton>
        </div>
    );
});
