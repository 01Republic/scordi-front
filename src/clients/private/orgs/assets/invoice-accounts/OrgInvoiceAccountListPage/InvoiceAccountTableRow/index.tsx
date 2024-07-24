import React, {memo} from 'react';
import {InvoiceAccountDto, UpdateInvoiceAccountDto} from '^models/InvoiceAccount/type';
import {InvoiceAccountProfile} from '^models/InvoiceAccount/components/InvoiceAccountProfile';
import {TeamMemberSelectColumn} from '^models/TeamMember/components/TeamMemberSelectColumn';
import {toast} from 'react-hot-toast';
import {TeamSelect} from '^models/Team/components/TeamSelect';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {TeamDto} from '^models/Team/type';
import {AxiosResponse} from 'axios';
import {errorNotify} from '^utils/toast-notify';

interface InvoiceAccountTableRowProps {
    invoiceAccount: InvoiceAccountDto;
    reload?: () => any;
}

export const InvoiceAccountTableRow = memo((props: InvoiceAccountTableRowProps) => {
    const {invoiceAccount, reload} = props;
    const {subscriptions = []} = invoiceAccount;

    const update = async (dto: UpdateInvoiceAccountDto) => {
        const {id, organizationId: orgId} = invoiceAccount;
        return invoiceAccountApi
            .updateV3(orgId, id, dto)
            .then(() => toast.success('수정했습니다'))
            .catch(() => toast.error('문제가 발생했습니다'))
            .finally(() => reload && reload());
    };

    const setTeam = async (team?: TeamDto) => {
        const {id, organizationId: orgId} = invoiceAccount;

        const handler = (req: Promise<AxiosResponse<any>>) => {
            req.then(() => toast.success('변경되었습니다')).catch(errorNotify);
            // .finally(() => reload && reload());
        };

        const detachTeam = () => {
            const [attachedTeam] = invoiceAccount.teams || [];
            if (!attachedTeam) return;
            return invoiceAccountApi.teamsApi.destroy(id, attachedTeam.id);
        };

        const attachTeam = (team: TeamDto) => {
            return Promise.resolve(detachTeam()).then(() => {
                return invoiceAccountApi.teamsApi.create(id, team.id);
            });
        };

        if (team) {
            return handler(attachTeam(team));
        } else {
            const req = detachTeam();
            return req && handler(req);
        }
    };

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
        <tr className="group">
            {/*프로필*/}
            <td>
                <OpenButtonColumn>
                    <InvoiceAccountProfile invoiceAccount={invoiceAccount} />
                </OpenButtonColumn>
            </td>

            {/*연결 구독 수*/}
            <td>
                <div>
                    <p className="text-14">
                        {subscriptions.length.toLocaleString()} <small>apps</small>
                    </p>
                </div>
            </td>

            {/*팀 - editable, sortable (mono-select) / 멤버 프로필 / 검색가능 */}
            <td>
                <TeamSelect defaultValue={(invoiceAccount.teams || [])[0]} onChange={setTeam} />
            </td>

            {/*담당자 - editable, sortable (mono-select)*/}
            <td>
                <TeamMemberSelectColumn
                    defaultValue={invoiceAccount.holdingMember}
                    onChange={async (holdingMember) => {
                        if (invoiceAccount.holdingMemberId === holdingMember?.id) return;
                        return update({holdingMemberId: holdingMember?.id || null});
                    }}
                    compactView
                />
            </td>

            {/* 비고 */}
            <td>비고</td>

            {/*등록방식*/}
            <td>등록방식</td>
        </tr>
    );
});
InvoiceAccountTableRow.displayName = 'InvoiceAccountTableRow';
