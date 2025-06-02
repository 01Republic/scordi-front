import {memo, Dispatch, SetStateAction} from 'react';
import {useFormContext} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {useOrgIdParam} from '^atoms/common';
import {confirm3} from '^components/util/dialog/confirm3';
import {confirmed} from '^components/util/dialog';
import {errorToast} from '^api/api';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {CodefCardCompanyCode, CodefCustomerType, CodefLoginType} from '^models/CodefAccount/type/enums';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {useCodefAccount} from '^models/CodefCard/hook';
import {useCodefAccountsInConnectorV2} from '^models/CodefAccount/hook';
import {AssetSelectorGrid} from '^_components/pages/assets/connect-steps/common/AssetSelectorGrid';
import {InstitutionOption} from './InstitutionOption';
import Tippy from '@tippyjs/react';

interface CardCompaniesSelectorProps {
    selectedCompanies: CardAccountsStaticData[];
    setSelectedCompanies: Dispatch<SetStateAction<CardAccountsStaticData[]>>;
}

/** ### 공동인증서 > 카드사 여러개 선택 */
export const CardCompaniesSelector = memo((props: CardCompaniesSelectorProps) => {
    const {selectedCompanies, setSelectedCompanies} = props;

    const orgId = useOrgIdParam();
    const {getCardAccounts, isFetching} = useCodefAccountsInConnectorV2(orgId);
    const form = useFormContext<CreateAccountRequestDto>();
    const {removeCodefAccount} = useCodefAccount(CodefLoginType.Certificate);

    const clientType = form.getValues('clientType') || CodefCustomerType.Business;
    const codefAccounts = getCardAccounts(clientType);

    const companies = CardAccountsStaticData.findByClientType(clientType);
    const selectableCompanies = companies.filter((company) => {
        // isIDPWDRequired
        if (DISABLED_CARD_COMPANIES.includes(company.param)) return false;

        return true;
    });
    const isAllSelected = selectedCompanies.length === selectableCompanies.length;

    const onClick = (company: CardAccountsStaticData) => {
        // 토글처리
        setSelectedCompanies((prev) => {
            // 이미 선택되어있는 카드사인지 확인
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
                    "{account.company}"에 연결된 모든 카드를 함께 연동 해제할까요?
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
        <AssetSelectorGrid title="카드" isLoading={isFetching} isAllSelected={isAllSelected} onSelectAll={toggleAll}>
            {companies.map((company) => {
                const connectedAccount = codefAccounts.find((account) => account.organization === company.param);
                const isConnected = !!connectedAccount;
                const isIDPWDRequired = DISABLED_CARD_COMPANIES.includes(company.param);

                const comment: string | undefined = (() => {
                    if (isIDPWDRequired) return '홈페이지 로그인 전용';
                    return undefined;
                })();

                // 공동인증서 > 카드사 여러개 선택
                return (
                    <InstitutionOption
                        key={company.param}
                        logo={company.logo}
                        title={company.displayName}
                        isConnected={isConnected}
                        isSelected={selectedCompanies.some(({param}) => param === company.param)}
                        isAllSelected={isAllSelected}
                        isDisabled={isIDPWDRequired}
                        comment={comment}
                        onClick={() => onClick(company)}
                        onDisconnect={() => connectedAccount && onDisconnect(connectedAccount)}
                    />
                );
            })}
        </AssetSelectorGrid>
    );
});

// 공동인증서 연동 시 롯데,하나,삼성은 연동불가
const DISABLED_CARD_COMPANIES = [
    CodefCardCompanyCode.롯데카드,
    CodefCardCompanyCode.하나카드,
    CodefCardCompanyCode.삼성카드,
];
