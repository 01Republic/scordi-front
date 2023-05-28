import React, {memo, useEffect} from 'react';
import {DateRange, Range} from 'react-date-range';
import {useForm} from 'react-hook-form';
import {yyyy_mm_dd} from '^utils/dateTime';
import {atom, useRecoilState} from 'recoil';

export const dateRangeSelectAtom = atom<Range>({
    key: 'dateRangeSelectAtom',
    default: {
        startDate: undefined, // subDays(new Date(), 30),
        endDate: undefined, // new Date(),
        key: 'selection',
    },
});

interface DateRangeSelectProps {
    startDate?: Date;
    endDate?: Date;
    onChange: (range: Range) => any;
}

export const DateRangeSelect = memo((props: DateRangeSelectProps) => {
    const [state, setState] = useRecoilState(dateRangeSelectAtom);
    const form = useForm<{
        startDate?: string;
        endDate?: string;
    }>();
    const {startDate, endDate, onChange} = props;

    useEffect(() => {
        setState((rage) => ({
            ...rage,
            startDate,
            endDate,
        }));
    }, []);

    useEffect(() => {
        form.setValue('startDate', state.startDate ? yyyy_mm_dd(state.startDate) : undefined);
        form.setValue('endDate', state.endDate ? yyyy_mm_dd(state.endDate) : undefined);
        onChange(state);
    }, [state]);

    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="flex gap-2">
                <input type="date" className="input input-bordered" {...form.register('startDate')} readOnly={true} />
                <input type="date" className="input input-bordered" {...form.register('endDate')} readOnly={true} />
            </label>
            <div className="dropdown-content mt-4">
                <DateRange
                    className="rounded-lg border border-slate-300"
                    editableDateInputs={true}
                    onChange={(item) => setState(item['selection'])}
                    moveRangeOnFirstSelection={false}
                    ranges={[state]}
                    months={2}
                    direction="horizontal"
                    dateDisplayFormat="yyyy. MM. dd"
                    showDateDisplay={false}
                />
            </div>
        </div>
    );
});
