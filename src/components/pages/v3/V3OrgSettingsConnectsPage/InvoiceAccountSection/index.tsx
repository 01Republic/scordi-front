import React, {memo, useEffect} from 'react';
import {InvoiceAccountTable} from '^v3/V3OrgSettingsConnectsPage/InvoiceAccountSection/InvoiceAccountTable';
import {useInvoiceAccounts} from '^models/InvoiceAccount/hook';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {TablePaginator} from '^v3/share/table/TablePaginator';
import {AiOutlinePlus} from '@react-icons/all-files/ai/AiOutlinePlus';
import {SettingBodyPanel} from '^v3/share/SettingBodyPanel';
import {useModal} from '^v3/share/modals';
import {newInvoiceAccountModal} from '^v3/V3OrgHomePage/NewInvoiceAccountModal/atom';

export const InvoiceAccountSection = memo(() => {
    const {result, search: getInvoiceAccounts, movePage, query} = useInvoiceAccounts();
    const {open} = useModal(newInvoiceAccountModal);
    const orgId = useRecoilValue(orgIdParamState);
    const pagination = result.pagination;

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;

        getInvoiceAccounts({itemsPerPage: 10});
    }, [orgId]);

    return (
        <SettingBodyPanel
            title="인보이스 수신 계정"
            buttons={
                <button onClick={open} className="btn btn-scordi">
                    <span>추가하기</span>
                    <span className="ml-2">
                        <AiOutlinePlus />
                    </span>
                </button>
            }
        >
            <InvoiceAccountTable />

            <div className="flex justify-center">
                <TablePaginator pagination={pagination} movePage={movePage} />
            </div>
        </SettingBodyPanel>
    );
});
