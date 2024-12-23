import {DashboardLayout} from '^clients/private/orgs/home/OrgDashboardPage/DashboardLayout';
import {Avatar} from '^components/Avatar';
import React from 'react';

interface PaymentMethodsSectionSectionProps {}

export const PaymentMethodsSection = (props: PaymentMethodsSectionSectionProps) => {
    return (
        <DashboardLayout title="결제수단" subTitle="총 -2,500,000원">
            <section className="w-full flex flex-col gap-10">
                <ul>
                    <li className="first:border-t-0 last:border-b-0 border-t-[0.5px] border-b-[0.5px] p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Avatar className="w-7 h-7" draggable={false} loading="lazy" />
                                <div>
                                    <p className="font-normal text-14 text-gray-800">
                                        [KB국민카드] 5582_26**_****_****
                                    </p>
                                    <p className="font-normal text-12 text-gray-400">끝자리: 0000</p>
                                </div>
                            </div>
                            <p className="font-medium text-16 text-gray-900">- 1,500,000원</p>
                        </div>
                    </li>
                    <li className="first:border-t-0 last:border-b-0 border-t-[0.5px] border-b-[0.5px] p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Avatar className="w-7 h-7" draggable={false} loading="lazy" />
                                <div>
                                    <p className="font-normal text-14 text-gray-800">
                                        [KB국민카드] 5582_26**_****_****
                                    </p>
                                    <p className="font-normal text-12 text-gray-400">끝자리: 0000</p>
                                </div>
                            </div>
                            <p className="font-medium text-16 text-gray-900">- 1,000,000원</p>
                        </div>
                    </li>
                    <li className="first:border-t-0 last:border-b-0 border-t-[0.5px] border-b-[0.5px] p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Avatar className="w-7 h-7" draggable={false} loading="lazy" />
                                <div>
                                    <p className="font-normal text-14 text-gray-800">
                                        [KB국민카드] 5582_26**_****_****
                                    </p>
                                    <p className="font-normal text-12 text-gray-400">끝자리: 0000</p>
                                </div>
                            </div>
                            <p className="font-medium text-16 text-gray-900">- 1,000,000원</p>
                        </div>
                    </li>
                </ul>
                <button className="w-full flex items-center justify-center font-semibold text-14 text-gray-400">
                    전체보기
                </button>
            </section>
        </DashboardLayout>
    );
};
