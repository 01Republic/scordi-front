import React, {memo} from 'react';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {PureLayoutContainerSection} from '^clients/private/_layouts/PureLayout/PureLayoutContainerSection';
import {StatusHeader} from '^_components/pages/assets/connect-steps/common/StatusHeader';
import {BusinessTypeSelector} from '^_components/pages/assets/connect-steps/common/BusinessTypeSelector';
import {CardCompanySelector} from '^_components/pages/assets/connect-steps/common/CardCompanySelector';
import {LinkTo} from '^components/util/LinkTo';
import {ArrowLeft} from 'lucide-react';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';

interface AccountConnectStepProps {
    createMoreAccountContext?: boolean;
    codefAccounts?: CodefAccountDto[];
    onBack: () => any;
    onNext: (company: CardAccountsStaticData) => any;
}

export const SelectCompanyStep = memo((props: AccountConnectStepProps) => {
    const {createMoreAccountContext = false, codefAccounts, onBack, onNext} = props;

    return (
        <PureLayout className="py-14">
            <PureLayoutContainerSection className="mb-12">
                <div>
                    <LinkTo
                        className="flex gap-1 items-center text-14 cursor-pointer text-gray-600 transition-all hover:text-gray-800 hover:font-semibold"
                        onClick={onBack}
                        displayLoading={false}
                    >
                        <ArrowLeft />
                        뒤로가기
                    </LinkTo>
                </div>
            </PureLayoutContainerSection>

            <PureLayoutContainerSection className="mb-16 max-w-full sticky top-0 pt-8 pb-4 px-0 bg-layout-background z-10">
                <div className="mx-auto max-w-6xl flex flex-col gap-10 px-4">
                    <StatusHeader
                        title="어떤 자산을 연결할까요?"
                        subTitle="개인사업자의 경우 금융사마다 정의가 달라요. 두 항목 모두 시도해보세요."
                    />

                    <BusinessTypeSelector />
                </div>
            </PureLayoutContainerSection>

            <PureLayoutContainerSection>
                <CardCompanySelector
                    createMoreAccountContext={createMoreAccountContext}
                    codefAccounts={codefAccounts}
                    onSelect={onNext}
                />
            </PureLayoutContainerSection>
        </PureLayout>
    );
});
