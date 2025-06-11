import React from 'react';
import {toast} from 'react-hot-toast';
import {CardTableColumns} from '^admin/share';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {t_codefCustomerType, t_codefLoginType} from '^models/CodefAccount/type/enums';
import {codefAccountAdminApi} from '^models/CodefAccount/api';
import {hh_mm, yyyy_mm_dd} from '^utils/dateTime';
import {unitFormat} from '^utils/number';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {confirm2, confirmed} from '^components/util/dialog';
import {errorToast} from '^api/api';
import {MoreHorizontal} from 'lucide-react';

interface Options {
    reload: () => Promise<any>;
    moveTab: (tabIndex: number, account: CodefAccountDto) => any;
}

export const getCodefAccountColumns = (options: Options): CardTableColumns<CodefAccountDto>[] => {
    const {reload, moveTab} = options;

    const goCodefBankAccountList = (account: CodefAccountDto) => moveTab(1, account);

    return [
        {
            th: 'ID',
            className: 'text-12',
            render: (account: CodefAccountDto) => (
                <div>
                    <span className="badge badge-xs">#{account.id}</span>
                </div>
            ),
        },
        // {
        //     th: '국가코드',
        //     className: 'text-12',
        //     render: (account: CodefAccountDto) => (
        //         <div>
        //             <span className="badge badge-xs">#{account.id}</span>
        //         </div>
        //     ),
        // },
        {
            th: '개인/법인',
            className: 'text-12',
            render: (account: CodefAccountDto) => <div>{t_codefCustomerType(account.clientType)}</div>,
        },
        {
            th: '기관명',
            className: 'text-12',
            render: (account: CodefAccountDto) => (
                <div
                    className="cursor-pointer text-scordi hover:text-blue-700 transition-all"
                    onClick={() => goCodefBankAccountList(account)}
                >
                    {/* 은행 */}
                    {account.company || '-'}
                </div>
            ),
        },
        // {
        //     th: '구분(은행/카드)',
        //     className: 'text-12',
        //     render: (account: CodefAccountDto) => <div>{t_codefRequestBusinessType(account.businessType)}</div>,
        // },
        {
            th: '방식(계정/인증서)',
            className: 'text-12',
            render: (account: CodefAccountDto) => (
                <div>{!account.connectedIdentityId ? `(엑셀등록 가계정)` : t_codefLoginType(account.loginType)}</div>
            ),
        },
        // {
        //     th: '로그인구분',
        //     className: 'text-12',
        //     render: (account: CodefAccountDto) => <div>{t_codefLoginTypeLevel(account.loginTypeLevel)}</div>,
        // },
        // {
        //     th: '회원구분',
        //     className: 'text-12',
        //     render: (account: CodefAccountDto) => <div>{t_codefClientTypeLevel(account.clientTypeLevel)}</div>,
        // },
        {
            th: '등록일시',
            className: 'text-12',
            render: (account: CodefAccountDto) => (
                <div className="tooltip tooltip-top tooltip-success" data-tip={hh_mm(account.createdAt)}>
                    {yyyy_mm_dd(account.createdAt)}
                </div>
            ),
        },
        {
            th: '조회된 계좌수',
            className: 'text-12',
            render: (account: CodefAccountDto) => (
                <div className="cursor-pointer" onClick={() => goCodefBankAccountList(account)}>
                    {unitFormat((account.codefBankAccounts || []).length)}
                </div>
            ),
        },
        {
            th: '등록된 계좌수',
            className: 'text-12',
            render: (account: CodefAccountDto) => <div>{unitFormat((account.bankAccounts || []).length)}</div>,
        },
        {
            th: '',
            className: 'text-12',
            render: (account: CodefAccountDto) => {
                const orgId = account.connectedIdentity?.organizationId!;

                const syncCodefAssetsOfAccount = () => {
                    const syncConfirm = () => confirm2('패치를 시작할까요?');
                    return confirmed(syncConfirm())
                        .then(() => codefAccountAdminApi.syncBankAccounts(orgId, account.id))
                        .then(() => toast.success('패치 완료'))
                        .then(() => goCodefBankAccountList(account))
                        .catch(errorToast);
                };

                const removeAccount = () => {
                    const removeConfirm = () =>
                        confirm2(
                            `[#${account.id} ${account.profile}] 이 계정을 정말 삭제할까요?`,
                            '이 계정으로 불러온 코드에프 계좌와 결제내역은 모두 삭제되며, <br> 등록된 계좌 데이터는 연동되지 않은 상태로 남아있게 됩니다.',
                        );
                    return confirmed(removeConfirm())
                        .then(() => codefAccountAdminApi.destroy(orgId, account.id))
                        .then(() => toast.success('삭제완료'))
                        .then(() => reload())
                        .catch(errorToast);
                };

                return (
                    <div className="flex items-center justify-end gap-1">
                        <MoreDropdown
                            placement="bottom-end"
                            Trigger={() => (
                                <button className={`btn btn-xs btn-square !border-gray-400 !bg-white !text-gray-600`}>
                                    <MoreHorizontal fontSize={16} />
                                </button>
                            )}
                        >
                            <div className="card card-bordered card-compact rounded-md shadow-lg bg-white text-12 min-w-[100px]">
                                {account.connectedIdentityId && (
                                    <MoreDropdown.MenuItem onClick={syncCodefAssetsOfAccount}>
                                        [코드에프] 계좌 목록 불러오기
                                    </MoreDropdown.MenuItem>
                                )}
                                <MoreDropdown.MenuItem onClick={removeAccount}>이 계정 삭제</MoreDropdown.MenuItem>
                            </div>
                        </MoreDropdown>
                    </div>
                );
            },
        },
    ];
};
