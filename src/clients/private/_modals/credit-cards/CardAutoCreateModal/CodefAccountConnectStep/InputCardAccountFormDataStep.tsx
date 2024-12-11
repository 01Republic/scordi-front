import React, {memo} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {FaChevronLeft} from 'react-icons/fa6';
import {OutLink} from '^components/OutLink';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';

interface InputCardAccountFormDataStepProps {
    cardCompany: CardAccountsStaticData;
    form: UseFormReturn<CreateAccountRequestDto>;
    onBack: () => any;
    onSubmit: (dto: CreateAccountRequestDto) => any;
    isLoading: boolean;
    errorMessages: string[];
}

export const InputCardAccountFormDataStep = memo((props: InputCardAccountFormDataStepProps) => {
    const {cardCompany, onBack} = props;
    const {form, onSubmit, isLoading, errorMessages} = props;

    // Ref: NewCodefCardAccountPage.tsx

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-stretch h-full">
            <div className="mb-4">
                <div className="mb-4">
                    <FaChevronLeft className="text-gray-400 cursor-pointer" onClick={onBack} />
                </div>
                <p className="font-medium text-12 text-scordi mb-1">{cardCompany.displayName}에서 등록하기</p>
                <h3 className="font-bold text-xl leading-tight">
                    카드사의 로그인 계정을 <br /> 입력해주세요.
                </h3>
            </div>

            <div className="py-4 flex flex-col gap-4 items-stretch">
                <ul
                    className={`${
                        errorMessages.length ? '' : 'hidden'
                    } list-disc rounded-lg bg-red-200 pl-6 py-3 text-12 text-red-700 animate-shake`}
                >
                    {errorMessages.map((msg, i) => (
                        <li key={i}>{msg}</li>
                    ))}
                </ul>

                <label>
                    <p className="text-12 text-gray-500 mb-1.5">{cardCompany.displayName} 홈페이지 아이디</p>
                    <input
                        id="account-id"
                        type="text"
                        className="input border-gray-200 bg-gray-100 text-16 w-full"
                        {...form.register('id')}
                        autoComplete="one-time-code"
                        disabled={isLoading}
                        required
                    />
                </label>

                <label>
                    <p className="text-12 text-gray-500 mb-1.5">{cardCompany.displayName} 홈페이지 비밀번호</p>
                    <input
                        id="account-pw"
                        type="password"
                        className="input border-gray-200 bg-gray-100 text-16 w-full"
                        {...form.register('password')}
                        autoComplete="new-password"
                        disabled={isLoading}
                        required
                    />
                </label>

                <div>
                    <OutLink href={cardCompany.loginPageUrl} text="아이디/비밀번호 확인하기" className="text-14" />
                </div>
            </div>

            <div className="py-4 mt-auto -mb-4">
                <button
                    type="submit"
                    className={`btn btn-block btn-scordi ${
                        isLoading ? 'btn-disabled !bg-scordi !text-white opacity-30' : ''
                    } no-animation btn-animation`}
                >
                    불러오기
                </button>
            </div>
        </form>
    );
});
InputCardAccountFormDataStep.displayName = 'InputCardAccountFormDataStep';
