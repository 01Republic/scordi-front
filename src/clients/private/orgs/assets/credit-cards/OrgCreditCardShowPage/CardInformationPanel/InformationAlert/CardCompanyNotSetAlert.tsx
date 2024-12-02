import React, {memo, useState} from 'react';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {creditCardApi} from '^models/CreditCard/api';
import {confirm2} from '^components/util/dialog';
import {useCurrentCreditCard} from '../../atom';
import {CardCompanySelectModal} from '../../CardCompanySelectModal';
import {InformationAlert} from './InformationAlert';

export const CardCompanyNotSetAlert = memo(() => {
    const [isOpened, setIsOpened] = useState(false);
    const {currentCreditCard, reload} = useCurrentCreditCard();

    const onClose = () => {
        setIsOpened(false);
    };

    const setCompany = async (cardCompanyData: CardAccountsStaticData) => {
        if (!currentCreditCard) return;

        const title = `"${cardCompanyData.displayName}"로 설정할까요?`;
        const desc = '설정하고 나면 변경이 어려울 수 있으니\n다시 한 번 확인해주세요';
        const isConfirmed = await confirm2(title, desc).then((res) => res.isConfirmed);
        if (!isConfirmed) return;

        const {organizationId, id} = currentCreditCard;
        const issuerCompany = cardCompanyData.displayName;
        creditCardApi
            .update(organizationId, id, {issuerCompany})
            .then(() => toast.success('카드사를 설정했어요'))
            .then(() => reload())
            .then(() => onClose())
            .catch(errorToast);
    };

    return (
        <InformationAlert>
            <div className="flex items-center gap-3">
                <div>
                    <b className="text-orange-600">카드사</b> 설정이 필요한 카드입니다.
                </div>
            </div>
            <div>
                <button
                    className="btn btn-xs !bg-orange-500 !border-orange-500 text-white"
                    onClick={() => setIsOpened(true)}
                >
                    설정
                </button>
            </div>

            {/* Select CardCompanyModal */}
            {currentCreditCard && (
                <CardCompanySelectModal
                    isOpened={isOpened}
                    onClose={onClose}
                    title={
                        <>
                            어느 카드사의 <br /> 카드로 설정할까요?
                        </>
                    }
                    desc="혹시 지금 설정하기 어렵다면 다음에 해도 괜찮아요"
                    isPersonal={currentCreditCard.isPersonal}
                    onSelect={setCompany}
                />
            )}
        </InformationAlert>
    );
});
CardCompanyNotSetAlert.displayName = 'CardCompanyNotSetAlert';
