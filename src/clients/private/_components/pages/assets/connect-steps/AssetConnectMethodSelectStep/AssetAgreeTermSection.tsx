import React, {memo} from 'react';
import {useFormContext} from 'react-hook-form';
import {ChevronRight} from 'lucide-react';
import {termsUrl} from '^config/environments';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {LinkTo} from '^components/util/LinkTo';

export const AssetAgreeTermSection = memo(() => {
    const {setValue, register, watch} = useFormContext<CreateAccountRequestDto>();

    const privacy = watch('isAgreeForPrivacyPolicyTerm');
    const service = watch('isAgreeForServiceUsageTerm');
    const allChecked = privacy && service;

    return (
        <section className="flex flex-col gap-4 text-16 text-neutral-900 font-normal">
            {/* 전체 동의  */}
            <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="checkbox"
                    defaultChecked={allChecked}
                    onChange={(e) => {
                        const isAllChecked = e.target.checked;
                        setValue('isAgreeForPrivacyPolicyTerm', isAllChecked);
                        setValue('isAgreeForServiceUsageTerm', isAllChecked);
                    }}
                    className="checkbox checkbox-primary w-5 h-5 rounded"
                />

                <span>전체 동의</span>
            </label>

            <div className="flex flex-col gap-4 pl-5">
                {/* 개인정보 수집 및 이용 동의 */}
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        {...register('isAgreeForPrivacyPolicyTerm')}
                        required
                        className="checkbox checkbox-primary w-5 h-5 rounded"
                    />

                    <span>개인정보 수집 및 이용 동의 (필수)</span>

                    <LinkTo
                        href={termsUrl.privacy}
                        target="_blank"
                        className="ml-auto text-gray-400 hover:text-black transition-all"
                        displayLoading={false}
                    >
                        <ChevronRight />
                    </LinkTo>
                </label>

                {/* 이용약관동의 */}
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        {...register('isAgreeForServiceUsageTerm')}
                        required
                        className="checkbox checkbox-primary w-5 h-5 rounded"
                    />

                    <span>이용약관동의 (필수)</span>

                    <LinkTo
                        href={termsUrl.serviceUsage}
                        target="_blank"
                        className="ml-auto text-gray-400 hover:text-black transition-all"
                        displayLoading={false}
                    >
                        <ChevronRight />
                    </LinkTo>
                </label>
            </div>
        </section>
    );
});
