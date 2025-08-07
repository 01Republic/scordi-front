import React, {memo} from 'react';
import {DatesProvider, DatePickerInput} from '@mantine/dates';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import {ControlsGroupSettings} from '@mantine/dates/lib/types/ControlsGroupSettings';

interface SingleCalendarProps {
    defaultValue?: Date;
    date: Date | null;
    onChange?: (date: Date) => void;
    textColor?: string;
    textSize?: string;
    fontSize?: string;
    textHover?: string;
    containerClassName?: string;
    placeHolder?: string;
    mainAxis?: number;
    crossAxis?: number;
    maxDate?: ControlsGroupSettings['maxDate'];
}

export const SingleCalendar = memo((props: SingleCalendarProps) => {
    const {defaultValue, date, onChange} = props;
    const {
        textColor = 'text-gray-400',
        textSize = 'text-14',
        fontSize = 'font-normal',
        textHover = '',
        containerClassName = '',
        placeHolder = '날짜를 선택해주세요',
        mainAxis = 0,
        crossAxis = 0,
        maxDate,
    } = props;

    const displayDate = defaultValue || date || null;

    return (
        <DatesProvider settings={{locale: 'ko'}}>
            <DatePickerInput
                type="default"
                classNames={{
                    root: `!w-full ${containerClassName}`,
                    input: `!${textColor} !${textSize} !${fontSize} !${textHover}`,
                    placeholder: '!text-gray-500',
                    day: '[&[data-selected]]:bg-primaryColor-700 [&[data-hovered]]:bg-primaryColor-weak hover:!bg-primaryColor-weak focus:!bg-primaryColor-800 active:!bg-primaryColor-900',
                }}
                valueFormat="YYYY-MM-DD"
                placeholder={placeHolder}
                value={displayDate}
                onChange={(selected) => onChange?.(new Date(selected))}
                popoverProps={{position: 'bottom-start', offset: {mainAxis, crossAxis}}}
                variant="unstyled"
                maxDate={maxDate}
            />
        </DatesProvider>
    );
});
