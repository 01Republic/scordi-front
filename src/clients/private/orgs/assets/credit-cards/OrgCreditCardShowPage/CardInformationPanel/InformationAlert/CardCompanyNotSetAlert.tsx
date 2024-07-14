import React, {memo, useState} from 'react';
import {InformationAlert} from './InformationAlert';
import {CreditCardDto} from '^models/CreditCard/type';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {FaChevronLeft} from 'react-icons/fa6';
import {CardCompanyItem} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/PaymentMethod/_common/CardCompanyItem';
import {CardAccountsStaticData, cardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {creditCardApi} from '^models/CreditCard/api';
import {confirm2} from '^components/util/dialog';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {useCurrentCreditCard} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/atom';

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
            <SlideUpModal
                open={isOpened}
                onClose={onClose}
                size="md"
                minHeight="min-h-screen sm:min-h-[90%]"
                maxHeight="max-h-screen sm:max-h-[90%]"
                modalClassName="rounded-none sm:rounded-t-box"
            >
                <div>
                    <div>
                        <div className="mb-4">
                            <FaChevronLeft className="text-gray-400 cursor-pointer" onClick={onClose} />
                        </div>
                        <p className="font-medium text-12 text-scordi mb-1">카드사 설정하기</p>
                        <h3 className="font-bold text-xl leading-tight mb-2">
                            어느 카드사의 <br /> 카드로 설정할까요?
                        </h3>
                        <p className="text-14">혹시 지금 설정하기 어렵다면 다음에 해도 괜찮아요</p>
                    </div>

                    <div className="py-4 flex flex-col">
                        {cardAccountsStaticData.map((cardCompanyData, i) => (
                            <CardCompanyItem
                                key={i}
                                cardCompanyData={cardCompanyData}
                                onClick={() => setCompany(cardCompanyData)}
                            />
                        ))}
                    </div>
                </div>
            </SlideUpModal>
        </InformationAlert>
    );
});
CardCompanyNotSetAlert.displayName = 'CardCompanyNotSetAlert';
