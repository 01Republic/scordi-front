import React, {memo} from 'react';
import {UpdateBillingHistoryRequestDto} from '^types/billing.type';
import {TitleSection} from '^components/v2/TitleSection';
import {UseFormReturn} from 'react-hook-form';

type BillingHistoryAmountInputBlockProps = {
    form: UseFormReturn<UpdateBillingHistoryRequestDto, any>;
};

export const BillingHistoryAmountInputBlock = memo((props: BillingHistoryAmountInputBlockProps) => {
    const {form} = props;

    return (
        <TitleSection.Title size="2xl" className="text-left py-3">
            <div className="font-bold flex">
                <span className="whitespace-nowrap flex items-center">- US$</span>

                <div className="form-control w-3/5 max-w-xs px-2">
                    <input
                        id="lastPaidAmount"
                        type="number"
                        step="0.01"
                        placeholder="0.01"
                        className="input input-underline w-full text-2xl px-1"
                        autoComplete="off"
                        required
                        {...form.register('paidAmount')}
                    />
                    <span />
                    {/*<input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />*/}
                    {/*<label className="label">*/}
                    {/*    <span className="label-text-alt">Alt label</span>*/}
                    {/*    <span className="label-text-alt">Alt label</span>*/}
                    {/*</label>*/}
                </div>
            </div>
        </TitleSection.Title>
    );
});
