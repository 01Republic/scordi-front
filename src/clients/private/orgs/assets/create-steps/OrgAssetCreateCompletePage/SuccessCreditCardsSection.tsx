import Tippy from '@tippyjs/react';
import {ConnectedItem} from '^_components/pages/assets/connect-steps/AssetConnectSuccessPageTemplate/ConnectedItem';
import {ContentSection} from '^_components/pages/assets/connect-steps/common/ContentSection';
import {CreditCardDto} from '^models/CreditCard/type';
import {unitFormat} from '^utils/number';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';

interface SuccessCreditCardsSectionProps {
    creditCards: CreditCardDto[];
}

export const SuccessCreditCardsSection = memo((props: SuccessCreditCardsSectionProps) => {
    const {t} = useTranslation('assets');
    const {creditCards} = props;

    if (creditCards.length === 0) return <></>;

    return (
        <ContentSection
            text={
                <span className="flex items-center gap-1">
                    {t('createSteps.complete.creditCards.title') as string}{' '}
                    <small className="text-scordi font-bold">({unitFormat(creditCards.length, '')})</small>
                </span>
            }
        >
            <ul className="grid grid-cols-2 gap-3">
                {creditCards.map((creditCard) => (
                    <ConnectedItem
                        key={creditCard.id}
                        mainText={creditCard.profileName || ''}
                        subText={
                            <Tippy content={creditCard.fullNumber} className="!text-12">
                                <div>
                                    <span>
                                        {t('createSteps.complete.creditCards.lastDigits') as string}:{' '}
                                        {creditCard.numbers.number4 ||
                                            (t('createSteps.complete.creditCards.unknown') as string)}
                                    </span>
                                </div>
                            </Tippy>
                        }
                        url={creditCard.company?.logo}
                    />
                ))}
            </ul>
        </ContentSection>
    );
});
SuccessCreditCardsSection.displayName = 'SuccessCreditCardsSection';
