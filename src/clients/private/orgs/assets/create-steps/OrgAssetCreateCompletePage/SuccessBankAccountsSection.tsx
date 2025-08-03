import Tippy from '@tippyjs/react';
import {ConnectedItem} from '^_components/pages/assets/connect-steps/AssetConnectSuccessPageTemplate/ConnectedItem';
import {ContentSection} from '^_components/pages/assets/connect-steps/common/ContentSection';
import {BankAccountDto} from '^models/BankAccount/type';
import {unitFormat} from '^utils/number';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';

interface SuccessBankAccountsSectionProps {
    bankAccounts: BankAccountDto[];
}

export const SuccessBankAccountsSection = memo((props: SuccessBankAccountsSectionProps) => {
    const {t} = useTranslation('assets');
    const {bankAccounts} = props;

    if (bankAccounts.length === 0) return <></>;

    return (
        <ContentSection
            text={
                <span className="flex items-center gap-1">
                    {t('createSteps.complete.bankAccounts.title') as string}{' '}
                    <small className="text-scordi font-bold">({unitFormat(bankAccounts.length, '')})</small>
                </span>
            }
        >
            <ul className="grid grid-cols-2 gap-3">
                {bankAccounts.map((bankAccount) => (
                    <ConnectedItem
                        key={bankAccount.id}
                        mainText={bankAccount.title || ''}
                        subText={
                            <Tippy content={bankAccount.displayNumber} className="!text-12">
                                <div>
                                    <span>
                                        {t('createSteps.complete.bankAccounts.lastDigits') as string}:{' '}
                                        {bankAccount.endNumber(3) ||
                                            (t('createSteps.complete.bankAccounts.unknown') as string)}
                                    </span>
                                </div>
                            </Tippy>
                        }
                        url={bankAccount.company?.logo}
                    />
                ))}
            </ul>
        </ContentSection>
    );
});
SuccessBankAccountsSection.displayName = 'SuccessBankAccountsSection';
