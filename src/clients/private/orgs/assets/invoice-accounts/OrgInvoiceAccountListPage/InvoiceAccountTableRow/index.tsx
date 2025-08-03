import {errorToast} from '^api/api';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {InvoiceAccountProfile, InvoiceAccountProviderAvatar, UsingStatusTag} from '^models/InvoiceAccount/components';
import {InvoiceAccountDto, InvoiceAccountUsingStatus, UpdateInvoiceAccountDto} from '^models/InvoiceAccount/type';
import {TeamSelect} from '^models/Team/components/TeamSelect';
import {TeamDto} from '^models/Team/type';
import {OrgInvoiceAccountShowPageRoute} from '^pages/orgs/[id]/invoiceAccounts/[invoiceAccountId]';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {AxiosResponse} from 'axios';
import {debounce} from 'lodash';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {toast} from 'react-hot-toast';

interface InvoiceAccountTableRowProps {
    invoiceAccount: InvoiceAccountDto;
    reload?: () => any;
}

export const InvoiceAccountTableRow = memo((props: InvoiceAccountTableRowProps) => {
    const {t} = useTranslation('assets');
    const {invoiceAccount, reload} = props;
    const {id, organizationId: orgId, subscriptions = []} = invoiceAccount;

    const update = debounce((dto: UpdateInvoiceAccountDto) => {
        return invoiceAccountApi
            .updateV3(orgId, id, dto)
            .then(() => toast.success(t('invoiceAccount.messages.saveSuccess') as string))
            .catch(() => toast.error(t('invoiceAccount.messages.saveError') as string))
            .finally(() => reload && reload());
    }, 250);

    const setTeam = async (team?: TeamDto) => {
        const handler = (req: Promise<AxiosResponse<any>>) => {
            req.then(() => toast.success(t('invoiceAccount.messages.saveSuccess') || '변경사항을 저장했어요.')).catch(
                errorToast,
            );
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

    const showPagePath = OrgInvoiceAccountShowPageRoute.path(orgId, id);

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
                <OpenButtonColumn href={showPagePath}>
                    <InvoiceAccountProfile invoiceAccount={invoiceAccount} />
                </OpenButtonColumn>
            </td>

            {/* 상태 (editable, sortable) */}
            <td>
                <SelectColumn
                    value={invoiceAccount.usingStatus}
                    getOptions={async () => [
                        InvoiceAccountUsingStatus.UnDef,
                        InvoiceAccountUsingStatus.NoUse,
                        InvoiceAccountUsingStatus.InUse,
                        InvoiceAccountUsingStatus.Expired,
                    ]}
                    onSelect={async (usingStatus: InvoiceAccountUsingStatus) => {
                        if (usingStatus === invoiceAccount.usingStatus) return;
                        return update({usingStatus});
                    }}
                    ValueComponent={UsingStatusTag}
                    contentMinWidth="240px"
                    optionListBoxTitle={t('invoiceAccount.modals.changeStatus.title') as string}
                    inputDisplay={false}
                />
            </td>

            {/*구독 수*/}
            <td>
                <div>
                    <p className="text-14">
                        {subscriptions.length.toLocaleString()} <small className="font-light">apps</small>
                    </p>
                </div>
            </td>

            {/*등록방식*/}
            <td className="text-center">
                <InvoiceAccountProviderAvatar invoiceAccount={invoiceAccount} />
            </td>

            {/*팀 - editable, sortable (mono-select) / 멤버 프로필 / 검색가능 */}
            <td>
                <TeamSelect defaultValue={(invoiceAccount.teams || [])[0]} onChange={setTeam} creatable />
            </td>

            {/*담당자 - editable, sortable (mono-select)*/}
            {/*<td>*/}
            {/*    <TeamMemberSelectColumn*/}
            {/*        defaultValue={invoiceAccount.holdingMember}*/}
            {/*        onChange={async (holdingMember) => {*/}
            {/*            if (invoiceAccount.holdingMemberId === holdingMember?.id) return;*/}
            {/*            return update({holdingMemberId: holdingMember?.id || null});*/}
            {/*        }}*/}
            {/*        compactView*/}
            {/*    />*/}
            {/*</td>*/}

            {/* 비고 */}
            <td>
                <AirInputText
                    defaultValue={invoiceAccount.memo || undefined}
                    onChange={async (memo) => {
                        if (invoiceAccount.memo === memo) return;
                        return update({memo});
                    }}
                />
            </td>
        </tr>
    );
});
InvoiceAccountTableRow.displayName = 'InvoiceAccountTableRow';
