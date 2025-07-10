import {ScordiPlanDto} from '^models/_scordi/ScordiPlan/type';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';

interface ScordiPlanCardHeaderPriceProps {
    plan: ScordiPlanDto;
}

export const ScordiPlanCardHeaderPrice = memo((props: ScordiPlanCardHeaderPriceProps) => {
    const {plan} = props;
    const {t} = useTranslation('workspaceSettings');

    if (plan.isCustomInquired) return <>{t('planCard.customInquiry')}</>;
    if (plan.regularPrice === 0 && plan.price === 0) return <>{t('planCard.free')}</>;

    return (
        <div>
            <span className={'text-sm text-gray-300 font-medium line-through'}>
                {plan.regularPrice.toLocaleString()}
            </span>
            <br />
            {plan.price === 0 ? (
                <>{t('planCard.free')}</>
            ) : (
                <span>
                    {plan.price.toLocaleString()}
                    <span className={'text-sm text-gray-500 font-medium'}>/{plan.getStepText()}</span>
                </span>
            )}
        </div>
    );
});
ScordiPlanCardHeaderPrice.displayName = 'ScordiPlanCardHeader';
