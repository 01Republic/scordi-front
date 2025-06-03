import {memo} from 'react';
import {useFormContext} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {useOrgIdParam} from '^atoms/common';
import {useCodefAccount} from '^models/CodefCard/hook';
import {CodefCustomerType, CodefLoginType} from '^models/CodefAccount/type/enums';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {confirmed} from '^components/util/dialog';
import {confirm3} from '^components/util/dialog/confirm3';
import {InstitutionOption} from './InstitutionOption';

interface CardCompanySelectorProps {
    createMoreAccountContext?: boolean;
    onSelect: (company: CardAccountsStaticData) => any;
}

// 홈페이지계정 > 카드사 한개 선택
export const CardCompanySelector = memo((props: CardCompanySelectorProps) => {
    const {createMoreAccountContext = false, onSelect} = props;
    const orgId = useOrgIdParam();
    const form = useFormContext<CreateAccountRequestDto>();
    const {removeCodefAccount, useCodefAccountsInConnector} = useCodefAccount(CodefLoginType.IdAccount);

    const clientType = form.getValues('clientType') || CodefCustomerType.Business;

    const {
        data: {items: codefAccounts},
    } = useCodefAccountsInConnector(orgId);

    const companies = CardAccountsStaticData.findByClientType(clientType);

    const onDisconnect = async (companyName: string, accountId?: number) => {
        if (!accountId) return;

        const disconnectConfirm = () =>
            confirm3(
                '기관 연동을 해제할까요?',
                <span className="text-16 text-gray-800 font-normal">
                    "{companyName}"에 연결된 모든 카드를 함께 연동 해제할까요?
                    <br />
                    <br />
                    기관 연동을 해제하면 연결된 내역도 더이상 가져올 수 없어요. <br />
                    그래도 해제할까요?
                </span>,
            );

        confirmed(disconnectConfirm())
            .then(() => removeCodefAccount({orgId, accountId}))
            .then(() => toast.success('연결을 해제했어요.'))
            .catch(errorToast);
    };

    return (
        <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-neutral-900">카드</h2>
            </div>

            <div className="grid grid-cols-2 md2:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {companies.map((company) => {
                    const connectedAccounts = codefAccounts.filter((account) => {
                        return account.clientType === clientType && account.company === company.displayName;
                    });
                    const [connectedAccount] = connectedAccounts;

                    return (
                        <InstitutionOption
                            key={company.param}
                            logo={company.logo}
                            title={company.displayName}
                            isConnected={connectedAccounts.length > 0}
                            onClick={() => onSelect(company)}
                            onDisconnect={() => onDisconnect(company.displayName, connectedAccount?.id)}
                        />
                    );
                })}
            </div>
        </section>
    );
});
