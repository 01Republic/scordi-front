import React, {memo, useEffect, useState} from 'react';
import {useOrgIdParam} from '^atoms/common';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {StatusHeader} from '^_components/pages/assets/connect-steps/common/StatusHeader';
import {
    CodefCardCompanyCode,
    CodefClientTypeLevel,
    CodefLoginType,
    CodefLoginTypeLevel,
    CodefRequestBusinessType,
} from '^models/CodefAccount/type/enums';
import {OutLink} from '^components/OutLink';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {useFormContext} from 'react-hook-form';
import {codefAccountApi} from '^models/CodefAccount/api';
import {encryptValue} from '^utils/crypto';
import {ApiErrorResponse} from '^api/api';
import {codefErrorCodeToMsg, CodefResponse} from '^models/CodefAccount/codef-common';
import {AccountCreatedResponseDto} from '^models/CodefAccount/type/create-account.response.dto';
import {plainToast as toast} from '^hooks/useToast';
import {PureLayoutContainer} from '^clients/private/_layouts/PureLayout/PureLayoutContainer';
import {LoopText} from '^utils/TypeWritter';

interface NewCardAccountStepProps {
    company: CardAccountsStaticData;
    onBack: () => any;
    onNext: (codefAccountIds: number[]) => any;
}

/**
 * 계정 유무 확인 및 로그인 페이지
 */
export const NewCardAccountStep = memo((props: NewCardAccountStepProps) => {
    const {company, onBack, onNext} = props;
    const orgId = useOrgIdParam();
    const [isLoading, setIsLoading] = useState(false);
    const form = useFormContext<CreateAccountRequestDto>();
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    useEffect(() => {
        form.setValue('id', '');
        form.setValue('password', '');
        if (company.param === CodefCardCompanyCode.신한카드) {
            form.setValue('loginTypeLevel', CodefLoginTypeLevel.ADMIN);
            form.setValue('clientTypeLevel', CodefClientTypeLevel.CREDIT_CARD);
        } else {
            form.setValue('loginTypeLevel', undefined);
            form.setValue('clientTypeLevel', undefined);
        }
    }, [company]);

    const cardName = company.displayName;

    const onSubmit = (dto: CreateAccountRequestDto) => {
        setErrorMessages([]);

        setIsLoading(true);
        codefAccountApi
            .create(orgId, {
                ...dto,
                businessType: CodefRequestBusinessType.Card,
                organization: company.param,
                clientType: company.clientType,
                loginType: company.loginType,
                id: dto.id,
                password: encryptValue(dto.password, dto.id),
            })
            .then((res) => {
                const {accessList = []} = res.data;
                const companyAccounts = accessList.filter(({organization: param}) => param === company.param);
                const companyAccountIds = companyAccounts.map((item) => item.id);
                form.reset({loginType: CodefLoginType.IdAccount});
                onNext(companyAccountIds);
            })
            .catch((err: ApiErrorResponse<CodefResponse<AccountCreatedResponseDto>>) => {
                const apiError = err.response?.data;
                if (!apiError) return console.error('[codef] apiError is not defined.', err);

                /**
                 * 비즈니스로직 상의 에러인지 확인
                 * - 비즈니스로직의 에러가 아닌 것들을 걸러냅니다.
                 * - 비즈니스로직이 아닌 경우: 네트워크 에러 등
                 */
                const codefError = apiError.data;
                console.log('codefError', codefError);
                if (!codefError) return console.error('[codef] codefError is not defined.', err);

                if (!codefError.result) {
                    /**
                     * 이 곳에서는 순수하게 스코디 비즈니스로직에 의해 발생된 예외만 다룹니다.
                     * 코드에프에서 전달받은 예외는 else 범위 내에서 분기하여 처리됩니다.
                     */
                    if (codefError.data.connectedId && codefError.data.accessList.length) {
                        // 이미 등록된 계정인 경우.
                        return onNext(codefError.data.accessList.map((item) => item.id));
                    }

                    // at least, Unhandled
                    const msg = `[codef] Scordi service exception erupted.\nIt must be handled by catch scope`;
                    console.warn(msg, codefError);
                    return;
                } else {
                    /**
                     * 이 곳에서는 순수하게 코드에프로부터 전달받은 예외에 대해서만 다룹니다.
                     */
                    console.warn(`[codef] ${codefError.result.message}`, codefError);
                    toast.error(codefError.result.message);
                    setErrorMessages(() => {
                        return (codefError.data.errorList || []).map((errorObj) => {
                            return codefErrorCodeToMsg(errorObj.code) || errorObj.message;
                        });
                    });
                }
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <PureLayout>
            <PureLayoutContainer className="flex flex-col gap-10">
                <StatusHeader
                    className="gap-14"
                    title={
                        <div>
                            <div className="mb-4">
                                <img
                                    src={company.logo}
                                    alt={company.displayName}
                                    className="avatar w-[48px] h-[48px] bg-white"
                                    data-aos="fade-up"
                                    data-aos-anchor-placement="center-bottom"
                                />
                            </div>
                            {!!errorMessages.length ? (
                                <h1 className="text-3xl text-gray-400">
                                    <span className="text-black">{cardName}</span>
                                    의 계정을
                                    <br /> 다시 확인해주세요
                                </h1>
                            ) : isLoading ? (
                                <h1 className="text-3xl text-gray-400">
                                    <span className="text-black">{cardName}</span>
                                    에
                                    <br /> 로그인 하고있어요
                                    <LoopText text="..." />
                                </h1>
                            ) : (
                                <h1
                                    className="text-3xl text-gray-400"
                                    data-aos="fade-up"
                                    data-aos-anchor-placement="center-bottom"
                                    data-aos-delay="100"
                                >
                                    <span className="text-black">{cardName}</span>
                                    로 부터
                                    <br /> 자산을 불러올게요
                                </h1>
                            )}
                        </div>
                    }
                    onBack={onBack}
                />

                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <section className="w-full max-w-md px-1 flex flex-col gap-10">
                        <div className="flex flex-col gap-6">
                            {!!errorMessages.length && (
                                <div className="alert bg-red-200 text-red-700">
                                    <ul className="list-disc pl-4 text-13">
                                        {errorMessages.map((msg, i) => (
                                            <li key={i}>{msg}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {company.param === CodefCardCompanyCode.신한카드 && (
                                <div className="grid grid-cols-2 gap-2">
                                    <label>
                                        <p className="text-16 mb-1.5">계정 종류</p>
                                        <select
                                            {...form.register('loginTypeLevel')}
                                            autoComplete="one-time-code"
                                            className="select select-bordered w-full text-16 font-[400]"
                                            required
                                            disabled={isLoading}
                                        >
                                            {[
                                                [CodefLoginTypeLevel.USER, '이용자'],
                                                [CodefLoginTypeLevel.BRANCH, '사업장/부서관리자'],
                                                [CodefLoginTypeLevel.ADMIN, '총괄관리자'],
                                            ].map(([loginTypeLevel, labelText], i) => (
                                                <option value={loginTypeLevel} key={i}>
                                                    {labelText}
                                                </option>
                                            ))}
                                        </select>
                                    </label>

                                    <label>
                                        <p className="text-16 mb-1.5">회원 구분</p>
                                        <select
                                            {...form.register('clientTypeLevel')}
                                            autoComplete="one-time-code"
                                            className="select select-bordered w-full text-16 font-[400]"
                                            required
                                            disabled={isLoading}
                                        >
                                            {[
                                                [CodefClientTypeLevel.CREDIT_CARD, '신용카드회원'],
                                                [CodefClientTypeLevel.CHECK_CARD, '체크카드회원'],
                                                [CodefClientTypeLevel.RnD_CREDIT_CARD, '연구비신용카드회원'],
                                                [CodefClientTypeLevel.PRE_PLUS, '프리플러스회원'],
                                            ].map(([clientTypeLevel, labelText], i) => (
                                                <option value={clientTypeLevel} key={i}>
                                                    {labelText}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                            )}

                            <div className="flex flex-col gap-2">
                                <label htmlFor="account-id" className="block text-16">
                                    {cardName} 홈페이지 아이디
                                </label>
                                <input
                                    id="account-id"
                                    {...form.register('id')}
                                    type="text"
                                    autoComplete="one-time-code"
                                    className="input w-full input-bordered"
                                    disabled={isLoading}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="account-pw" className="block text-16">
                                    {cardName} 홈페이지 비밀번호
                                </label>
                                <input
                                    id="account-pw"
                                    {...form.register('password')}
                                    type="password"
                                    autoComplete="new-password"
                                    className="input w-full input-bordered"
                                    disabled={isLoading}
                                    required
                                />
                            </div>

                            <div className="">
                                <OutLink
                                    text="아이디/비밀번호 확인하기"
                                    href={company.loginPageUrl}
                                    className="text-16"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2">
                            <button
                                type="submit"
                                className={`btn btn-block no-animation btn-animation ${
                                    isLoading ? 'loading bg-gray-200' : 'btn-scordi'
                                }`}
                            >
                                {isLoading ? '' : '불러오기'}
                            </button>
                        </div>
                    </section>
                </form>
            </PureLayoutContainer>
        </PureLayout>
    );
});
