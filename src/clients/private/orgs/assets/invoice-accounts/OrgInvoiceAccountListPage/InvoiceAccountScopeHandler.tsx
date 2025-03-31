import {memo, useState} from 'react';
import {InvoiceAccountUsingStatus} from '^models/InvoiceAccount/type';
import {useInvoiceAccounts} from '^models/InvoiceAccount/hook';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';

export const InvoiceAccountScopeHandler = memo(function () {
    const {query, search} = useInvoiceAccounts();
    const [usingStatus, setUsingStatus] = useState<InvoiceAccountUsingStatus>();

    const searchResource = (val?: InvoiceAccountUsingStatus) => {
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
                active={usingStatus === InvoiceAccountUsingStatus.UnDef}
                onClick={() => searchResource(InvoiceAccountUsingStatus.UnDef)}
            >
                미정
            </ListPage.ScopeButton>
            <ListPage.ScopeButton
                active={usingStatus === InvoiceAccountUsingStatus.NoUse}
                onClick={() => searchResource(InvoiceAccountUsingStatus.NoUse)}
            >
                미사용
            </ListPage.ScopeButton>
            <ListPage.ScopeButton
                active={usingStatus === InvoiceAccountUsingStatus.InUse}
                onClick={() => searchResource(InvoiceAccountUsingStatus.InUse)}
            >
                사용중
            </ListPage.ScopeButton>
            <ListPage.ScopeButton
                active={usingStatus === InvoiceAccountUsingStatus.Expired}
                onClick={() => searchResource(InvoiceAccountUsingStatus.Expired)}
            >
                만료됨
            </ListPage.ScopeButton>
        </div>
    );
});
