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
    isAppendable?: boolean;
    codefAccounts?: CodefAccountDto[];
    onBack: () => any;
    onNext: (company: CardAccountsStaticData) => any;
    reload?: () => any;
}

export const SelectCompanyStep = memo((props: AccountConnectStepProps) => {
    const {isAppendable = false, codefAccounts, onBack, onNext, reload} = props;

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
                    {isAppendable ? (
                        <StatusHeader
                            title={<span onClick={() => reload && reload()}>새로운 자산을 추가로 등록할까요?</span>}
                            subTitle="이미 연결된 계정이 있는 곳이라도, 추가로 계정을 연결 할 수 있어요."
                        />
                    ) : (
                        <StatusHeader
                            title={<span onClick={() => reload && reload()}>어떤 자산을 연결할까요?</span>}
                            subTitle="개인사업자의 경우 금융사마다 정의가 달라요. 두 항목 모두 시도해보세요."
                        />
                    )}

                    <BusinessTypeSelector />
                </div>
            </PureLayoutContainerSection>

            <PureLayoutContainerSection>
                <CardCompanySelector
                    isAppendable={isAppendable}
                    codefAccounts={codefAccounts}
                    onSelect={onNext}
                    reload={reload}
                />
            </PureLayoutContainerSection>
        </PureLayout>
    );
});
