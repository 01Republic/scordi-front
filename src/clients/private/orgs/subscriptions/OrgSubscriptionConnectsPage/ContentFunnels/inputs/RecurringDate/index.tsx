import {memo} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {FadeUp} from '^components/FadeUp';
import {createSubscriptionFormData, recurringIsFreeAtom} from '../../atom';
import {InputSection} from '../InputSection';
import {yyyy_mm_dd} from '^utils/dateTime';

export const RecurringDate = memo(() => {
    const isFree = useRecoilValue(recurringIsFreeAtom);
    const [formData, setFormData] = useRecoilState(createSubscriptionFormData);

    const onChange = (lastPaidAt?: Date) => {
        setFormData((f) => ({...f, lastPaidAt}));
    };

    return (
        <FadeUp show={!isFree} delay="delay-[300ms]">
            <InputSection title="결제일" desc="마지막 결제일 또는 결제 예정일을 선택해주세요.">
                <label>
                    <input
                        type="date"
                        className="input border-gray-200 bg-gray-100 text-16 w-full"
                        defaultValue={formData.lastPaidAt ? yyyy_mm_dd(formData.lastPaidAt) : ''}
                        onChange={(e) => {
                            onChange(new Date(e.target.value));
                        }}
                    />
                </label>
            </InputSection>
        </FadeUp>
    );
});
RecurringDate.displayName = 'RecurringDate';
