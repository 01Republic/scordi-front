import React, {memo} from 'react';
import {useFormContext} from 'react-hook-form';
import cn from 'classnames';
import {CodefLoginType} from '^models/CodefAccount/type/enums';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {LottieNoSSR} from '^components/LottieNoSSR';
import {AssetAgreeTermSection} from './AssetAgreeTermSection';

export const AssetCreateMethodSelect = memo(() => {
    const {setValue, watch} = useFormContext<CreateAccountRequestDto>();
    const isEnabled = watch('isAgreeForPrivacyPolicyTerm') && watch('isAgreeForServiceUsageTerm');

    return (
        <article className="w-full flex flex-col">
            <div className="flex flex-col gap-16">
                <section className="flex flex-col gap-10">
                    <div className="flex items-center gap-2">
                        <LottieNoSSR
                            src="https://lottie.host/8c19c94c-ca36-442d-b83f-f39e2dbbaf1b/sF9j9NcRar.lottie"
                            loop
                            autoplay
                            className="w-[82px] h-24"
                            layout={{fit: 'fill'}}
                        />

                        <div className="text-14 font-normal text-gray-500">
                            데이터 암호화 통신 <br />
                            KISA 보안점검
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <span className="text-28 text-gray-900 font-semibold">자산을 연동해 볼까요?</span>
                        <span className="text-15 text-gray-600 font-normal whitespace-pre-line">
                            공동인증서를 연동해 사업용으로 쓰고있는 카드의 입출금 내역을 자동으로 조회할 수 있어요.
                        </span>
                    </div>

                    <AssetAgreeTermSection />
                </section>

                {/* 동의 받기 */}
                <section className="flex flex-col gap-2 w-full mt-5">
                    <button
                        type="button"
                        className={cn('btn btn-block no-animation btn-animation', {
                            'btn-scordi': isEnabled,
                            'btn-disabled2': !isEnabled,
                        })}
                        onClick={() => (isEnabled ? setValue('loginType', CodefLoginType.Certificate) : undefined)}
                    >
                        공동인증서로 한번에 연동
                    </button>

                    <button
                        type="button"
                        className="btn btn-block btn-secondary no-animation btn-animation"
                        onClick={() => setValue('loginType', CodefLoginType.IdAccount)}
                    >
                        홈페이지 로그인으로 개별 연동
                    </button>
                </section>
            </div>
        </article>
    );
});
