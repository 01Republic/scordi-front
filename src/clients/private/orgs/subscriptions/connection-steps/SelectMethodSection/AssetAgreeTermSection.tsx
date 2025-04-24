import React, {memo} from 'react';
import {useFormContext} from 'react-hook-form';
import {ChevronRight} from 'lucide-react';
import {termsUrl} from '^config/environments';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';

export const AssetAgreeTermSection = memo(() => {
    const {setValue, register, watch, getValues} = useFormContext<CreateAccountRequestDto>();

    return (
        <section className="flex flex-col gap-4 text-16 text-neutral-900 font-normal">
            {/* 전체 동의  */}
            <div className="flex items-center gap-2">
                <input
                    id="all-agree"
                    type="checkbox"
                    checked={watch('isAgreeForPrivacyPolicyTerm') && watch('isAgreeForServiceUsageTerm')}
                    onClick={() => {
                        const privacy = getValues('isAgreeForPrivacyPolicyTerm');
                        const serviceUsage = getValues('isAgreeForServiceUsageTerm');
                        const allChecked = privacy && serviceUsage;
                        setValue('isAgreeForPrivacyPolicyTerm', !allChecked);
                        setValue('isAgreeForServiceUsageTerm', !allChecked);
                    }}
                    className="checkbox checkbox-primary w-5 h-5 rounded"
                />
                <label htmlFor="all-agree">전체 동의</label>
            </div>

            {/* 개인정보 수집 및 이용 동의 */}
            <div className="flex flex-col gap-4 pl-5">
                <div className="flex items-center gap-2">
                    <input
                        id="personal-info-agree"
                        type="checkbox"
                        {...register('isAgreeForPrivacyPolicyTerm')}
                        className="checkbox checkbox-primary w-5 h-5 rounded"
                    />
                    <label htmlFor="personal-info-agree" className="w-full flex items-center justify-between">
                        <span>개인정보 수집 및 이용 동의 (필수)</span>
                        <a href={termsUrl.privacy} target={'_blank'}>
                            <ChevronRight className="size-6" />
                        </a>
                    </label>
                </div>

                {/* 이용약관동의 */}
                <div className="flex items-center gap-2">
                    <input
                        id="terms-agree"
                        type="checkbox"
                        {...register('isAgreeForServiceUsageTerm')}
                        className="checkbox checkbox-primary w-5 h-5 rounded"
                    />
                    <label htmlFor="terms-agree" className="w-full flex items-center justify-between">
                        <span>이용약관동의 (필수)</span>
                        <a href={termsUrl.serviceUsage} target={'_blank'}>
                            <ChevronRight className="size-6" />
                        </a>
                    </label>
                </div>
            </div>
        </section>
    );
});
