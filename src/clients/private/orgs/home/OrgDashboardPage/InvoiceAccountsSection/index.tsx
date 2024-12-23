import {DashboardLayout} from '^clients/private/orgs/home/OrgDashboardPage/DashboardLayout';
import {Avatar} from '^components/Avatar';
import React from 'react';

interface InvoiceAccountsSectionProps {}

export const InvoiceAccountsSection = (props: InvoiceAccountsSectionProps) => {
    return (
        <DashboardLayout title="청구서 메일" subTitle="총 14건">
            <section className="w-full flex flex-col gap-10">
                <ul>
                    <li className="first:border-t-0 last:border-b-0 border-t-[0.5px] border-b-[0.5px] p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Avatar className="w-7 h-7" draggable={false} loading="lazy" />
                                <div>
                                    <p className="font-normal text-14 text-gray-800">김규리</p>
                                    <p className="font-normal text-12 text-gray-400">hunter@01republic.io</p>
                                </div>
                            </div>
                            <p className="font-medium text-16 text-gray-900">요정 외 3건</p>
                        </div>
                    </li>
                    <li className="first:border-t-0 last:border-b-0 border-t-[0.5px] border-b-[0.5px] p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Avatar className="w-7 h-7" draggable={false} loading="lazy" />
                                <div>
                                    <p className="font-normal text-14 text-gray-800">김용드래곤</p>
                                    <p className="font-normal text-12 text-gray-400">dragon@01republic.io</p>
                                </div>
                            </div>
                            <p className="font-medium text-16 text-gray-900">불 뿜기</p>
                        </div>
                    </li>
                    <li className="first:border-t-0 last:border-b-0 border-t-[0.5px] border-b-[0.5px] p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Avatar className="w-7 h-7" draggable={false} loading="lazy" />
                                <div>
                                    <p className="font-normal text-14 text-gray-800">윤미주</p>
                                    <p className="font-normal text-12 text-gray-400">힐러</p>
                                </div>
                            </div>
                            <p className="font-medium text-16 text-gray-900">마나 채우기 외 20스킬</p>
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
