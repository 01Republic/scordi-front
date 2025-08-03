import {LoadingScreen2} from '^_components/pages/assets/connect-steps/common/LoadingScreen';
import {useOrgIdParam} from '^atoms/common';
import {BankAccountDto} from '^models/BankAccount/type';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CreditCardDto} from '^models/CreditCard/type';
import {useCreateAssets, useSyncCodefAssets} from '^models/_codef/hooks';
import {WithLoopText} from '^utils/TypeWritter';
import {Sequence, SequenceStep} from '^utils/TypeWritter/Sequence';
import {isDefinedValue} from '^utils/array';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {Typewriter} from 'react-simple-typewriter';
import {ConnectAssetsStepStrategy} from '../../AssetConnectPageTemplate';

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
    const {t} = useTranslation('assets');
    const {strategy, codefAssets, onNext, title = ''} = props;
    const orgId = useOrgIdParam();

    const results =
        strategy === ConnectAssetsStepStrategy.SyncSubscriptions
            ? useSyncCodefAssets(orgId, codefAssets)
            : useCreateAssets(orgId, codefAssets);
    const scordiAssets = results.map((result) => result.data).filter(isDefinedValue);

    const totalCount = results.length;
    const finishedCount = results.filter((result) => result.isFetched).length;
    const percentage = totalCount > 0 ? Math.ceil((finishedCount / totalCount) * 100) : 0;

    /** 결제내역 불러오고 구독 파싱하는 중인 상태 */
    return (
        <LoadingScreen2
            message={(() => (
                <Sequence
                    steps={[
                        (props) => (
                            <SequenceStep delay={5000} {...props}>
                                <WithLoopText text={t('connectSteps.connectAssets.checkingAssets')} absolute />
                            </SequenceStep>
                        ), // 5s
                        (props) => (
                            <SequenceStep delay={15000} {...props}>
                                <WithLoopText text={t('connectSteps.connectAssets.filteringTransactions')} absolute />
                            </SequenceStep>
                        ), // 20s
                        (props) => (
                            <SequenceStep delay={15000} {...props}>
                                <WithLoopText text={t('connectSteps.connectAssets.checkingServices')} absolute />
                            </SequenceStep>
                        ), // 35s
                        (props) => (
                            <SequenceStep delay={25000} {...props}>
                                <WithLoopText text={t('connectSteps.connectAssets.checkingCarefully')} absolute />
                            </SequenceStep>
                        ), // 50s
                        (props) => (
                            <SequenceStep delay={10000} {...props}>
                                <WithLoopText text={t('connectSteps.connectAssets.finalCheck')} absolute />
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
                                        <Typewriter words={[t('connectSteps.connectAssets.syncing')]} />
                                    </SequenceStep>
                                ), // 10s
                                (props) => (
                                    <SequenceStep delay={20000} {...props}>
                                        <Typewriter words={[t('connectSteps.connectAssets.maxOneMinute')]} />
                                    </SequenceStep>
                                ), // 30s
                                (props) => (
                                    <SequenceStep delay={70000} {...props}>
                                        <Typewriter words={[t('connectSteps.connectAssets.searchingHard')]} />
                                    </SequenceStep>
                                ), // 100s -> loop
                            ]}
                            loop
                        />
                    </div>
                )
            }
        />
    );
});
