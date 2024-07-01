import React, {memo} from 'react';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {InvoiceAccountProfile} from '^models/InvoiceAccount/components/InvoiceAccountProfile';
import {TeamMemberSelectColumn} from '^models/TeamMember/components/TeamMemberSelectColumn';
import {toast} from 'react-hot-toast';

interface InvoiceAccountTableRowProps {
    invoiceAccount: InvoiceAccountDto;
}

export const InvoiceAccountTableRow = memo((props: InvoiceAccountTableRowProps) => {
    const {invoiceAccount} = props;
    const {subscriptions = []} = invoiceAccount;

    /**
     * - 프로필 컬럼
     *     - [ ]  로고 / 이름 + 계정
     *     - [ ]  마우스 호버 시
     *         - [ ]  열림 버튼
     *             - [ ]  청구서 수신 계정 상세페이지 이동
     * - 연결 구독 수
     *     - [ ]  0,000 App
     *     - [ ]
     * - 팀
     * - 담당자
     * - 등록방식
     */
    return (
        <tr>
            {/*프로필*/}
            <td>
                <InvoiceAccountProfile invoiceAccount={invoiceAccount} />
            </td>

            {/*담당자*/}
            <td>
                <TeamMemberSelectColumn
                    onChange={async (teamMember) => {
                        console.log(teamMember);
                        toast('준비중인 기능입니다.');
                        // toast.success('저장했습니다');
                    }}
                />
            </td>

            {/*연결 구독 수*/}
            <td>
                <div>
                    <p className="text-14">{subscriptions.length.toLocaleString()} apps</p>
                </div>
            </td>

            {/*/!*팀*!/*/}
            {/*<td>팀</td>*/}

            {/*등록방식*/}
            <td>등록방식</td>
        </tr>
    );
});
InvoiceAccountTableRow.displayName = 'InvoiceAccountTableRow';
