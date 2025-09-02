import {memo} from 'react';
import {HelpCircle} from 'lucide-react';
import Tippy from '@tippyjs/react';
import {New_SaaS_Request_Form_Url} from '^config/constants';
import {LinkTo} from '^components/util/LinkTo';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {SearchProductInput} from '^clients/private/orgs/subscriptions/OrgSubscriptionSelectPage/SearchProductInput';
import {SelectableProductSectionVertical} from './SelectableProductSectionVertical';

interface NewSubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const NewSubscriptionModal = memo((props: NewSubscriptionModalProps) => {
    const {isOpen, onClose} = props;

    return (
        <SlideUpModal open={isOpen} onClose={onClose} size="md">
            <div className="pt-2 space-y-6">
                <section className="space-y-10">
                    <h3 className="text-2xl font-bold">추가할 구독 서비스를 검색해주세요.</h3>
                    <div>
                        <div className="flex justify-end w-full">
                            <Tippy content="미등록 서비스 제보하기">
                                <div>
                                    <LinkTo
                                        className="flex items-center gap-2 cursor-pointer text-13 link link-hover text-gray-500 py-1 group"
                                        href={New_SaaS_Request_Form_Url}
                                        displayLoading={false}
                                        target="_blank"
                                    >
                                        <HelpCircle className="size-4" />
                                        <span>찾는 앱이 없나요?</span>
                                    </LinkTo>
                                </div>
                            </Tippy>
                        </div>
                        <SearchProductInput />
                    </div>
                </section>

                <SelectableProductSectionVertical />
            </div>
        </SlideUpModal>
    );
});
