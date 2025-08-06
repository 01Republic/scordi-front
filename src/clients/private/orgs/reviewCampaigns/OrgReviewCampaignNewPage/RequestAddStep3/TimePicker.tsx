import {Button} from '^public/components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '^public/components/ui/popover';
import {ChevronDown} from 'lucide-react';
import {useTranslation} from 'next-i18next';

interface TimePickerProps {
    onSelect: (time: string) => void;
    time?: string;
}

export const TimePicker = (props: TimePickerProps) => {
    const {time, onSelect} = props;
    const {t} = useTranslation('reviewCampaigns');

    const times = Array.from({length: 24}, (_, h) =>
        ['00', '30'].map((m) => `${String(h).padStart(2, '0')}:${m}`),
    ).flat();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={
                        'w-24 h-12 bg-gray-50 flex justify-between text-left font-normal items-center text-gray-500'
                    }
                >
                    {time ? time : t('timePicker.placeholder')}
                    <ChevronDown size={14} className="text-gray-400" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-24 p-2 flex flex-col items-center space-y-1 bg-white h-80 overflow-auto">
                {times.map((time) => (
                    <Button key={time} variant="ghost" className="w-full text-sm" onClick={() => onSelect(time)}>
                        {time}
                    </Button>
                ))}
            </PopoverContent>
        </Popover>
    );
};
