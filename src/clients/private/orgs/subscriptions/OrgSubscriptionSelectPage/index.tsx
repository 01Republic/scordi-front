import React, {memo} from 'react';
import {SearchProductInput} from './SearchProductInput';
import {SelectableProductSection} from './SelectableProductSection';
import {SelectedProductTagSection} from './SelectedProductTagSection';
import {ActionButtons} from './ActionButtons';
import {SelectedStatusSection} from './SelectedStatusSection';
import {BaseLayout} from '^clients/private/_layouts/BaseLayout';
import {New_SaaS_Request_Form_Url} from '^config/constants';
import {LinkTo} from '^components/util/LinkTo';
import {IoIosHelpCircle} from 'react-icons/io';
import Tippy from '@tippyjs/react';
import {ChannelTalkHideStyle} from '^components/ExternalCDNScripts/channel-talk/ChannelTalkHideStyle';

export const OrgSubscriptionSelectPage = memo(function OrgSubscriptionSelectPage() {
    return (
        <BaseLayout>
            <ChannelTalkHideStyle />
            <main className="w-full min-h-screen container max-w-4xl sm:pt-[80px] pb-8">
                <div className="px-4 pt-10 sm:px-0 sm:pt-0 sm:text-center">
                    <h1 className="text-xl sm:text-2xl mb-3 sm:mb-4">우리 팀이 쓰고 있는 모든 앱을 클릭해주세요.</h1>
                    <p className="text-14 sm:text-16 mb-6 sm:mb-10">아래 검색창에 구독 서비스 이름을 입력해보세요.</p>
                </div>

                <div className="px-4 sm:px-0 relative">
                    <div className="absolute bottom-full right-0">
                        <Tippy content="미등록 서비스 제보하기">
                            <div>
                                <LinkTo
                                    className="flex items-center gap-2 cursor-pointer text-13 link link-hover text-gray-500 py-1 group"
                                    href={New_SaaS_Request_Form_Url}
                                    displayLoading={false}
                                    target="_blank"
                                >
                                    <IoIosHelpCircle fontSize={16} />
                                    <span>찾으시는 앱이 없나요?</span>
                                </LinkTo>
                            </div>
                        </Tippy>
                    </div>

                    <SearchProductInput />
                    <SelectableProductSection />
                    <SelectedStatusSection />
                    <SelectedProductTagSection />
                </div>

                <div
                    className="p-4 sm:px-0 sticky bottom-0"
                    style={{
                        background: 'linear-gradient(0deg, #fafafa, #fafafa 80%, transparent)',
                    }}
                >
                    <ActionButtons />
                </div>
            </main>
        </BaseLayout>
    );
});
