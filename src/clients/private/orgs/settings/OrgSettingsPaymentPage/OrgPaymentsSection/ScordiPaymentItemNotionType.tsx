import React, {memo} from 'react';
import {CurrencyCode} from '^models/Money';
import {yyyy_mm_dd} from '^utils/dateTime';
import {ScordiPaymentDto, t_scordiPaymentStatus} from '^models/_scordi/ScordiPayment/type';
import {LinkTo} from '^components/util/LinkTo';
import {ScordiPaymentItemProps} from './ScordiPaymentItem';
import Tippy from '@tippyjs/react';

export const ScordiPaymentItemNotionType = memo((props: ScordiPaymentItemProps) => {
    const {scordiPayment} = props;

    const onClick = () => {
        // console.log(scordiPayment);
    };

    const currencyExchange = scordiPayment.currencyInfo?.code || CurrencyCode.KRW;
    const currencySymbol = scordiPayment.currencyInfo?.symbol || '₩';

    const invoiceUrl = scordiPayment.invoiceUrl;

    return (
        <div data-id={scordiPayment.id} className="flex items-center mb-3" onClick={onClick}>
            <div className="mr-auto flex items-center">
                <div className="pt-[2px]">
                    <div className="flex items-center text-14 gap-2">
                        <span>{scordiPayment.requestedAt ? yyyy_mm_dd(scordiPayment.requestedAt) : '-'}</span>
                        <span>·</span>
                        <span>{scordiPayment.planName}</span>
                    </div>
                    <div className="flex items-center gap-1 text-12 text-gray-400 font-light">
                        <span>{t_scordiPaymentStatus(scordiPayment.status)}</span>
                        <span>·</span>
                        <span>
                            <span className="mr-1">{currencyExchange}</span>
                            {currencySymbol}
                            {scordiPayment.price.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div>
                    <PaidCard scordiPayment={scordiPayment} />
                </div>

                <div
                    onClick={
                        invoiceUrl
                            ? undefined
                            : () => alert('청구서 주소를 불러오지 못했습니다.\n관리자에게 문의해주세요.')
                    }
                >
                    <LinkTo
                        className={`btn3 btn-sm ${!invoiceUrl ? 'btn-disabled opacity-50 !cursor-not-allowed' : ''}`}
                        href={invoiceUrl}
                        target="_blank"
                    >
                        청구서 보기
                    </LinkTo>
                </div>
            </div>
        </div>
    );
});

const PaidCard = memo((props: {scordiPayment: ScordiPaymentDto}) => {
    const {scordiPayment} = props;

    const response = scordiPayment.response;
    const card = response?.card;
    const company = response?.cardIssuerCompany;

    return (
        <div className="flex items-center gap-2">
            {/*<Avatar className="w-6">*/}
            {/*    {company?.logo ? (*/}
            {/*        <img src={company?.logo} alt="" />*/}
            {/*    ) : (*/}
            {/*        <FaRegCreditCard size={20} className="h-full w-full p-[6px]" />*/}
            {/*    )}*/}
            {/*</Avatar>*/}
            <Tippy content={response?.fullCardNumber}>
                <div className="flex items-center gap-2 text-12 leading-none cursor-pointer">
                    <div className="flex items-center gap-1">
                        <span>{company?.displayName}</span>
                        <span>({card?.number.slice(-4)})</span>
                    </div>
                    <span>·</span>
                    <span className="text-gray-400">
                        {card?.ownerType} / {card?.cardType}
                    </span>
                </div>
            </Tippy>
        </div>
    );
});
