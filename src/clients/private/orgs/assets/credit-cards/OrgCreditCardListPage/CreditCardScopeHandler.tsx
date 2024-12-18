import {memo, useState} from 'react';
import {CreditCardUsingStatus} from '^models/CreditCard/type';
import {useCreditCardListForListPage} from '^models/CreditCard/hook';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';

export const CreditCardScopeHandler = memo(function () {
    const {query, search} = useCreditCardListForListPage();
    const [usingStatus, setUsingStatus] = useState<CreditCardUsingStatus>();

    const searchResource = (val?: CreditCardUsingStatus) => {
        return search({...query, where: {usingStatus: val}}).then(() => {
            return setUsingStatus(val);
        });
    };

    return (
        <div className="flex items-center gap-2">
            <ListPage.ScopeButton active={usingStatus === undefined} onClick={() => searchResource(undefined)}>
                전체
            </ListPage.ScopeButton>
            <ListPage.ScopeButton
                active={usingStatus === CreditCardUsingStatus.UnDef}
                onClick={() => searchResource(CreditCardUsingStatus.UnDef)}
            >
                미정
            </ListPage.ScopeButton>
            <ListPage.ScopeButton
                active={usingStatus === CreditCardUsingStatus.NoUse}
                onClick={() => searchResource(CreditCardUsingStatus.NoUse)}
            >
                미사용
            </ListPage.ScopeButton>
            <ListPage.ScopeButton
                active={usingStatus === CreditCardUsingStatus.InUse}
                onClick={() => searchResource(CreditCardUsingStatus.InUse)}
            >
                사용중
            </ListPage.ScopeButton>
            <ListPage.ScopeButton
                active={usingStatus === CreditCardUsingStatus.Expired}
                onClick={() => searchResource(CreditCardUsingStatus.Expired)}
            >
                만료
            </ListPage.ScopeButton>
        </div>
    );
});
