import {errorToast} from '^api/api';
import {orgIdParamState} from '^atoms/common';
import {confirm2, confirmed} from '^components/util/dialog';
import {scordiPaymentMethodApi} from '^models/_scordi/ScordiPaymentMethod/api';
import {useScordiPaymentMethodsInSettingPage} from '^models/_scordi/ScordiPaymentMethod/hook';
import {ScordiPaymentMethodDto} from '^models/_scordi/ScordiPaymentMethod/type';
import {Trash2} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {toast} from 'react-hot-toast';
import {useRecoilValue} from 'recoil';
import {ScordiPaymentMoreDropdownButton} from './ScordiPaymentMoreDropdownButton';

interface ScordiPaymentMethodRemoveButtonProps {
    paymentMethod: ScordiPaymentMethodDto;
}

export const ScordiPaymentMethodRemoveButton = memo((props: ScordiPaymentMethodRemoveButtonProps) => {
    const {paymentMethod} = props;
    const {t} = useTranslation('workspaceSettings');
    const orgId = useRecoilValue(orgIdParamState);
    const {id} = paymentMethod;
    const {reload} = useScordiPaymentMethodsInSettingPage();

    const onClick = () => {
        const removeConfirm = () => {
            return confirm2(
                t('payment.deletePaymentCard') as string,
                <span>
                    {t('payment.cannotUndo')}
                    <br />
                    <b>{t('payment.deleteFromWorkspace')}</b> <br />
                    {t('payment.stillDelete')}
                </span>,
            );
        };

        confirmed(removeConfirm())
            .then(() => scordiPaymentMethodApi.destroy(orgId, id))
            .then(() => toast.success(t('payment.deleted')))
            .then(() => reload())
            .catch(errorToast);
    };

    return (
        <ScordiPaymentMoreDropdownButton className="!text-error bg-error/5" onClick={onClick}>
            <Trash2 fontSize={10} />
            <span>{t('payment.delete')}</span>
        </ScordiPaymentMoreDropdownButton>
    );
});
ScordiPaymentMethodRemoveButton.displayName = 'ScordiPaymentMethodRemoveButton';
