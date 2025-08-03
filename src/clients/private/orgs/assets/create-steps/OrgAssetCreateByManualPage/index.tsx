import {StatusHeader} from '^_components/pages/assets/connect-steps/common/StatusHeader';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {PureLayoutContainer} from '^clients/private/_layouts/PureLayout/PureLayoutContainer';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import {memo, useState} from 'react';
import {BusinessTypeSection} from '../common/BusinessTypeSection';
import {BankSelectionSection} from './BankSelectionSection';
import {CardSelectionSection} from './CardSelectionSection';

export const OrgAssetCreateByManualPage = memo(() => {
    const {t} = useTranslation('assets');
    const router = useRouter();
    const [isPersonal, setIsPersonal] = useState(false);
    const [selectedBank, setSelectedBank] = useState<BankAccountsStaticData | null>(null);
    const [selectedCard, setSelectedCard] = useState<CardAccountsStaticData | null>(null);

    return (
        <PureLayout>
            <PureLayoutContainer className="flex flex-col gap-20">
                {!selectedCard && !selectedBank && (
                    <div className="flex flex-col gap-10">
                        <StatusHeader
                            title={t('createSteps.manual.title') as string}
                            subTitle={t('createSteps.manual.subTitle') as string}
                            onBack={() => router.back()}
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
            </PureLayoutContainer>
        </PureLayout>
    );
});
