import React, {memo, useEffect, useState} from 'react';
import {useOrgIdParam} from '^atoms/common';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {CreditCardDto} from '^models/CreditCard/type';
import {BankAccountDto} from '^models/BankAccount/type';
import {useCreateAssets, useSyncCodefAssets} from '^models/_codef/hooks';
import {LoadingScreen2} from '^_components/pages/assets/connect-steps/common/LoadingScreen';
import {Sequence, SequenceStep} from '^utils/TypeWritter/Sequence';
import {WithLoopText} from '^utils/TypeWritter';
import {Typewriter} from 'react-simple-typewriter';
import {ConnectAssetsStepStrategy} from '../../AssetConnectPageTemplate';
import {confirm3} from '^components/util/dialog/confirm3';
import {confirmed} from '^components/util/dialog';
import {errorToast} from '^api/api';
import {useBankAccountFinalHistories} from '^models/CodefBankAccount/hook';
import {useCardAccountFinalHistories} from '^models/CodefCard/hook';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {useRouter} from 'next/router';

interface ConnectAssetsStepProps {
    strategy: ConnectAssetsStepStrategy;
    codefAssets: (CodefBankAccountDto | CodefCardDto)[];
    onNext: (results: (CreditCardDto | BankAccountDto)[]) => any;
    title?: string;
}

/**
 * 자산 연동중p : 스코디 자산으로 선택한 목록들을 연동 및 sync 요청 후 성공 시 성공페이지로 넘김
 */
export const ConnectAssetsStep = memo((props: ConnectAssetsStepProps) => {
    const {strategy, codefAssets, onNext, title = ''} = props;
    const router = useRouter();
    const orgId = useOrgIdParam();
    const [isShowLeaveButton, setIsShowLeaveButton] = useState(false);

    const {results, notStartedBankIds, notStartedCardIds, startedBankIds, startedCardIds} =
        strategy === ConnectAssetsStepStrategy.SyncSubscriptions
            ? useSyncCodefAssets(orgId, codefAssets)
            : useCreateAssets(orgId, codefAssets);

    const {mutateAsync: mutateBankAccountFinalHistory} = useBankAccountFinalHistories(orgId);
    const {mutateAsync: mutateCardAccountFinalHistory} = useCardAccountFinalHistories(orgId);

    const scordiAssets = results.flatMap((result) => {
        if (!result.data) return [];
        return Array.isArray(result.data) ? result.data : [result.data];
    });

    const totalCount = results.length;
    const finishedCount = results.filter((result) => result.isFetched).length;
    const percentage = totalCount > 0 ? Math.ceil((finishedCount / totalCount) * 100) : 0;

    const startedFetching = results.some((r) => r.isFetching);

    const onDisconnect = async () => {
        const leavePageConfirm = () =>
            confirm3(
                '페이지를 나갈까요?',
                <span className="text-16 text-gray-800 font-normal">
                    페이지를 나가도 동기화는 계속 진행됩니다.
                    <br />
                    완료되면 <b>알람</b>으로 알려드릴게요.
                    <br />
                    불러온 구독은 <b>구독탭 &gt; 구독리스트</b>에서 확인할 수 있습니다.
                    <br />
                </span>,
            );

        confirmed(leavePageConfirm())
            .then(() => {
                mutateBankAccountFinalHistory({
                    patchCodefBankAccountIds: notStartedBankIds,
                    completeCodefBankAccountIds: startedBankIds,
                    sync: true,
                });
                mutateCardAccountFinalHistory({
                    patchCodefCardIds: notStartedCardIds,
                    completeCodefCardIds: startedCardIds,
                    sync: true,
                });
            })
            .then(() => router.push(OrgMainPageRoute.path(orgId)))
            .catch(errorToast);
    };

    useEffect(() => {
        if (!startedFetching || isShowLeaveButton) return;
        const timeout = setTimeout(() => setIsShowLeaveButton(true), 10 * 1000);
        return () => clearTimeout(timeout);
    }, [startedFetching, isShowLeaveButton]);

    // 탭 닫는경우 api 요청
    useEffect(() => {
        let userIsLeaving = false;

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (results.some((r) => !r.isFetched || r.isLoading)) {
                userIsLeaving = true;
                e.preventDefault();
                e.returnValue = '';
            }
        };

        const handleUnload = () => {
            if (userIsLeaving) {
                mutateBankAccountFinalHistory({
                    patchCodefBankAccountIds: notStartedBankIds,
                    completeCodefBankAccountIds: startedBankIds,
                    sync: true,
                });
                mutateCardAccountFinalHistory({
                    patchCodefCardIds: notStartedCardIds,
                    completeCodefCardIds: startedCardIds,
                    sync: true,
                });
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('pagehide', handleUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('pagehide', handleUnload);
        };
    }, [results, orgId, strategy, codefAssets]);

    /** 결제내역 불러오고 구독 파싱하는 중인 상태 */
    return (
        <LoadingScreen2
            message={(() => (
                <Sequence
                    steps={[
                        (props) => (
                            <SequenceStep delay={5000} {...props}>
                                <WithLoopText text="연동한 자산을 확인하고 있어요" absolute />
                            </SequenceStep>
                        ), // 5s
                        (props) => (
                            <SequenceStep delay={15000} {...props}>
                                <WithLoopText text="결제내역을 추리고 있어요" absolute />
                            </SequenceStep>
                        ), // 20s
                        (props) => (
                            <SequenceStep delay={15000} {...props}>
                                <WithLoopText text="매칭되는 서비스를 확인하고 있어요" absolute />
                            </SequenceStep>
                        ), // 35s
                        (props) => (
                            <SequenceStep delay={25000} {...props}>
                                <WithLoopText text="꼼꼼히 확인하는 중이에요. 잠시만 기다려주세요" absolute />
                            </SequenceStep>
                        ), // 50s
                        (props) => (
                            <SequenceStep delay={10000} {...props}>
                                <WithLoopText text="마지막으로 데이터를 확인하고 있어요" absolute />
                            </SequenceStep>
                        ), // 60s
                    ]}
                />
            ))()}
            percentage={percentage}
            onFinish={() => onNext(scordiAssets)}
            minTimeout={5 * 1000}
            children={
                percentage > 0 ? undefined : (
                    <div className="text-primaryColor-900 text-lg font-medium">
                        <Sequence
                            steps={[
                                (props) => (
                                    <SequenceStep delay={10000} {...props}>
                                        <Typewriter words={['동기화 하는 중']} />
                                    </SequenceStep>
                                ), // 10s
                                (props) => (
                                    <div className="flex flex-col">
                                        <SequenceStep delay={20000} {...props}>
                                            <Typewriter words={['최대 3~5분 정도 소요될 수 있어요']} />
                                        </SequenceStep>
                                    </div>
                                ), // 30s
                                (props) => (
                                    <SequenceStep delay={70000} {...props}>
                                        <Typewriter words={['열심히 찾는 중이에요']} />
                                    </SequenceStep>
                                ), // 100s -> loop
                            ]}
                            loop
                        />
                    </div>
                )
            }
            Button={
                isShowLeaveButton && (
                    <button onClick={() => onDisconnect()} className="btn btn-scordi btn-md btn-block flex-1">
                        나가기
                    </button>
                )
            }
        />
    );
});
