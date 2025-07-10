import {errorToast} from '^api/api';
import {t_planStepType} from '^models/_scordi/ScordiPlan/type';
import {scordiSubscriptionApi} from '^models/_scordi/ScordiSubscription/api';
import {ScordiSubscriptionDto} from '^models/_scordi/ScordiSubscription/type';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {toast} from 'react-hot-toast';
import {OrgScordiSubscriptionItemDropdown} from './OrgScordiSubscriptionItemDropdown';
import {OrgScordiSubscriptionItemExpireNote} from './OrgScordiSubscriptionItemExpireNote';

interface OrgScordiSubscriptionItemProps {
    scordiSubscription: ScordiSubscriptionDto;
    reload: () => any;
}

export const OrgScordiSubscriptionItem = memo((props: OrgScordiSubscriptionItemProps) => {
    const {scordiSubscription, reload} = props;
    const {t} = useTranslation('workspaceSettings');

    return (
        <div className={'p-4 bg-slate-50 flex items-center justify-between rounded-lg text-14'}>
            <div className="flex items-center gap-2">
                <div className="font-semibold" onClick={() => console.log(scordiSubscription)}>
                    {scordiSubscription.scordiPlan.name}
                </div>
                <div className="font-semibold text-gray-500">
                    {scordiSubscription.scordiPlan.price === 0 ? (
                        <span>
                            ({t('payment.free')}
                            {scordiSubscription.scordiPlan.regularPrice > 0 ? t('payment.discounted') : ''})
                        </span>
                    ) : (
                        <span>
                            ({t_planStepType(scordiSubscription.scordiPlan.stepType)} {t('payment.regularSubscription')}{' '}
                            / {scordiSubscription.scordiPlan.price.toLocaleString()}
                            {t('payment.won')})
                        </span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3">
                <OrgScordiSubscriptionItemExpireNote scordiSubscription={scordiSubscription} />

                <div>
                    {scordiSubscription.nextSubscriptionId ? (
                        <OrgScordiSubscriptionItemDropdown scordiSubscription={scordiSubscription} />
                    ) : (
                        <div>
                            {!scordiSubscription.scordiPlan.isFreeTrial && (
                                <button
                                    className="btn btn-xs btn-white no-animation btn-animation !text-red-500"
                                    onClick={async () => {
                                        if (!confirm(t('payment.cancelCancellationConfirm') || '')) return;

                                        scordiSubscriptionApi
                                            .revoke(scordiSubscription.organizationId)
                                            .then(() => toast.success(t('payment.cancellationCancelled')))
                                            .then(() => reload())
                                            .catch(errorToast);
                                    }}
                                >
                                    {t('payment.cancelCancellation')}
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/*{scordiSubscription.startAt && scordiSubscription.finishAt ? (*/}
                {/*    <div className="flex items-center gap-1.5">*/}
                {/*        <span className="text-gray-500">이용기간 :</span>*/}
                {/*        <span>*/}
                {/*            {yyyy_mm_dd(scordiSubscription.startAt, '. ')} ~{' '}*/}
                {/*            {yyyy_mm_dd(scordiSubscription.finishAt, '. ')}*/}
                {/*        </span>*/}
                {/*    </div>*/}
                {/*) : (*/}
                {/*    ''*/}
                {/*)}*/}
            </div>
        </div>
    );
});
OrgScordiSubscriptionItem.displayName = 'OrgScordiSubscriptionItem';
