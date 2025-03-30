import React from 'react';
import {useRecoilState} from 'recoil';
import {Card} from '^public/components/ui/card';
import {Button, buttonVariants} from '^public/components/ui/button';
import {requestAddStepAtom} from '^clients/private/orgs/requests/OrgRequestAddPage';
import {DatePicker} from '^clients/private/orgs/requests/OrgRequestAddPage/RequestAddStep3/DatePicker';
import {TimePicker} from '^clients/private/orgs/requests/OrgRequestAddPage/RequestAddStep3/TimePicker';
import {CheckboxWithLabel} from '^public/components/mixed/CheckboxWithLabel';
import {ChevronDown, ChevronRight} from 'lucide-react';
import {confirm2, confirmed} from '^components/util/dialog';
import {codefAccountAdminApi} from '^models/CodefAccount/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '^public/components/ui/alert-dialog';

export const RequestAddStep3 = () => {
    const [step, setStep] = useRecoilState(requestAddStepAtom);
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const [time, setTime] = React.useState<string | undefined>(undefined);

    const onNext = () => {
        setStep(step + 1);
    };

    const onSubmit = () => {
        const syncConfirm = () => confirm2('새 요청을 생성하고 알림을 보낼까요?', 'adf');
        return confirmed(syncConfirm())
            .then(() => null)
            .then(() => toast.success('패치 완료'))
            .catch(errorToast);
    };

    return (
        <Card className={'bg-white mb-4'}>
            <div
                className={
                    'px-9 py-5 flex items-center justify-start space-x-2 text-xl font-bold text-gray-900 cursor-pointer'
                }
                onClick={() => setStep(3)}
            >
                {step === 3 ? <ChevronDown /> : <ChevronRight />}
                <span>3. 제출 마감일 설정</span>
            </div>
            {step === 3 && (
                <div className={'p-9 space-y-10 border-t'}>
                    <div className={'text-xl font-bold text-gray-900'}>요청 관련 설정을 선택해 주세요</div>

                    <div className={'space-y-5'}>
                        <div className={'text-18 font-medium'}>내가 받을 알림 설정</div>
                        <div className="flex items-center space-x-2">
                            <CheckboxWithLabel id={'alarmForMe'} label={'개별 응답자가 답변 제출 시 알림 받기'} />
                        </div>
                    </div>

                    <div className={'space-y-5'}>
                        <div className={'text-18 font-medium'}>응답자에게 발송되는 알림 설정</div>
                        <CheckboxWithLabel id={'alarmForMember'} label={'요청 생성 시 모든 응답자들에게 알림 주기'} />
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

                    <div className={'flex justify-center space-x-4'}>
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button size={'xl'} variant={'scordi'} className={'w-64'}>
                                    완료
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent
                                className={
                                    'fixed top-1/2 left-1/2 w-[90vw] bg-white max-w-md -translate-x-1/2 -translate-y-1/2'
                                }
                            >
                                <AlertDialogHeader>
                                    <AlertDialogTitle>새 요청을 생성하고 알림을 보낼까요?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        요청 대상자들에게 지금 바로 알림이 보내져요.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className={buttonVariants({variant: 'gray'})}>
                                        돌아가기
                                    </AlertDialogCancel>
                                    <AlertDialogAction className={buttonVariants({variant: 'scordi'})}>
                                        생성 완료하기
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            )}
        </Card>
    );
};
