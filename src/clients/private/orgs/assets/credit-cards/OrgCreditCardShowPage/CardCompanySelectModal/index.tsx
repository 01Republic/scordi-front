import React, {memo, useState} from 'react';
import {FaChevronLeft} from 'react-icons/fa6';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CardCompanyItem} from '^models/CodefAccount/components';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {ModalProps} from '^components/modals/_shared/Modal.types';
import {ReactNodeElement} from '^types/global.type';
import {CreditCardDto} from '^models/CreditCard/type';

interface CardCompanySelectModalProps extends ModalProps {
    title?: ReactNodeElement;
    desc?: ReactNodeElement;
    isPersonal?: boolean;
    onSelect: (cardCompanyData: CardAccountsStaticData) => any;
}

export const CardCompanySelectModal = memo((props: CardCompanySelectModalProps) => {
    const {title, desc, isPersonal = false, isOpened, onClose, onSelect} = props;

    const CardCompanies = CardAccountsStaticData.findByPersonal(isPersonal);

    return (
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
                        {title || (
                            <>
                                어느 카드사의 <br /> 카드로 설정할까요?
                            </>
                        )}
                    </h3>
                    {desc && <p className="text-14">{desc}</p>}
                </div>

                <div className="py-4 flex flex-col">
                    {CardCompanies.map((cardCompanyData, i) => (
                        <CardCompanyItem
                            key={i}
                            cardCompanyData={cardCompanyData}
                            onClick={() => onSelect(cardCompanyData)}
                        />
                    ))}
                </div>
            </div>
        </SlideUpModal>
    );
});
CardCompanySelectModal.displayName = 'CardCompanySelectModal';
