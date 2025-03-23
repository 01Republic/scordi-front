import React from 'react';
import {useRecoilState} from 'recoil';
import {Card} from '^public/components/ui/card';
import {Button} from '^public/components/ui/button';
import {Checkbox} from '^public/components/ui/checkbox';
import {requestAddStepAtom} from '^clients/private/orgs/requests/OrgRequestAddPage';
import {DatePicker} from '^clients/private/orgs/requests/OrgRequestAddPage/RequestAddStep3/DatePicker';
import {TimePicker} from '^clients/private/orgs/requests/OrgRequestAddPage/RequestAddStep3/TimePicker';

export const RequestAddStep3 = () => {
    const [step, setStep] = useRecoilState(requestAddStepAtom);
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const [time, setTime] = React.useState<string | undefined>(undefined);

    const onPrevious = () => {
        setStep(step - 1);
    };

    const onNext = () => {
        setStep(step + 1);
    };

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
                        <DatePicker date={date} onSelect={setDate} />
                        <TimePicker time={time} onSelect={setTime} />
                    </div>
                </div>
            </div>
            <div className={'flex justify-end space-x-4'}>
                <Button size={'xl'} variant={'gray'} onClick={onPrevious}>
                    뒤로
                </Button>
                <Button size={'xl'} variant={'scordi'} onClick={onNext}>
                    다음
                </Button>
            </div>
        </Card>
    );
};
