import {memo} from 'react';
import {MobileGrid} from '^components/v2/MobileGridSection';
import {WithChildren} from '^types/global.type';
import {MobileSection} from '^components/v2/MobileSection';
import {UseFormReturn} from 'react-hook-form';
import {MobileKeyValueItem} from '^components/v2/MobileKeyValueItem';
import {UpdateBillingHistoryRequestDto} from '^models/BillingHistory/type';

type BillingHistoryInputsBlockProps = {
    form: UseFormReturn<UpdateBillingHistoryRequestDto, any>;
};

export const BillingHistoryInputsBlock = memo((props: BillingHistoryInputsBlockProps) => {
    const {form} = props;

    console.log(form.getValues());

    return (
        <MobileSection className="pb-3 border-b-8">
            <MobileKeyValueItem label="결제일시">
                <div className="form-control w-3/5 max-w-xs px-3">
                    <input type="date" className="input input-underline text-right px-1" {...form.register('paidAt')} />
                    <span></span>
                </div>
            </MobileKeyValueItem>

            {/*<MobileKeyValueItem label="결제상태">*/}
            {/*    /!*<div className="form-control w-3/5 max-w-xs">*!/*/}
            {/*    /!*    /!*<select className="select select-ghost w-full max-w-xs">*!/*!/*/}
            {/*    /!*    /!*    <option disabled selected>*!/*!/*/}
            {/*    /!*    /!*        Pick the best JS framework*!/*!/*/}
            {/*    /!*    /!*    </option>*!/*!/*/}
            {/*    /!*    /!*    <option>Svelte</option>*!/*!/*/}
            {/*    /!*    /!*    <option>Vue</option>*!/*!/*/}
            {/*    /!*    /!*    <option>React</option>*!/*!/*/}
            {/*    /!*    /!*</select>*!/*!/*/}
            {/*    /!*</div>*!/*/}
            {/*    <div className="form-control w-3/5 max-w-xs">*/}
            {/*        <label className="cursor-pointer label px-3 text-right">*/}
            {/*            <input*/}
            {/*                types="checkbox"*/}
            {/*                className="toggle toggle-primary ml-auto"*/}
            {/*                {...form.register('isSuccess')}*/}
            {/*            />*/}
            {/*        </label>*/}
            {/*    </div>*/}
            {/*</MobileKeyValueItem>*/}
        </MobileSection>
    );
});
