import React, {memo} from 'react';
import {CreditCardDto} from '^models/CreditCard/type';
import {unitFormat} from '^utils/number';
import {ConnectedItem} from '^_components/pages/assets/connect-steps/AssetConnectSuccessPageTemplate/ConnectedItem';
import Tippy from '@tippyjs/react';
import {ContentSection} from '^_components/pages/assets/connect-steps/common/ContentSection';

interface SuccessCreditCardsSectionProps {
    creditCards: CreditCardDto[];
}

export const SuccessCreditCardsSection = memo((props: SuccessCreditCardsSectionProps) => {
    const {creditCards} = props;

    if (creditCards.length === 0) return <></>;

    return (
        <ContentSection
            text={
                <span className="flex items-center gap-1">
                    카드 <small className="text-scordi font-bold">({unitFormat(creditCards.length, '')})</small>
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
                                    <span>끝자리: {creditCard.numbers.number4 || '알수없음'}</span>
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
