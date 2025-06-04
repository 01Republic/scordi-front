import {memo, useEffect} from 'react';
import {useOrgIdParam} from '^atoms/common';
import {CreateCodefAccountsByCertificateFlow} from '^_components/pages/assets/flows';
import {errorToast} from '^api/api';
import {codefAccountApi} from '^models/CodefAccount/api';
import {useCodefAccountsInConnectorV2} from '^models/CodefAccount/hook';
import {CodefLoginType} from '^models/CodefAccount/type/enums';
import {CodefApiAccountItemDto} from '^models/CodefAccount/type/CodefApiAccountItemDto';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {CodefCompanyStaticData} from '^models/CodefAccount/type/CodefCompanyStaticData';
import {isDefinedValue} from '^utils/array';

interface CreateCodefAccountsByCertificateFlowProps {
    ignorePreCheck?: boolean;
    onBack: () => any;
    onFinish: (
        codefAccounts: CodefAccountDto[],
        failedCompanies: CodefApiAccountItemDto[],
        afterAccountCreated: boolean,
    ) => any;
}

/**
 * 공동인증서로 자산 불러오기 Flow
 * --
 * - 공동인증서로 연결된 기관이 있는지 확인하고
 * - 연결된 기관이 있으면 기관들을 반환합니다.
 * - 만약 연결된 기관이 없으면 공동인증서를 등록하고 기관을 연결해 반환합니다.
 */
export const AssetConnectByCertificateFlow = memo((props: CreateCodefAccountsByCertificateFlowProps) => {
    const {ignorePreCheck = false, onBack, onFinish} = props;
    const orgId = useOrgIdParam();
    const {codefAccounts, isFetchedAfterMount} = useCodefAccountsInConnectorV2(orgId);
    const certAccounts = codefAccounts.filter((account) => {
        return account.loginType === CodefLoginType.Certificate;
    });

    useEffect(() => {
        if (ignorePreCheck) return;
        if (isFetchedAfterMount && certAccounts.length > 0) onFinish(certAccounts, [], false);
    }, [ignorePreCheck, isFetchedAfterMount, certAccounts]);

    const renderActive = ignorePreCheck || (isFetchedAfterMount && certAccounts.length === 0);

    return (
        <>
            {/* 공동인증서 등록 플로우 (계정등록) */}
            {renderActive && (
                <CreateCodefAccountsByCertificateFlow
                    onBack={onBack}
                    onFinish={async (selectedCompanies, failedCompanies) => {
                        codefAccountApi
                            .index(orgId, {
                                where: {
                                    loginType: CodefLoginType.Certificate,
                                    organization: {op: 'in', val: selectedCompanies.map((company) => company.param)},
                                    // id: {op: 'in', val: createdAccountIds},
                                },
                                sync: false,
                                itemsPerPage: 0,
                            })
                            .then((res) => res.data.items)
                            .then((codefAccounts) => onFinish(codefAccounts, failedCompanies, true))
                            .catch(errorToast);
                    }}
                />
            )}
        </>
    );
});
