import {AssetConnectOptionContext} from '^_components/pages/assets/connect-steps';
import {Lottie, LOTTIE_SRC} from '^components/LottieNoSSR';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {CodefLoginType} from '^models/CodefAccount/type/enums';
import {useTranslation} from 'next-i18next';
import {memo, useContext} from 'react';
import {useFormContext} from 'react-hook-form';
import {AssetAgreeTermSection} from './AssetAgreeTermSection';

export const AssetCreateMethodSelect = memo(() => {
    const {t} = useTranslation('assets');
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
                            {t('connectSteps.methodSelect.securityInfo')} <br />
                            {t('connectSteps.methodSelect.kisaCheck')}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <span className="text-28 text-gray-900 font-semibold">
                            {title || t('connectSteps.methodSelect.title')}
                        </span>
                        <span className="text-15 text-gray-600 font-normal whitespace-pre-line">
                            {subTitle || t('connectSteps.methodSelect.subTitle')}
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
                        {t('connectSteps.methodSelect.certificateButton')}
                    </button>

                    <button
                        type="button"
                        className={`btn btn-block no-animation btn-animation ${
                            isEnabled ? 'btn-secondary' : 'btn-disabled2'
                        }`}
                        onClick={() => (isEnabled ? setValue('loginType', CodefLoginType.IdAccount) : '')}
                    >
                        {t('connectSteps.methodSelect.accountButton')}
                    </button>
                </section>
            </div>
        </article>
    );
});
