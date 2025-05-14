import React, {memo, useContext, useMemo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useFormContext} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {orgIdParamState, useOrgIdParam} from '^atoms/common';
import {useCodefAccount} from '^models/CodefCard/hook';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {CodefCardCompanyCode, CodefCustomerType, CodefLoginType} from '^models/CodefAccount/type/enums';
import {confirm3} from '^components/util/dialog/confirm3';
import {ConnectStepsModal} from '../AssetConnectByAccountStep/ConnectStepsModal';
import {AllSelectInstitutionOptions} from './AllSelectInstitutionOptions';
import {InstitutionOption} from './InstitutionOption';
import {AssetConnectOptionContext} from '^_components/pages/assets/connect-steps';
import {confirmed} from '^components/util/dialog';
import {errorToast} from '^api/api';
import {AssetSelectorGrid} from '^_components/pages/assets/connect-steps/common/AssetSelectorGrid';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';

// 공동인증서 연동 시 롯데,하나,삼성은 연동불가
const disabledCardCompanyParams = [
    CodefCardCompanyCode.롯데카드,
    CodefCardCompanyCode.하나카드,
    CodefCardCompanyCode.삼성카드,
];

// 공동인증서 > 카드사 여러개 선택
export const CardCompaniesSelector = memo(() => {
    const orgId = useOrgIdParam();
    const {} = useContext(AssetConnectOptionContext);
    const form = useFormContext<CreateAccountRequestDto>();
    const {removeCodefAccount, useCodefAccountsInConnector} = useCodefAccount(CodefLoginType.Certificate);
    const [selectedCompanies, setSelectedCompanies] = useState<CardAccountsStaticData[]>([]);

    const clientType = form.getValues('clientType') || CodefCustomerType.Business;

    const {
        data: {items: codefAccounts},
    } = useCodefAccountsInConnector(orgId);

    const companies = CardAccountsStaticData.findByClientType(clientType);
    const selectableCompanies = companies.filter((company) => !disabledCardCompanyParams.includes(company.param));
    const isAllSelected = selectedCompanies.length === selectableCompanies.length;

    // 공동인증서 로그인 방식으로 진입한 경우, 금융사는 여러개 선택할 수 있음.
    // 선택시 토글처리 후 CTA 로 이후 동작을 실행할수 있도록 준비.
    const onClick = (company: CardAccountsStaticData) => {
        if (disabledCardCompanyParams.includes(company.param)) return;

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
        <AssetSelectorGrid title="카드" isAllSelected={isAllSelected} onSelectAll={toggleAll}>
            {companies.map((company) => {
                const connectedAccount = codefAccounts.find((account) => account.company === company.displayName);
                const isConnected = !!connectedAccount;

                return (
                    <InstitutionOption
                        key={company.param}
                        logo={company.logo}
                        title={company.displayName}
                        connect={isConnected}
                        isSelected={selectedCompanies.some(({param}) => param === company.param)}
                        isAllSelected={isAllSelected}
                        isDisabled={disabledCardCompanyParams.includes(company.param)}
                        onClick={() => onClick(company)}
                        onDisconnect={() => connectedAccount && onDisconnect(connectedAccount)}
                    />
                );
            })}
        </AssetSelectorGrid>
    );
});
