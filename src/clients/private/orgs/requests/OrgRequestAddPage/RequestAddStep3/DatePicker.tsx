import React from 'react';
import cn from 'classnames';
import {format} from 'date-fns';
import {CalendarIcon} from 'lucide-react';
import {Button} from '^public/components/ui/button';
import {Calendar} from '^public/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '^public/components/ui/popover';

interface DatePickerProps {
    onSelect?: (date: Date | undefined) => void;
    date?: Date;
}

export const DatePicker = (props: DatePickerProps) => {
    const {date, onSelect} = props;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-48 h-12 bg-gray-50 flex justify-start text-left font-normal items-center text-gray-500',
                        !date && 'text-muted-foreground',
                    )}
                >
                    {date ? format(date, 'yyyy년 MM월 dd일') : <span>날짜 선택</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white" align="start">
                <Calendar mode="single" selected={date} onSelect={onSelect} initialFocus />
            </PopoverContent>
        </Popover>
    );
};
