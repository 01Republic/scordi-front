import React, {memo, useContext} from 'react';
import {useFormContext} from 'react-hook-form';
import {CodefLoginType} from '^models/CodefAccount/type/enums';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {Lottie, LOTTIE_SRC} from '^components/LottieNoSSR';
import {AssetAgreeTermSection} from './AssetAgreeTermSection';
import {AssetConnectOptionContext} from '^_components/pages/assets/connect-steps';

export const AssetCreateMethodSelect = memo(() => {
    const {assetConnectMethodSelectStep} = useContext(AssetConnectOptionContext);
    const {setValue, watch} = useFormContext<CreateAccountRequestDto>();
    const isEnabled = watch('isAgreeForPrivacyPolicyTerm') && watch('isAgreeForServiceUsageTerm');

    const {title, subTitle} = assetConnectMethodSelectStep || {};

    return (
        <article className="w-full flex flex-col">
            <div className="flex flex-col gap-16">
                <section className="flex flex-col gap-10">
                    <div className="flex items-center gap-2">
                        <Lottie
                            src={LOTTIE_SRC.SECURITY_SHIELD_FOR_CERT}
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
                        <span className="text-28 text-gray-900 font-semibold">{title || '자산을 연동해 볼까요?'}</span>
                        <span className="text-15 text-gray-600 font-normal whitespace-pre-line">
                            {subTitle ||
                                '공동인증서를 연동해 사업용으로 쓰고있는 카드의 입출금 내역을 자동으로 조회할 수 있어요.'}
                        </span>
                    </div>

                    <AssetAgreeTermSection />
                </section>

                {/* 동의 받기 */}
                <section className="flex flex-col gap-2 w-full mt-5">
                    <button
                        type="button"
                        className={`btn btn-block no-animation btn-animation ${
                            isEnabled ? 'btn-scordi' : 'btn-disabled2'
                        }`}
                        onClick={() => (isEnabled ? setValue('loginType', CodefLoginType.Certificate) : '')}
                    >
                        공동인증서로 한번에 연동
                    </button>

                    <button
                        type="button"
                        className={`btn btn-block no-animation btn-animation ${
                            isEnabled ? 'btn-secondary' : 'btn-disabled2'
                        }`}
                        onClick={() => (isEnabled ? setValue('loginType', CodefLoginType.IdAccount) : '')}
                    >
                        홈페이지 로그인으로 개별 연동
                    </button>
                </section>
            </div>
        </article>
    );
});
