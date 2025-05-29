import {memo, useState} from 'react';
import {UseQueryResult} from '@tanstack/react-query';
import {CodefCompanyStaticData} from '^models/CodefAccount/type/CodefCompanyStaticData';
import {CodefApiAccountItemDto} from '^models/CodefAccount/type/CodefApiAccountItemDto';
import {useUnmount} from '^hooks/useUnmount';
import {
    AccountCreatedResponseDto,
    CodefAccountCreateErrorResponseDto,
} from '^models/CodefAccount/type/create-account.response.dto';
import {ApiErrorResponse} from '^api/api';
import {SelectCompaniesStep} from './SelectCompaniesStep';
import {CreateAccountsStep} from './CreateAccountsStep';

interface CreateCodefAccountsByCertificateFlowProps {
    onFinish: (
        createdAccountIds: number[],
        failedCompanies: CodefApiAccountItemDto[],
        queryResults: UseQueryResult<AccountCreatedResponseDto, ApiErrorResponse<CodefAccountCreateErrorResponseDto>>[],
    ) => any;
}

/**
 * 공동인증서 등록 플로우
 * ---
 * - 기관 선택
 * - 공동인증서 로그인
 * - 계정등록 진행
 * - 완료되면 등록된 계정을 콜백으로 반환
 */
export const CreateCodefAccountsByCertificateFlow = memo((props: CreateCodefAccountsByCertificateFlowProps) => {
    const {onFinish} = props;
    const [selectedCompanies, setSelectedCompanies] = useState<CodefCompanyStaticData[]>([]);

    useUnmount(() => {
        setSelectedCompanies([]);
    }, []);

    return (
        <>
            {/* 연동할 자산 선택 및 공동인증서 로그인 페이지 */}
            {selectedCompanies.length === 0 && <SelectCompaniesStep onNext={setSelectedCompanies} />}

            {/* 계정 등록 진행중 페이지 */}
            {selectedCompanies.length > 0 && <CreateAccountsStep companies={selectedCompanies} onNext={onFinish} />}
        </>
    );
});
CreateCodefAccountsByCertificateFlow.displayName = 'CreateCodefAccountsByCertificateFlow';
