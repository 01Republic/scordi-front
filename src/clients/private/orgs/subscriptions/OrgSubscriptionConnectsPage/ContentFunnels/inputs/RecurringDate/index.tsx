import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {recurringIsFreeAtom} from '../../atom';
import {FadeUp} from '../../_common/FadeUp';
import {InputSection} from '../InputSection';

interface RecurringDateProps {}

export const RecurringDate = memo((props: RecurringDateProps) => {
    const isFree = useRecoilValue(recurringIsFreeAtom);

    return (
        <FadeUp show={!isFree} delay="delay-[300ms]">
            <InputSection title="결제일" desc="마지막으로 언제 결제되었나요?">
                <input type="date" className="input border-gray-200 bg-gray-100 text-16 w-full" />
            </InputSection>
        </FadeUp>
    );
});
RecurringDate.displayName = 'RecurringDate';
