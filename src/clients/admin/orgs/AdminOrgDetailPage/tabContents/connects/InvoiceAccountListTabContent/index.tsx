import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {CardTablePanel} from '^admin/share';
import {InvoiceAccountItem} from './InvoiceAccountItem';
import {useInvoiceAccountsOfOrgByAdmin} from './useInvoiceAccountsOfOrg.by-admin';

export const InvoiceAccountListTabContent = memo(() => {
    const org = useRecoilValue(adminOrgDetail);
    const {data, isLoading, movePage} = useInvoiceAccountsOfOrgByAdmin(org?.id, {
        relations: ['invoiceApps'],
        where: {organizationId: org?.id},
        order: {id: 'DESC'},
        itemsPerPage: 0,
    });

    const {items, pagination} = data;

    if (!org) return <></>;
    if (isLoading) return <>loading...</>;

    return (
        <div className="w-full">
            <h2 className="mb-6">
                {pagination.totalItemCount.toLocaleString()}
                <small>개의 결제수신메일이 등록되어 있습니다.</small>
            </h2>

            <CardTablePanel
                gridClass="grid-cols-5"
                entries={items}
                pagination={pagination}
                pageMove={movePage}
                // 인보이스 계정의 활성상태는
                // 기존에는 사용자가 설정하는 활성화 여부를 뜻했으나, (isActive)
                // 조만간 계정의 토큰 만료상태를 의미하도록 바뀌어야 합니다. (ex: isTokenAlive)
                ths={['Email', '생성일시', '남은 유효기간', '구독', '']}
                entryComponent={(invoiceAccount, i, arr) => (
                    <InvoiceAccountItem key={i} invoiceAccount={invoiceAccount} borderBottom={i + 1 < arr.length} />
                )}
            />
        </div>
    );
});
