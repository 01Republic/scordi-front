import React, {memo, useEffect, useRef} from 'react';
import {useFormContext} from 'react-hook-form';
import {termsUrl} from '^config/environments';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {AgreeItem} from './AgreeItem';

export const AssetAgreeTermSection = memo(() => {
    const {setValue, watch} = useFormContext<CreateAccountRequestDto>();
    const allCheckRef = useRef<HTMLInputElement>(null);

    const formData = watch();
    const privacy = formData.isAgreeForPrivacyPolicyTerm || false;
    const service = formData.isAgreeForServiceUsageTerm || false;
    const allChecked = privacy && service;

    useEffect(() => {
        if (allCheckRef.current) {
            allCheckRef.current.checked = allChecked;
        }
    }, [allCheckRef, allChecked]);

    return (
        <section className="flex flex-col gap-4 text-16 text-neutral-900 font-normal">
            <AgreeItem label="전체 동의">
                <input
                    ref={allCheckRef}
                    type="checkbox"
                    defaultChecked={allChecked}
                    onChange={(e) => {
                        const isAllChecked = e.target.checked;
                        setValue('isAgreeForPrivacyPolicyTerm', isAllChecked);
                        setValue('isAgreeForServiceUsageTerm', isAllChecked);
                    }}
                    className="checkbox checkbox-primary w-5 h-5 rounded"
                />
            </AgreeItem>

            <div className="flex flex-col gap-4 pl-5">
                <AgreeItem
                    name="isAgreeForPrivacyPolicyTerm"
                    label="개인정보 수집 및 이용 동의"
                    required
                    href={termsUrl.privacy}
                />
                <AgreeItem
                    name="isAgreeForServiceUsageTerm"
                    label="이용약관동의"
                    required
                    href={termsUrl.serviceUsage}
                />
            </div>
        </section>
    );
});
