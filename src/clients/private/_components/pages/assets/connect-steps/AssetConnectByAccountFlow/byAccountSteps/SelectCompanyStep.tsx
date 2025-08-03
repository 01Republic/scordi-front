import {BusinessTypeSelector} from '^_components/pages/assets/connect-steps/common/BusinessTypeSelector';
import {CardCompanySelector} from '^_components/pages/assets/connect-steps/common/CardCompanySelector';
import {StatusHeader} from '^_components/pages/assets/connect-steps/common/StatusHeader';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {PureLayoutContainerSection} from '^clients/private/_layouts/PureLayout/PureLayoutContainerSection';
import {LinkTo} from '^components/util/LinkTo';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {ArrowLeft} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';

interface AccountConnectStepProps {
    isAppendable?: boolean;
    codefAccounts?: CodefAccountDto[];
    onBack: () => any;
    onNext: (company: CardAccountsStaticData) => any;
    reload?: () => any;
}

export const SelectCompanyStep = memo((props: AccountConnectStepProps) => {
    const {t} = useTranslation('assets');
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
                        {t('connectSteps.selectCompany.backButton')}
                    </LinkTo>
                </div>
            </PureLayoutContainerSection>

            <PureLayoutContainerSection className="mb-16 max-w-full sticky top-0 pt-8 pb-4 px-0 bg-layout-background z-10">
                <div className="mx-auto max-w-6xl flex flex-col gap-10 px-4">
                    {isAppendable ? (
                        <StatusHeader
                            title={
                                <span onClick={() => reload && reload()}>
                                    {t('connectSteps.selectCompany.appendableTitle')}
                                </span>
                            }
                            subTitle={t('connectSteps.selectCompany.appendableSubTitle')}
                        />
                    ) : (
                        <StatusHeader
                            title={
                                <span onClick={() => reload && reload()}>{t('connectSteps.selectCompany.title')}</span>
                            }
                            subTitle={t('connectSteps.selectCompany.subTitle')}
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
