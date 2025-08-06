import {Button} from '^public/components/ui/button';
import {Calendar} from '^public/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '^public/components/ui/popover';
import cn from 'classnames';
import {format} from 'date-fns';
import {ChevronDown} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {DayPickerSingleProps} from 'react-day-picker';

interface DatePickerProps {
    onSelect: (date: Date | undefined) => void;
    date?: Date;
    disabled?: DayPickerSingleProps['disabled'];
}

export const DatePicker = (props: DatePickerProps) => {
    const {date, onSelect, disabled} = props;
    const {t} = useTranslation('reviewCampaigns');

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-48 h-12 bg-gray-50 flex justify-between text-left font-normal items-center text-gray-500',
                        !date && 'text-muted-foreground',
                    )}
                >
                    {date ? format(date, 'yyyy년 MM월 dd일') : <span>{t('step3.datePlaceholder')}</span>}
                    <ChevronDown size={14} className="text-gray-400" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white" align="start">
                <Calendar mode="single" selected={date} onSelect={onSelect} disabled={disabled} initialFocus />
            </PopoverContent>
        </Popover>
    );
};
