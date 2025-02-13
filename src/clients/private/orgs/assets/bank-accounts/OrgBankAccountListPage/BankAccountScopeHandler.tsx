import {memo, useState} from 'react';
import {BankAccountUsingStatus} from '^models/BankAccount/type';
import {useBankAccountListForListPage} from '^models/BankAccount/hook';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';

export const BankAccountScopeHandler = memo(function () {
    const {query, search} = useBankAccountListForListPage();
    const [usingStatus, setUsingStatus] = useState<BankAccountUsingStatus>();

    const searchResource = (val?: BankAccountUsingStatus) => {
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
                active={usingStatus === BankAccountUsingStatus.UnDef}
                onClick={() => searchResource(BankAccountUsingStatus.UnDef)}
            >
                미정
            </ListPage.ScopeButton>
            <ListPage.ScopeButton
                active={usingStatus === BankAccountUsingStatus.NoUse}
                onClick={() => searchResource(BankAccountUsingStatus.NoUse)}
            >
                미사용
            </ListPage.ScopeButton>
            <ListPage.ScopeButton
                active={usingStatus === BankAccountUsingStatus.InUse}
                onClick={() => searchResource(BankAccountUsingStatus.InUse)}
            >
                사용중
            </ListPage.ScopeButton>
            <ListPage.ScopeButton
                active={usingStatus === BankAccountUsingStatus.Expired}
                onClick={() => searchResource(BankAccountUsingStatus.Expired)}
            >
                만료
            </ListPage.ScopeButton>
        </div>
    );
});
