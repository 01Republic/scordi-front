import React, {memo} from 'react';
import {useFormContext} from 'react-hook-form';
import {ChevronRight} from 'lucide-react';
import {termsUrl} from '^config/environments';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {LinkTo} from '^components/util/LinkTo';
import {AgreeItem} from '^_components/pages/assets/connect-steps/AssetConnectMethodSelectStep/AgreeItem';

export const AssetAgreeTermSection = memo(() => {
    const {setValue, watch} = useFormContext<CreateAccountRequestDto>();

    const formData = watch();
    const privacy = formData.isAgreeForPrivacyPolicyTerm;
    const service = formData.isAgreeForServiceUsageTerm;
    // const privacy = watch('isAgreeForPrivacyPolicyTerm');
    // const service = watch('isAgreeForServiceUsageTerm');
    const allChecked = privacy && service;

    return (
        <section className="flex flex-col gap-4 text-16 text-neutral-900 font-normal">
            <AgreeItem label="전체 동의">
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
