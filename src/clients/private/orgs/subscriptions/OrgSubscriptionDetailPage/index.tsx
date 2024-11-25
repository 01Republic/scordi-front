import React, {memo, useState} from 'react';
import {ShowPage} from '^clients/private/_components/rest-pages/ShowPage';
import {MainTabButtons} from '^clients/private/_layouts/_shared/MainTabButton';
import {Avatar} from '^components/Avatar';
import {FaRegCreditCard} from 'react-icons/fa6';
import {TeamTag} from '^models/Team/components/TeamTag';
import {SubscriptionActionPanel} from './components/SubscriptionActionPanel';
import {SubscriptionInfoTab} from './tabs/SubscriptionInfoTab';
import {SubscriptionPaymentTab} from './tabs/SubscriptionPaymentTab';
import {SubscriptionMemberTab} from './tabs/SubscriptionMemberTab';

export const OrgSubscriptionDetailPage = memo(() => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    return (
        <ShowPage breadcrumb={['구독', '구독 리스트', {text: 'Notion', active: true}]}>
            <header className="flex items-center justify-between pt-8 pb-4">
                <div className="flex-auto">
                    {/*<CreditCardProfilePanel />*/}
                    <div>
                        <div className="flex items-start gap-6">
                            <Avatar className="w-14">
                                <FaRegCreditCard size={20} className="h-full w-full p-[6px]" />
                            </Avatar>

                            <div className="flex flex-col gap-0.5 overflow-hidden text-left">
                                <p
                                    className={`flex gap-2 text-18 font-semibold items-center group-hover:text-scordi leading-none py-1`}
                                >
                                    <span className="truncate">Notion</span>
                                </p>
                                <p className="block text-14 font-normal text-gray-400 group-hover:text-scordi-300 leading-none">
                                    제로원리퍼블릭의 노션
                                </p>

                                <div className="flex items-center gap-3 pt-3">
                                    <div>
                                        <TeamTag id={1} name={'개발팀'} />
                                        <TeamTag id={1} name={'디자인팀'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <SubscriptionActionPanel />
            </header>

            <main className="pt-4">
                <div className="flex items-center justify-between border-b border-gray-300">
                    <MainTabButtons
                        borderless
                        activeTabIndex={activeTabIndex}
                        setActiveTabIndex={setActiveTabIndex}
                        tabs={['정보', '결제', '멤버']}
                    />
                </div>

                {activeTabIndex == 0 && <SubscriptionInfoTab />}
                {activeTabIndex == 1 && <SubscriptionPaymentTab />}
                {activeTabIndex == 2 && <SubscriptionMemberTab />}
            </main>
        </ShowPage>
    );
});
