import {memo, useEffect, useMemo, useState} from 'react';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {SelectCompanyStep} from './byAccountSteps/SelectCompanyStep';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {CodefApiAccountItemDto} from '^models/CodefAccount/type/CodefApiAccountItemDto';
import {CreateCodefAccountByAccountFlow} from '^_components/pages/assets/flows/CreateCodefAccountByAccountFlow';
import {codefAccountApi} from '^models/CodefAccount/api';
import {useOrgIdParam} from '^atoms/common';
import {errorToast} from '^api/api';
import {CodefLoginType} from '^models/CodefAccount/type/enums';
import {useUnmount} from '^hooks/useUnmount';
import {useCodefAccountsInConnectorV2} from '^models/CodefAccount/hook';

interface AssetConnectByAccountFlowProps {
    isAppendable?: boolean;
    onBack: () => any;
    onFinish: (
        codefAccounts: CodefAccountDto[],
        failedCompanies: CodefApiAccountItemDto[],
        afterAccountCreated: boolean,
    ) => any;
}

/**
 * 홈페이지계정으로 자산 불러오기 Flow
 * ---
 * - 선택된 기관에 등록된 계정이 존재하는지 확인하고
 * - 계정이 있으면 계정들을 반환합니다. (단일 기관에서 복수개의 계정 운영가능)
 * - 만약 연결된 기관이 없으면 계정을 등록하고 기관을 연결해 반환합니다.
 */
export const AssetConnectByAccountFlow = memo((props: AssetConnectByAccountFlowProps) => {
    const {isAppendable = false, onBack, onFinish} = props;
    const orgId = useOrgIdParam();
    const [selectedCompany, setSelectedCompany] = useState<CardAccountsStaticData>();
    const {codefAccounts, isFetchedAfterMount, refetch} = useCodefAccountsInConnectorV2(orgId);

    const companyCodes = useMemo(() => CardAccountsStaticData.all().map((company) => company.param), []);
    const cardAccounts = codefAccounts.filter((account) => {
        // @ts-ignore
        if (!companyCodes.includes(account.organization)) return false;
        if (selectedCompany && selectedCompany.param !== account.organization) return false;
        return account.loginType === CodefLoginType.IdAccount;
    });

    const createAccountAllowed =
        isAppendable || (!!selectedCompany && isFetchedAfterMount && cardAccounts.length === 0);

    useUnmount(() => {
        setSelectedCompany(undefined);
    }, []);

    useEffect(() => {
        if (isAppendable) return;
        if (!selectedCompany) return;
        if (!isFetchedAfterMount) return;
        if (cardAccounts.length > 0) {
            onFinish(cardAccounts, [], false);
        }
    }, [isAppendable, selectedCompany, isFetchedAfterMount, cardAccounts]);

    return (
        <>
            {/* 연동할 기관 선택 */}
            {!selectedCompany && (
                <SelectCompanyStep
                    createMoreAccountContext={false}
                    codefAccounts={cardAccounts}
                    onBack={onBack}
                    onNext={setSelectedCompany}
                    reload={() => refetch()}
                />
            )}

            {/* 홈페이지계정 등록 플로우 (계정등록) */}
            {selectedCompany && createAccountAllowed && (
                <CreateCodefAccountByAccountFlow
                    company={selectedCompany}
                    onBack={() => setSelectedCompany(undefined)}
                    onFinish={() => {
                        codefAccountApi
                            .index(orgId, {
                                where: {
                                    loginType: CodefLoginType.IdAccount,
                                    organization: selectedCompany.param,
                                },
                                sync: false,
                                itemsPerPage: 0,
                            })
                            .then((res) => res.data.items)
                            .then((codefAccounts) => onFinish(codefAccounts, [], true))
                            .catch(errorToast);
                    }}
                />
            )}

            {/*/!* 등록된 스코디 카드 중 구독을 불러오고 싶은 카드를 선택 *!/*/}
            {/*{step === ConnectByAccountStep.connectSuccessAssetSelectStep && (*/}
            {/*    <ConnectSuccessAssetSelectStep*/}
            {/*        setStep={() => setStep(ConnectByAccountStep.selectAssetConnectLoadingStep)}*/}
            {/*        codefCards={codefCards}*/}
            {/*        selectedCodefCards={selectedCodefCards}*/}
            {/*        setSelectedCodefCards={setSelectedCodefCards}*/}
            {/*    />*/}
            {/*)}*/}

            {/*/!* 선택된 카드들의 코드에프 결제내역 조회(등록 및 연동) 후 성공페이지로 이동 *!/*/}
            {/*{step === ConnectByAccountStep.selectAssetConnectLoadingStep && (*/}
            {/*    <ConnectAssetsStep*/}
            {/*        title="선택한 자산을 기준으로 구독을 찾고 있어요"*/}
            {/*        codefAssets={selectedCodefCards}*/}
            {/*        onNext={(results) => {*/}
            {/*            setStep(ConnectByAccountStep.accountConnectStep);*/}
            {/*        }}*/}
            {/*    />*/}
            {/*)}*/}
        </>
    );
});
