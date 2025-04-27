import Tippy from '@tippyjs/react';
import {SearchProductInput} from '^clients/private/orgs/subscriptions/OrgSubscriptionSelectPage/SearchProductInput';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {LinkTo} from '^components/util/LinkTo';
import {New_SaaS_Request_Form_Url} from '^config/constants';
import {HelpCircle} from 'lucide-react';
import {SelectableProductSectionVertical} from './SelectableProductSectionVertical';

interface NewSubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const NewSubscriptionModal = ({isOpen, onClose}: NewSubscriptionModalProps) => {
    return (
        <SlideUpModal open={isOpen} onClose={onClose}>
            <div className="p-2">
                <h3 className="text-2xl font-semibold mb-10">추가할 구독 서비스를 검색해주세요.</h3>

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
                                    <HelpCircle className="size-4" />
                                    <span>찾으시는 앱이 없나요?</span>
                                </LinkTo>
                            </div>
                        </Tippy>
                    </div>

                    <SearchProductInput />
                    <SelectableProductSectionVertical />
                </div>
            </div>
        </SlideUpModal>
    );
};
