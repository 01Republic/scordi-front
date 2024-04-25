import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {subjectReportProductItem} from '../../atom';
import {RecurringType} from '../../dto/report-item-form.dto';
import {CurrencyCode} from '^models/Money';

export const ItemInfo = memo(function ItemInfo() {
    const subjectItem = useRecoilValue(subjectReportProductItem);
    const {formData} = subjectItem || {};

    const isFree = formData?.isFree;
    const recurringType = formData?.recurringType;
    const payAmount = formData?.payAmount || 0;
    const currencyType = formData?.currencyType;
    const isPerUser = formData?.isPerUser;

    return (
        <div className="w-full mb-[3rem]">
            {isFree ? (
                <h2 className="text-3xl">
                    <span className="bg-gray-100 rounded-lg py-2 px-3 text-scordi">무료</span>
                    <span className="ml-2">로 사용 중</span>
                </h2>
            ) : (
                <h2 className="text-3xl">
                    <span className="mr-4">
                        {recurringType === RecurringType.Monthly && '매달'}
                        {recurringType === RecurringType.Yearly && '매년'}
                        {recurringType === RecurringType.Onetime && '1회성 비용'}
                    </span>
                    <span className="mr-1 text-scordi">{payAmount.toLocaleString()}</span>
                    <span className="mr-2 text-scordi">
                        {currencyType === CurrencyCode.KRW && '원'}
                        {currencyType === CurrencyCode.USD && '달러'}
                    </span>
                    <small>{isPerUser && '/명'}</small>
                </h2>
            )}
        </div>
    );
});
