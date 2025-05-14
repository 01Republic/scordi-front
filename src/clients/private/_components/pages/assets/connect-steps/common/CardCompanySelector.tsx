import React, {memo, useContext, useState} from 'react';
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
import {AssetConnectOptionContext} from '^_components/pages/assets/connect-steps';
import {ConnectStepsModal} from '../AssetConnectByAccountStep/ConnectStepsModal';
import {InstitutionOption} from './InstitutionOption';

// 홈페이지계정 > 카드사 한개 선택
export const CardCompanySelector = memo(() => {
    const orgId = useOrgIdParam();
    const {} = useContext(AssetConnectOptionContext);
    const form = useFormContext<CreateAccountRequestDto>();
    const {removeCodefAccount, useCodefAccountsInConnector} = useCodefAccount(CodefLoginType.IdAccount);
    const [cardCompany, setCardCompany] = useState<CardAccountsStaticData>();
    const [isConnectStepsModalOpen, setIsConnectStepsModalOpen] = useState(false);

    const clientType = form.getValues('clientType') || CodefCustomerType.Business;

    const {
        data: {items: codefAccounts},
    } = useCodefAccountsInConnector(orgId);

    const companies = CardAccountsStaticData.findByClientType(clientType);

    const onClick = (company: CardAccountsStaticData) => {
        // 홈페이지 로그인 방식으로 진입한 경우, 카드사는 하나만 선택해야 함.
        // 선택시 연동모달 즉시 구동.
        setCardCompany(company);
        setIsConnectStepsModalOpen(true);
        return;
    };

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
                    const connectedAccount = codefAccounts.find((account) => account.company === company.displayName);

                    return (
                        <InstitutionOption
                            key={company.param}
                            logo={company.logo}
                            title={company.displayName}
                            connect={!!connectedAccount}
                            onClick={() => onClick(company)}
                            onDisconnect={() => onDisconnect(company.displayName, connectedAccount?.id)}
                        />
                    );
                })}
            </div>

            {/* 로그인/비밀번호로 연동하는 경우 모달을 이용해 연결 */}
            {cardCompany && (
                <ConnectStepsModal
                    cardCompany={cardCompany}
                    setCardCompany={setCardCompany}
                    isConnectStepsModalOpen={isConnectStepsModalOpen}
                    setIsConnectStepsModalOpen={setIsConnectStepsModalOpen}
                />
            )}
        </section>
    );
});
