import React, {memo} from 'react';
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
import {CodefApiResultCode} from '^models/CodefAccount/codef-common';
import {Sequence, SequenceStep} from '^utils/TypeWritter/Sequence';
import {WithLoopText} from '^utils/TypeWritter';
import {LoadingScreen2} from '../../connect-steps/common/LoadingScreen';

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
    const percentage = totalCount > 0 ? Math.ceil((finishedCount / totalCount) * 100) : 0;

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
                        CodefApiResultCode.ALREADY_REGISTERED_COMPANY_IN_CONNECT_ID, // 이미 연결된 기관 (=> 에러 안보여주고 바로 디비에서 꺼내서 연결된내용 보여줌)
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

    /** 공동인증서로 기관 계정 등록 진행중 상태 */
    return (
        <LoadingScreen2
            message={(() => (
                <Sequence
                    steps={[
                        (props) => (
                            <SequenceStep delay={3000} {...props}>
                                <WithLoopText text="안전한 연결을 확인하고 있어요" absolute />
                            </SequenceStep>
                        ), // 3s
                        (props) => (
                            <SequenceStep delay={5000} {...props}>
                                <WithLoopText text="선택한 기관에서 인증서를 확인하고 있어요" absolute />
                            </SequenceStep>
                        ), // 8s
                        (props) => (
                            <SequenceStep delay={3000} {...props}>
                                <WithLoopText text="인증서를 통해 계좌와 카드를 찾고 있어요" absolute />
                            </SequenceStep>
                        ), // 11s
                        (props) => (
                            <SequenceStep delay={10000} {...props}>
                                <WithLoopText text="최신 정보를 불러오고 있어요" absolute />
                            </SequenceStep>
                        ), // 21s
                        (props) => (
                            <SequenceStep delay={10000} {...props}>
                                <WithLoopText text="데이터를 정리하고 있어요" absolute />
                            </SequenceStep>
                        ), // 31s
                        (props) => (
                            <SequenceStep delay={19000} {...props}>
                                <WithLoopText text="거의 다 마쳤어요 잠시만 기다려주세요" absolute />
                            </SequenceStep>
                        ), // 50s
                    ]}
                />
            ))()}
            percentage={percentage}
            onFinish={() => onNext(createdAccountIds, failedCompanies, results)}
            minTimeout={3 * 1000}
        />
    );
});
