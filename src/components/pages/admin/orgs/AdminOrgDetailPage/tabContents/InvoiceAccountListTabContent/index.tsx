import {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {InvoiceAccountManager} from '^models/InvoiceAccount/manager';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {CardTablePanel} from '^admin/share';
import {InvoiceAccountItem} from './InvoiceAccountItem';

export const InvoiceAccountListTabContent = memo(() => {
    const org = useRecoilValue(adminOrgDetail);
    const [InvoiceAccount, setManager] = useState<InvoiceAccountManager>();

    useEffect(() => {
        if (!org) return;

        const req = invoiceAccountApi.index(org.id, {
            relations: ['subscriptions'],
            where: {organizationId: org.id},
            order: {id: 'DESC'},
            itemsPerPage: 0,
        });

        req.then((res) => {
            setManager(InvoiceAccountManager.init(res.data.items));
        });
    }, [org]);

    if (!org) return <></>;
    if (!InvoiceAccount) return <>loading...</>;

    return (
        <div className="w-full">
            <h2 className="mb-6">
                {InvoiceAccount.length}
                <small>개의 결제수신계정이 등록되어 있습니다.</small>
            </h2>

            <CardTablePanel
                gridClass="grid-cols-5"
                entries={InvoiceAccount.all()}
                // 인보이스 계정의 활성상태는
                // 기존에는 사용자가 설정하는 활성화 여부를 뜻했으나, (isActive)
                // 조만간 계정의 토큰 만료상태를 의미하도록 바뀌어야 합니다. (ex: isTokenAlive)
                ths={['Email', '생성일시', '남은 유효기간', '구독', '']}
                entryComponent={(invoiceAccount, i, arr) => (
                    <InvoiceAccountItem invoiceAccount={invoiceAccount} borderBottom={i + 1 < arr.length} />
                )}
            />
        </div>
    );
});
