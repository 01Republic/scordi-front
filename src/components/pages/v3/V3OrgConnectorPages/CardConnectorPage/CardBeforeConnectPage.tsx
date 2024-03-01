import {memo, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useRouter} from 'next/router';
import {CardAccountsStaticData} from '^v3/V3OrgConnectsPage/ConnectsPageBody/ConnectCardAccountsSection/card-accounts-static-data';
import {LinkTo} from '^components/util/LinkTo';
import {V3OrgConnectsPageRoute} from '^pages/v3/orgs/[orgId]/connects';
import {FaArrowLeft} from 'react-icons/fa6';
import {codefAccountApi} from '^models/CodefAccount/api';
import {CodefRequestBusinessType} from '^models/CodefAccount/type/enums';
import {CodefResponse} from '^models/CodefAccount/codef-common/CodefResponse';
import {AccountCreatedResponseDto} from '^models/CodefAccount/type/create-account.response.dto';
import {ApiErrorResponse} from '^api/api';
import {useForm} from 'react-hook-form';
import {
    CreateAccountRequestDto,
    encryptCodefAccountPassword,
} from '^models/CodefAccount/type/create-account.request.dto';
import {currentCodefAccountAtom} from './atom';

export const CardBeforeConnectPage = memo(function CardBeforeConnectPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const router = useRouter();
    const [isClicked, setIsClicked] = useState(false);
    const connectMethod = CardAccountsStaticData.findOne(router.query.connectMethod as string);
    const form = useForm<CreateAccountRequestDto>();
    const [currentCodefAccount, setCurrentCodefAccount] = useRecoilState(currentCodefAccountAtom);

    if (!connectMethod) return <></>;

    const {logo, displayName: cardName} = connectMethod;

    const onSubmit = (dto: CreateAccountRequestDto) => {
        setIsClicked(true);

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
                console.log('\n\n\n\n');
                console.log(res);
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
                if (!codefError) return console.error('[codef] codefError is not defined.', err);

                if (!codefError.result) {
                    /**
                     * 이 곳에서는 순수하게 스코디 비즈니스로직에 의해 발생된 예외만 다룹니다.
                     * 코드에프에서 전달받은 예외는 else 범위 내에서 분기하여 처리됩니다.
                     */
                    if (codefError.data.connectedId && codefError.data.accessList.length) {
                        // 이미 등록된 계정인 경우.
                        setCurrentCodefAccount(codefError.data.accessList[0]);
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
                }
            })
            .finally(() => {
                setIsClicked(false);
            });
        // setTimeout(() => {
        //     router.replace(V3OrgConnectedCardListPageRoute.path(orgId, connectMethod.param));
        // }, 1000);
    };

    return (
        <div className="py-10">
            <header className="mb-12 px-12">
                <div className="mb-12">
                    <LinkTo
                        href={V3OrgConnectsPageRoute.path(orgId)}
                        className="flex items-center text-gray-500 hover:underline gap-2"
                    >
                        <FaArrowLeft /> 처음으로
                    </LinkTo>
                </div>

                <img src={logo} alt={cardName} className="avatar w-[48px] h-[48px] bg-white mb-4" />

                <h1>
                    {cardName} <span className="text-gray-400">로 부터</span> <br />{' '}
                    <span className="text-gray-400">구독 지출을 불러옵니다.</span>
                </h1>
            </header>

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <section className="px-12">
                    <div className="mb-14 w-full max-w-md">
                        <div className="mb-8">
                            <label htmlFor="account-id" className="block mb-3 text-16">
                                관리자 아이디
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

                        <div className="mb-8">
                            <label htmlFor="account-pw" className="block mb-3 text-16">
                                관리자 비밀번호
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
