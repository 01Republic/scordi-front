import {memo} from 'react';
import {isDefinedValue} from '^utils/array';
import {useOrgIdParam} from '^atoms/common';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {CreditCardDto} from '^models/CreditCard/type';
import {BankAccountDto} from '^models/BankAccount/type';
import {useSyncCodefAssets} from '^models/_codef/hooks';
import {LoadingScreen2} from '^_components/pages/assets/connect-steps/common/LoadingScreen';

interface ConnectAssetsStepProps {
    codefAssets: (CodefBankAccountDto | CodefCardDto)[];
    onNext: (results: (CreditCardDto | BankAccountDto)[]) => any;
    title?: string;
}

/**
 * 자산 연동중p : 스코디 자산으로 선택한 목록들을 연동 및 sync 요청 후 성공 시 성공페이지로 넘김
 */
export const ConnectAssetsStep = memo((props: ConnectAssetsStepProps) => {
    const {codefAssets, onNext, title = ''} = props;
    const orgId = useOrgIdParam();

    const results = useSyncCodefAssets(orgId, codefAssets);

    const totalCount = results.length;
    const finishedCount = results.filter((result) => result.isFetched).length;

    // const successes = results.filter((result) => !result.isError);
    // const failures = results.filter((result) => result.isError);
    // const errors = results.map((result) => result.error).filter(isDefinedValue);
    const scordiAssets = results.map((result) => result.data).filter(isDefinedValue);

    return (
        <LoadingScreen2
            message={title || `선택한 계좌와 카드를 기준으로 구독을 찾고 있어요`}
            percentage={totalCount > 0 ? Math.ceil((finishedCount / totalCount) * 100) : 0}
            onFinish={() => onNext(scordiAssets)}
            minTimeout={5 * 1000}
        />
    );
});
