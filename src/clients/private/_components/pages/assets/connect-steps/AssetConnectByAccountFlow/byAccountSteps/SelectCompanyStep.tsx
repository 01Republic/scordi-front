import React, {memo} from 'react';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {StatusHeader} from '^_components/pages/assets/connect-steps/common/StatusHeader';
import {BusinessTypeSelector} from '^_components/pages/assets/connect-steps/common/BusinessTypeSelector';
import {CardCompanySelector} from '^_components/pages/assets/connect-steps/common/CardCompanySelector';

interface AccountConnectStepProps {
    createMoreAccountContext?: boolean;
    onBack: () => any;
    onNext: (company: CardAccountsStaticData) => any;
}

export const SelectCompanyStep = memo((props: AccountConnectStepProps) => {
    const {createMoreAccountContext = false, onBack, onNext} = props;

    return (
        <PureLayout>
            <div className="w-full flex flex-col gap-20">
                <div className="flex flex-col gap-10">
                    <StatusHeader
                        title="어떤 자산을 연결할까요?"
                        subTitle="개인사업자의 경우 금융사마다 정의가 달라요. 두 항목 모두 시도해보세요."
                        onBack={onBack}
                    />
                    <BusinessTypeSelector />
                </div>

                <CardCompanySelector createMoreAccountContext={createMoreAccountContext} onSelect={onNext} />
            </div>
        </PureLayout>
    );
});
