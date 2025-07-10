import {EmptyTable} from '^clients/private/_components/table/EmptyTable';
import {useTossPayments} from '^hooks/useTossPayments';
import {useUnmount} from '^hooks/useUnmount';
import {useScordiPaymentMethodsInSettingPage} from '^models/_scordi/ScordiPaymentMethod/hook';
import {useTranslation} from 'next-i18next';
import {memo, useEffect} from 'react';
import {SettingsPaymentSection} from '../SettingsPaymentSection';
import {NewPaymentMethodButton} from './NewPaymentMethodButton';
import {ScordiPaymentMethodItem} from './ScordiPaymentMethodItem';

interface OrgPaymentMethodSectionProps {
    orgId: number;
}

export const OrgPaymentMethodSection = memo((props: OrgPaymentMethodSectionProps) => {
    const {orgId} = props;
    const {t} = useTranslation('workspaceSettings');
    const {requestBillingAuth} = useTossPayments();
    const {isLoading, fetchAll, result, isNotLoaded, isEmptyResult, clearCache} =
        useScordiPaymentMethodsInSettingPage();

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        fetchAll();
    }, [orgId]);

    useUnmount(() => {
        clearCache();
    }, [orgId]);

    const activeItems = result.items.filter((item) => item.isActive);
    const inactiveItems = result.items.filter((item) => !item.isActive);

    return (
        <SettingsPaymentSection
            title={t('payment.cardInfo')}
            buttonText={t('payment.cardRegistration') || ''}
            buttonOnClick={isEmptyResult ? undefined : () => requestBillingAuth()}
            isLoading={isLoading}
        >
            {isNotLoaded && (
                <div className="invisible">
                    <EmptyTable
                        message={t('payment.noCardInfo')}
                        Buttons={() => <NewPaymentMethodButton onClick={() => requestBillingAuth()} />}
                    />
                </div>
            )}
            {isEmptyResult ? (
                <EmptyTable
                    message={t('payment.noCardInfo')}
                    Buttons={() => <NewPaymentMethodButton onClick={() => requestBillingAuth()} />}
                />
            ) : (
                <div className="flex flex-col gap-4">
                    <div>
                        {result.items.length > 1 && (
                            <p className="text-12 font-semibold mb-1.5">{t('payment.mainCard')}</p>
                        )}
                        <div className="grid grid-cols-1 gap-2">
                            {activeItems.map((item, i) => (
                                <ScordiPaymentMethodItem
                                    key={i}
                                    data={item}
                                    changeIsActiveButtonShow={activeItems.length > 0 || inactiveItems.length > 0}
                                />
                            ))}
                        </div>
                    </div>

                    {!!inactiveItems.length && (
                        <div>
                            <p className="text-12 font-semibold mb-1.5">
                                {t('payment.subCard')} ({inactiveItems.length.toLocaleString()})
                            </p>
                            <div className="grid grid-cols-1 gap-2">
                                {inactiveItems.map((item, i) => (
                                    <ScordiPaymentMethodItem key={i} data={item} changeIsActiveButtonShow />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </SettingsPaymentSection>
    );
});
OrgPaymentMethodSection.displayName = 'OrgPaymentMethodSection';
