import React, {memo, useEffect} from 'react';
import {EditFormSection} from '^v3/share/EditFormSection';
import {useToast} from '^hooks/useToast';
import {useRecoilValue} from 'recoil';
import {usePaymentReceiveTeamMemberForOrgSetting} from '^models/TeamMember';
import {MembershipLevel} from '^models/Membership/types';
import {orgIdParamState} from '^atoms/common';

export const PaymentInfoSection = memo(() => {
    const {toast} = useToast();
    const orgId = useRecoilValue(orgIdParamState);
    const {result, search} = usePaymentReceiveTeamMemberForOrgSetting();

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;

        // @ts-ignore
        search({where: {membership: {level: MembershipLevel.OWNER}}});
    }, [orgId]);

    const paymentMember = result.items.find((_, i) => i === 0);

    return (
        <EditFormSection title="결제 정보" editMode={false}>
            <div className="w-full mb-8 grid grid-cols-2 gap-4">
                <div className="card card-bordered border-slate-100">
                    <div className="card-body p-4">
                        <p className="font-semibold text-gray-500">청구 이메일</p>
                        <p className="font-[500] text-16">{paymentMember?.email || '-'}</p>
                        <div className="card-actions justify-start">
                            &nbsp;
                            {/*<a className="link link-primary no-underline text-sm">관리</a>*/}
                        </div>
                    </div>
                </div>

                <div
                    onClick={() => toast.info('준비중입니다.')}
                    className="card card-bordered border-scordi-500 text-scordi-500 cursor-pointer hover:bg-scordi-500 hover:text-white hover:shadow-2xl transition"
                >
                    <div className="card-body p-4">
                        <p className="font-semibold">결제 수단</p>
                        <p className="font-[500] text-16">카드를 등록해주세요</p>
                        <div className="card-actions justify-start">
                            &nbsp;
                            {/*    <a className="link link-primary no-underline text-sm">관리</a>*/}
                        </div>
                    </div>
                </div>
            </div>
        </EditFormSection>
    );
});
