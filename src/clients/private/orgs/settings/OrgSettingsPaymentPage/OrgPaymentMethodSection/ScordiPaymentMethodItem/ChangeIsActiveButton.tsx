import {errorToast} from '^api/api';
import {orgIdParamState} from '^atoms/common';
import {confirm2} from '^components/util/dialog';
import {scordiPaymentMethodApi} from '^models/_scordi/ScordiPaymentMethod/api';
import {useScordiPaymentMethodsInSettingPage} from '^models/_scordi/ScordiPaymentMethod/hook';
import {ScordiPaymentMethodDto} from '^models/_scordi/ScordiPaymentMethod/type';
import {Bookmark, BookmarkMinus} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {toast} from 'react-hot-toast';
import {useRecoilValue} from 'recoil';
import {ScordiPaymentMoreDropdownButton} from './ScordiPaymentMoreDropdownButton';

interface ChangeIsActiveButtonProps {
    paymentMethod: ScordiPaymentMethodDto;
}

export const ChangeIsActiveButton = memo((props: ChangeIsActiveButtonProps) => {
    const {paymentMethod} = props;
    const {t} = useTranslation('workspaceSettings');
    const orgId = useRecoilValue(orgIdParamState);
    const {id} = paymentMethod;
    const {reload} = useScordiPaymentMethodsInSettingPage();

    const onClick = (isActive: boolean) => {
        const dialog = () => {
            return isActive
                ? confirm2(
                      t('payment.changeToMainCard') as string,
                      <span>
                          {t('payment.changeToMainCardDesc')}
                          <br />
                          {t('payment.scordiPaymentMethod')}
                          <br />
                          {t('payment.changePaymentMethod')}
                          <br />
                      </span>,
                  )
                : confirm2(
                      t('payment.changeToSubCard') as string,
                      <span>
                          {t('payment.changeToSubCardDesc')}
                          <br />
                          {t('payment.cannotChangeToSubCard')}
                          <br />
                          {t('payment.canChangeToMainCard')}
                      </span>,
                  );
        };

        dialog().then((res) => {
            if (!res.isConfirmed) return;

            scordiPaymentMethodApi
                .update(orgId, id, {isActive})
                .then((res) => {
                    toast.success(t('payment.changesSaved'));
                    reload();
                })
                .catch(errorToast);
        });
    };

    if (paymentMethod.isActive) {
        return (
            <ScordiPaymentMoreDropdownButton className="hover:text-scordi" onClick={() => onClick(false)}>
                <Bookmark fontSize={10} className="text-scordi" />
                <span>{t('payment.changeToSubCard')}</span>
            </ScordiPaymentMoreDropdownButton>
        );
    } else {
        return (
            <ScordiPaymentMoreDropdownButton className="hover:text-scordi" onClick={() => onClick(true)}>
                <BookmarkMinus fontSize={10} />
                <span>{t('payment.changeToMainCard')}</span>
            </ScordiPaymentMoreDropdownButton>
        );
    }
});
ChangeIsActiveButton.displayName = 'ChangeIsActiveButton';
