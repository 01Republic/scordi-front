import React, {memo} from 'react';
import {BankAccountDto} from '^models/BankAccount/type';
import {unitFormat} from '^utils/number';
import {ConnectedItem} from '^_components/pages/assets/connect-steps/AssetConnectSuccessPageTemplate/ConnectedItem';
import Tippy from '@tippyjs/react';
import {ContentSection} from '^_components/pages/assets/connect-steps/common/ContentSection';

interface SuccessBankAccountsSectionProps {
    bankAccounts: BankAccountDto[];
}

export const SuccessBankAccountsSection = memo((props: SuccessBankAccountsSectionProps) => {
    const {bankAccounts} = props;

    if (bankAccounts.length === 0) return <></>;

    return (
        <ContentSection
            text={
                <span className="flex items-center gap-1">
                    계좌 <small className="text-scordi font-bold">({unitFormat(bankAccounts.length, '')})</small>
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
                                    <span>끝자리: {bankAccount.endNumber(3) || '알수없음'}</span>
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
