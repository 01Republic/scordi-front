import {memo} from 'react';
import {useFormContext} from 'react-hook-form';
import {UseQueryResult} from '@tanstack/react-query';
import {ApiErrorResponse} from '^api/api';
import {encryptValue} from '^utils/crypto';
import {useOrgIdParam} from '^atoms/common';
import {
    AccountCreatedResponseDto,
    CodefAccountCreateErrorResponseDto,
} from '^models/CodefAccount/type/create-account.response.dto';
import {useCreateCodefAccounts} from '^models/CodefAccount/hook';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {CodefCompanyStaticData} from '^models/CodefAccount/type/CodefCompanyStaticData';
import {LoadingScreen2} from '../../common/LoadingScreen';

interface CreateAccountsStepProps {
    companies: CodefCompanyStaticData[];
    onNext: (
        queryResults: UseQueryResult<AccountCreatedResponseDto, ApiErrorResponse<CodefAccountCreateErrorResponseDto>>[],
    ) => any;
}

export const CreateAccountsStep = memo((props: CreateAccountsStepProps) => {
    const {companies, onNext} = props;
    const orgId = useOrgIdParam();
    const form = useFormContext<CreateAccountRequestDto>();
    const formData = form.getValues();

    // 기관별 계정 생성 요청
    const results = useCreateCodefAccounts(orgId, companies, () => {
        const password = encryptValue(formData.password, formData.id);
        return {...formData, password};
    });

    const totalCount = results.length;
    const finishedCount = results.filter((result) => result.isFetched).length;

    return (
        <LoadingScreen2
            message={'은행사 또는 카드사를 기준으로 계좌와 카드를 찾고 있어요'}
            percentage={totalCount > 0 ? Math.ceil((finishedCount / totalCount) * 100) : 0}
            onFinish={() => onNext(results)}
            minTimeout={3 * 1000}
        />
    );
});
