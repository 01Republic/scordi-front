import React, {memo} from 'react';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {ChevronLeft} from 'lucide-react';

interface CardAccountCheckLoginStepProps {
    cardCompany: CardAccountsStaticData;
    onBack: () => any;
}

export const CardAccountCheckLoginStep = memo((props: CardAccountCheckLoginStepProps) => {
    const {cardCompany, onBack} = props;

    return (
        <div>
            <div className="mb-4">
                <div className="mb-4">
                    <ChevronLeft className="text-gray-400 cursor-pointer" onClick={onBack} />
                </div>
                <p className="font-medium text-12 text-scordi mb-1">카드사 연결</p>
                <h3 className="font-bold text-xl leading-tight">{cardCompany.displayName}를 불러오고 있어요...</h3>
            </div>
        </div>
    );
});
CardAccountCheckLoginStep.displayName = 'CardAccountCheckLoginStep';
