import React, {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useRouter} from 'next/router';
import {LinkTo} from '^components/util/LinkTo';
import {V3OrgConnectsPageRoute} from '^pages/v3/orgs/[orgId]/connects';
import {codefAccountApi} from '^models/CodefAccount/api';
import {
    CodefCardCompanyCode,
    CodefClientTypeLevel,
    CodefLoginTypeLevel,
    CodefRequestBusinessType,
} from '^models/CodefAccount/type/enums';
import {codefErrorCodeToMsg, CodefResponse} from '^models/CodefAccount/codef-common';
import {AccountCreatedResponseDto} from '^models/CodefAccount/type/create-account.response.dto';
import {ApiErrorResponse} from '^api/api';
import {useForm} from 'react-hook-form';
import {
    CreateAccountRequestDto,
    encryptCodefAccountPassword,
} from '^models/CodefAccount/type/create-account.request.dto';
import {V3OrgConnectedCardListPageRoute} from '^pages/v3/orgs/[orgId]/connects/card-accounts/[connectMethod]/cards';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {plainToast as toast} from '^hooks/useToast';
import {useCodefAccountsAlreadyIs} from '^models/CodefAccount/hook';
import {OutLink} from '^components/OutLink';
import {ArrowLeft} from 'lucide-react';

export const NewCodefCardAccountPage = memo(function CardBeforeConnectPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const router = useRouter();
    const [isClicked, setIsClicked] = useState(false);
    const connectMethod = CardAccountsStaticData.findOne(router.query.connectMethod as string);
    const form = useForm<CreateAccountRequestDto>();
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const {search: checkCodefAccounts} = useCodefAccountsAlreadyIs();

    const checkExists = (organization: CodefCardCompanyCode) => {
        checkCodefAccounts({where: {organization}}, false, true).then((result) => {
            if (!result) {
                setTimeout(() => checkExists(organization), 1000);
                return;
            }
            const [accountExisted] = result.items;
            if (accountExisted) {
                toast.error('기존에 등록된 계정으로 이동합니다', {
                    duration: 3000,
                });
                setTimeout(() => {
                    router.replace(V3OrgConnectedCardListPageRoute.path(orgId, accountExisted.id));
                }, 3000);
            }
        });
    };

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        if (!connectMethod || !router.isReady) return;
        checkExists(connectMethod.param);
    }, [router.isReady, orgId, connectMethod]);

    if (!connectMethod) return <></>;

    const {logo, displayName: cardName, loginPageUrl} = connectMethod;
    const redirectTo = (codefAccount: CodefAccountDto) => {
        router.replace(V3OrgConnectedCardListPageRoute.path(orgId, codefAccount.id));
    };

    const onSubmit = (dto: CreateAccountRequestDto) => {
        setIsClicked(true);
        setErrorMessages([]);

        codefAccountApi
            .create(orgId, {
                ...dto,
                businessType: CodefRequestBusinessType.Card,
                organization: connectMethod.param,
                clientType: connectMethod.clientType,
                loginType: connectMethod.loginType,
                id: dto.id,
                password: encryptCodefAccountPassword(dto.password, dto.id),
            })
            .then((res) => {
                return redirectTo(res.data.accessList[0]);
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
                        redirectTo(codefError.data.accessList[0]);
                        return;
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
            .finally(() => {
                setIsClicked(false);
            });
    };

    return (
        <div className="py-10">
            <header className="mb-8 px-12">
                <div className="mb-12 max-w-md">
                    <LinkTo
                        href={V3OrgConnectsPageRoute.path(orgId)}
                        className="flex items-center text-gray-500 hover:underline gap-2"
                    >
                        <ArrowLeft /> 처음으로
                    </LinkTo>
                </div>

                <div className="mb-4 flex items-start justify-between max-w-md">
                    <img src={logo} alt={cardName} className="avatar w-[48px] h-[48px] bg-white" />

                    <div></div>
                </div>

                <h1 className="max-w-md">
                    {cardName}
                    <span className="text-gray-400">로 부터</span> <br />{' '}
                    <span className="text-gray-400">구독 지출을 불러옵니다</span>
                </h1>
            </header>

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <section className="px-12 flex flex-col gap-10">
                    <div className="w-full max-w-md flex flex-col gap-6">
                        {!!errorMessages.length && (
                            <div className="alert bg-red-200 text-red-700">
                                <ul className="list-disc pl-4 text-13">
                                    {errorMessages.map((msg, i) => (
                                        <li key={i}>{msg}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {connectMethod.param === CodefCardCompanyCode.신한카드 && (
                            <div className="grid grid-cols-2 gap-2">
                                <label>
                                    <p className="text-16 mb-1.5">계정 종류</p>
                                    <select
                                        {...form.register('loginTypeLevel')}
                                        defaultValue={CodefLoginTypeLevel.ADMIN}
                                        autoComplete="one-time-code"
                                        className="select select-bordered w-full text-16 font-[400]"
                                        required
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
                                        defaultValue={CodefClientTypeLevel.CREDIT_CARD}
                                        autoComplete="one-time-code"
                                        className="select select-bordered w-full text-16 font-[400]"
                                        required
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
                                disabled={isClicked}
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
                                disabled={isClicked}
                                required
                            />
                        </div>

                        <div className="">
                            <OutLink text="아이디/비밀번호 확인하기" href={loginPageUrl} className="text-16" />
                        </div>
                    </div>

                    <div className="max-w-md">
                        <button
                            className={`btn btn-lg min-w-[200px] ${isClicked ? 'loading bg-gray-200' : 'btn-scordi'}`}
                        >
                            {isClicked ? '' : '불러오기'}
                        </button>
                    </div>
                </section>
            </form>
        </div>
    );
});
