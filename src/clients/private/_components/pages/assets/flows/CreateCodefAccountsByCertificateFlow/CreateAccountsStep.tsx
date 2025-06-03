import {memo} from 'react';
import {useFormContext} from 'react-hook-form';
import {UseQueryResult} from '@tanstack/react-query';
import {ApiErrorResponse} from '^api/api';
import {encryptValue} from '^utils/crypto';
import {isDefinedValue} from '^utils/array';
import {useOrgIdParam} from '^atoms/common';
import {
    AccountCreatedResponseDto,
    CodefAccountCreateErrorResponseDto,
} from '^models/CodefAccount/type/create-account.response.dto';
import {useCreateCodefAccounts} from '^models/CodefAccount/hook';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {CodefCompanyStaticData} from '^models/CodefAccount/type/CodefCompanyStaticData';
import {CodefApiAccountItemDto} from '^models/CodefAccount/type/CodefApiAccountItemDto';
import {LoadingScreen2} from '../../connect-steps/common/LoadingScreen';
import {CodefApiResultCode} from '^models/CodefAccount/codef-common';

interface CreateAccountsStepProps {
    companies: CodefCompanyStaticData[];
    onNext: (
        createdAccountIds: number[],
        failedCompanies: CodefApiAccountItemDto[],
        queryResults: UseQueryResult<AccountCreatedResponseDto, ApiErrorResponse<CodefAccountCreateErrorResponseDto>>[],
    ) => any;
}

/**
 * 계정 등록 진행중 페이지
 */
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

    // const successes = results.filter((result) => !result.isError);
    // const failures = results.filter((result) => result.isError);
    const successes = results.map((result) => result.data).filter(isDefinedValue);
    const failures = results.map((result) => result.error).filter(isDefinedValue);

    const createdAccountIds = (() => {
        const codefAccounts = successes.flatMap((dto) => dto.accessList);
        return Array.from(new Set(codefAccounts.map((codefAccount) => codefAccount.id)));
    })();
    const failedCompanies = (() => {
        const errorList1 = successes.flatMap((dto) => dto.errorList);
        const errorList2 = failures.flatMap((error) => error?.response?.data?.data?.data.errorList);
        return [...errorList1, ...errorList2]
            .filter((error) => {
                if (!error) return false;
                if (
                    [
                        CodefApiResultCode.ALREADY_REGISTERED_COMPANY_IN_CONNECT_ID,
                        CodefApiResultCode.SERVICE_NOT_FOUND,
                        CodefApiResultCode.UNREGISTERED_CERTIFICATE,
                        CodefApiResultCode.UNREGISTERED_OR_DELETED_CERTIFICATE,
                        CodefApiResultCode.CERTIFICATION_CREATE_FAILED,
                        CodefApiResultCode.ORG_NOT_FOUND,
                        CodefApiResultCode.CHECK_ORG_AGAIN,
                    ].includes(error.code)
                ) {
                    return false;
                }

                if (error.code === CodefApiResultCode.BAD_REQUEST && error.extraMessage.includes('기관코드')) {
                    return false;
                }

                return true;
            })
            .filter(isDefinedValue);
    })();

    return (
        <LoadingScreen2
            message={'은행사 또는 카드사를 기준으로 계좌와 카드를 찾고 있어요'}
            percentage={totalCount > 0 ? Math.ceil((finishedCount / totalCount) * 100) : 0}
            onFinish={() => onNext(createdAccountIds, failedCompanies, results)}
            minTimeout={3 * 1000}
        />
    );
});
