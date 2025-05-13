import {memo, useState} from 'react';
import {useRouter} from 'next/router';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {BusinessTypeSection} from '../common/BusinessTypeSection';
import {BankSelectionSection} from './BankSelectionSection';
import {CardSelectionSection} from './CardSelectionSection';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {StatusHeader} from '^_components/pages/assets/connect-steps/common/StatusHeader';

export const OrgAssetCreateByManualPage = memo(() => {
    const router = useRouter();
    const [isPersonal, setIsPersonal] = useState(false);
    const [selectedBank, setSelectedBank] = useState<BankAccountsStaticData | null>(null);
    const [selectedCard, setSelectedCard] = useState<CardAccountsStaticData | null>(null);

    return (
        <PureLayout>
            <div className="w-full flex flex-col gap-20">
                {!selectedCard && !selectedBank && (
                    <div className="flex flex-col gap-10">
                        <StatusHeader
                            title="어떤 자산을 연결할까요?"
                            subTitle="개인사업자의 경우 금융사마다 정의가 달라요. 두 항목 모두 시도해보세요."
                            onClick={() => router.back()}
                        />
                        <BusinessTypeSection isPersonal={isPersonal} setIsPersonal={setIsPersonal} />
                    </div>
                )}

                {!selectedCard && (
                    <BankSelectionSection
                        onSelect={setSelectedBank}
                        selectedBank={selectedBank}
                        isPersonal={isPersonal}
                    />
                )}

                {!selectedBank && (
                    <CardSelectionSection
                        onSelect={setSelectedCard}
                        selectedCard={selectedCard}
                        isPersonal={isPersonal}
                    />
                )}
            </div>
        </PureLayout>
    );
});
