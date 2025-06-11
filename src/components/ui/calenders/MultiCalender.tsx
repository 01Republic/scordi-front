import {memo} from 'react';
import {DatesProvider, DatePickerInput} from '@mantine/dates';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

interface MultiCalenderProps {
    startAt: Date | null;
    finishAt: Date | null;
    onChange?: (payload: {startAt: Date | null; finishAt: Date | null}) => void;
    //style
    textColor?: string;
    textSize?: string;
    fontSize?: string;
    textHover?: string;
}

export const MultiCalender = memo((props: MultiCalenderProps) => {
    const {startAt, finishAt, onChange} = props;
    const {textColor = 'text-gray-400', textSize = 'text-14', fontSize = 'font-normal', textHover = ''} = props;

    const value = startAt || finishAt ? ([startAt, finishAt] as [Date, Date]) : undefined;

    return (
        <DatesProvider settings={{locale: 'ko'}}>
            <DatePickerInput
                type="range"
                numberOfColumns={2}
                allowSingleDateInRange
                variant="unstyled"
                valueFormat="YYYY-MM-DD"
                value={value}
                placeholder="선택해주세요.."
                onChange={([start, end]) => {
                    if (!start || !end) return;

                    onChange?.({startAt: new Date(start), finishAt: new Date(end)});
                }}
                popoverProps={{position: 'bottom-end', offset: {mainAxis: 3, crossAxis: 0}}}
                classNames={{
                    root: '!w-full',
                    input: `!${textColor} !${textSize} !${fontSize} !${textHover}`,
                    placeholder: '!group-hover:text-gray-400 !hover:text-gray-400',
                    day: '[&[data-selected]]:bg-primaryColor-700 [&[data-in-range]]:bg-primaryColor-bg hover:!bg-primaryColor-weak focus:!bg-primaryColor-800 active:!bg-primaryColor-900',
                }}
            />
        </DatesProvider>
    );
});
