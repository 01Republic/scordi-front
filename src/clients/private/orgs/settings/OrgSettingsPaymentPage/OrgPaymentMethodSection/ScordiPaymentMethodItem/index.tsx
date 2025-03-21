import React, {memo} from 'react';
import Tippy from '@tippyjs/react';
import {ScordiPaymentMethodDto} from '^models/_scordi/ScordiPaymentMethod/type';
import {yyyy_mm_dd} from '^utils/dateTime';
import {Avatar} from '^components/Avatar';
import {Dropdown} from '^v3/share/Dropdown';
import {ChangeIsActiveButton} from './ChangeIsActiveButton';
import {ScordiPaymentMethodRemoveButton} from './ScordiPaymentMethodRemoveButton';
import {Bookmark, BookmarkMinus, CreditCard, MoreHorizontal} from 'lucide-react';

interface ScordiPaymentMethodItemProps {
    data: ScordiPaymentMethodDto;
    changeIsActiveButtonShow?: boolean;
}

export const ScordiPaymentMethodItem = memo((props: ScordiPaymentMethodItemProps) => {
    const {data: paymentMethod, changeIsActiveButtonShow = false} = props;

    const company = paymentMethod.asCardCompany();
    const card = paymentMethod.response.card;

    return (
        <div className={`p-4 bg-slate-50 flex items-center justify-between rounded-lg text-14`}>
            <div className="flex items-center gap-4">
                <Avatar className="w-7">
                    {company ? (
                        <img src={company.logo} alt="" />
                    ) : (
                        <CreditCard size={20} className="h-full w-full p-[6px]" />
                    )}
                </Avatar>
                <Tippy content={paymentMethod.fullCardNumber}>
                    <div className="flex items-center gap-1 font-semibold cursor-pointer">
                        <span>{company?.displayName || paymentMethod.cardCompany}</span>
                        <span>({paymentMethod.cardNumber.slice(-4)})</span>
                    </div>
                </Tippy>

                <div className="text-gray-600">
                    {card.ownerType} / {card.cardType}
                </div>
            </div>

            <div className="flex items-center">
                <div className="flex items-center gap-1.5 mr-2">
                    <span className="text-gray-500">등록일자 :</span>
                    <span>{yyyy_mm_dd(paymentMethod.createdAt, '. ')}</span>
                </div>

                <div>
                    <Dropdown
                        placement="bottom-end"
                        Trigger={() => (
                            <button className="btn btn-circle btn-xs text-gray-500 hover:text-black">
                                <MoreHorizontal fontSize={18} />
                            </button>
                        )}
                        Content={() => (
                            <ul className="dropdown-content menu px-0 py-1 shadow-xl text-13 bg-base-100 border rounded-md min-w-32">
                                {changeIsActiveButtonShow && (
                                    <li>
                                        <ChangeIsActiveButton paymentMethod={paymentMethod} />
                                    </li>
                                )}
                                <li>
                                    <ScordiPaymentMethodRemoveButton paymentMethod={paymentMethod} />
                                </li>
                            </ul>
                        )}
                    />
                </div>
            </div>
        </div>
    );
});
ScordiPaymentMethodItem.displayName = 'ScordiPaymentMethodItem';
