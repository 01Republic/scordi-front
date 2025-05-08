import React, {memo} from 'react';
import {useFormContext} from 'react-hook-form';
import {ChevronRight} from 'lucide-react';
import {termsUrl} from '^config/environments';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {LinkTo} from '^components/util/LinkTo';

export const AssetAgreeTermSection = memo(() => {
    const {setValue, register, watch, getValues} = useFormContext<CreateAccountRequestDto>();

    return (
        <section className="flex flex-col gap-4 text-16 text-neutral-900 font-normal">
            {/* 전체 동의  */}
            <label className="flex items-center gap-2">
                <input
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

                <span>전체 동의</span>
            </label>

            <div className="flex flex-col gap-4 pl-5">
                {/* 개인정보 수집 및 이용 동의 */}
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        {...register('isAgreeForPrivacyPolicyTerm')}
                        className="checkbox checkbox-primary w-5 h-5 rounded"
                    />

                    <span>개인정보 수집 및 이용 동의 (필수)</span>

                    <LinkTo href={termsUrl.privacy} target="_blank" className="ml-auto" displayLoading={false}>
                        <ChevronRight className="size-6" />
                    </LinkTo>
                </label>

                {/* 이용약관동의 */}
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        {...register('isAgreeForServiceUsageTerm')}
                        className="checkbox checkbox-primary w-5 h-5 rounded"
                    />

                    <span>이용약관동의 (필수)</span>

                    <LinkTo href={termsUrl.serviceUsage} target="_blank" className="ml-auto" displayLoading={false}>
                        <ChevronRight className="size-6" />
                    </LinkTo>
                </label>
            </div>
        </section>
    );
});
