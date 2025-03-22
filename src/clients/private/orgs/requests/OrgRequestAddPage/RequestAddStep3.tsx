import {InputSection} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs';
import {ButtonGroupRadio} from '^components/util/form-control/inputs';
import {Button} from '^public/components/ui/button';
import {Card} from '^public/components/ui/card';
import React, {useState} from 'react';
import {Checkbox} from '^public/components/ui/checkbox';
import {Popover, PopoverContent, PopoverTrigger} from '^public/components/ui/popover';
import {Calendar} from '^public/components/ui/calendar';
import {CalendarIcon} from 'lucide-react';
import cn from 'classnames';
import {format} from 'date-fns';

export const RequestAddStep3 = () => {
    const [date, setDate] = React.useState<Date>();

    return (
        <Card className={'bg-white p-10 space-y-10'}>
            <div className={'text-xl font-bold text-gray-900'}>요청 관련 설정을 선택해 주세요</div>
            <div className={'space-y-5'}>
                <div className={'text-18 font-medium'}>내가 받을 알림 설정</div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="alarmForMe" />
                    <label
                        htmlFor="alarmForMe"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        개별 응답자가 답변 제출 시 알림 받기
                    </label>
                </div>
            </div>
            <div className={'space-y-5'}>
                <div className={'text-18 font-medium'}>응답자에게 발송되는 알림 설정</div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="alarmForMember" />
                    <label
                        htmlFor="alarmForMember"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        요청 생성 시 모든 응답자들에게 알림 주기
                    </label>
                </div>
            </div>
            <div className={'space-y-5'}>
                <div className={'text-18 font-medium'}>제출 마감일 설정</div>
                <div className={'space-y-2'}>
                    <div className={'text-gray-500 text-14'}>마감일은 추후 변경 가능합니다.</div>
                    <div className={'flex space-x-4 items-center'}>
                        <DatePicker />
                        <TimePicker />
                    </div>
                </div>
            </div>
            <div className={'flex justify-end space-x-4'}>
                <Button size={'xl'} variant={'gray'}>
                    뒤로
                </Button>
                <Button size={'xl'} variant={'scordi'}>
                    다음
                </Button>
            </div>
        </Card>
    );
};

const DatePicker = () => {
    const [date, setDate] = React.useState<Date>();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn('w-[240px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
                >
                    <CalendarIcon />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
        </Popover>
    );
};

const TimePicker = () => {
    const [selectedTime, setSelectedTime] = useState('12:00');

    const times = Array.from({length: 24}, (_, h) =>
        ['00', '30'].map((m) => `${String(h).padStart(2, '0')}:${m}`),
    ).flat();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">{selectedTime}</Button>
            </PopoverTrigger>
            <PopoverContent className="w-24 p-2 flex flex-col items-center space-y-1 bg-white h-80 overflow-auto">
                {times.map((time) => (
                    <Button key={time} variant="ghost" className="w-full text-sm" onClick={() => setSelectedTime(time)}>
                        {time}
                    </Button>
                ))}
            </PopoverContent>
        </Popover>
    );
};
