import {memo, Dispatch, SetStateAction} from 'react';
import {useFormContext} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {useOrgIdParam} from '^atoms/common';
import {confirm3} from '^components/util/dialog/confirm3';
import {confirmed} from '^components/util/dialog';
import {errorToast} from '^api/api';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {CodefCustomerType} from '^models/CodefAccount/type/enums';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {useCodefAccountsInConnectorV2} from '^models/CodefAccount/hook';
import {AssetSelectorGrid} from '^_components/pages/assets/connect-steps/common/AssetSelectorGrid';
import {InstitutionOption} from './InstitutionOption';
import Tippy from '@tippyjs/react';
import {codefAccountApi} from '^models/CodefAccount/api';

interface BankCompaniesSelectorProps {
    selectedCompanies: BankAccountsStaticData[];
    setSelectedCompanies: Dispatch<SetStateAction<BankAccountsStaticData[]>>;
}

/** ### 공동인증서 > 은행사 여러개 선택 */
export const BankCompaniesSelector = memo((props: BankCompaniesSelectorProps) => {
    const {selectedCompanies, setSelectedCompanies} = props;

    const orgId = useOrgIdParam();
    const {getBankAccounts, isFetching, refetch} = useCodefAccountsInConnectorV2(orgId);
    const form = useFormContext<CreateAccountRequestDto>();

    const clientType = form.getValues('clientType') || CodefCustomerType.Business;
    const codefAccounts = getBankAccounts(clientType);
    console.log('BankCompaniesSelector', 'codefAccounts', codefAccounts);

    const companies = BankAccountsStaticData.findByClientType(clientType);
    const selectableCompanies = companies.filter((company) => {
        // isConnected
        // if (codefAccounts.some((acc) => acc.organization === company.param)) return false;

        return true;
    });
    const isAllSelected = selectedCompanies.length === selectableCompanies.length;

    const onClick = (company: BankAccountsStaticData) => {
        // 토글처리
        setSelectedCompanies((prev) => {
            // 이미 선택되어있는 은행인지 확인
            const isAlreadySelected = prev.some(({param}) => param === company.param);

            return isAlreadySelected
                ? // 이미 선택되어있으면 빼고
                  prev.filter(({param}) => param !== company.param)
                : // 그렇지 않으면 추가
                  [...prev, company];
        });
    };

    const toggleAll = () => setSelectedCompanies(isAllSelected ? [] : selectableCompanies);

    const onDisconnect = async (account: CodefAccountDto) => {
        const accountId = account.id;
        const orgId = account.orgId;

        const disconnectConfirm = () =>
            confirm3(
                '기관 연동을 해제할까요?',
                <span className="text-16 text-gray-800 font-normal">
                    "{account.company}"에 연결된 모든 계좌를 함께 연동 해제할까요?
                    <br />
                    <br />
                    기관 연동을 해제하면 연결된 내역도 더이상 가져올 수 없어요. <br />
                    그래도 해제할까요?
                </span>,
            );

        confirmed(disconnectConfirm())
            .then(() => codefAccountApi.destroy(orgId, accountId))
            .then(() => toast.success('연결을 해제했어요.'))
            .then(() => refetch())
            .catch(errorToast);
    };

    return (
        <AssetSelectorGrid
            title={<span onClick={() => refetch()}>은행</span>}
            isLoading={isFetching}
            isAllSelected={isAllSelected}
            onSelectAll={toggleAll}
        >
            {companies.map((company) => {
                const connectedAccount = codefAccounts.find((account) => account.organization === company.param);
                const isConnected = !!connectedAccount;

                // 공동인증서 > 은행사 여러개 선택
                return (
                    <InstitutionOption
                        key={company.param}
                        logo={company.logo}
                        title={company.displayName}
                        isConnected={isConnected}
                        isSelected={selectedCompanies.some((b) => b.param === company.param)}
                        isAllSelected={isAllSelected}
                        // isDisabled={isConnected}
                        onClick={() => onClick(company)}
                        onDisconnect={() => connectedAccount && onDisconnect(connectedAccount)}
                    />
                );
            })}
        </AssetSelectorGrid>
    );
});
