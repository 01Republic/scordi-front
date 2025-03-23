import {Card} from '^public/components/ui/card';
import {Label} from '^public/components/ui/label';
import {Input} from '^public/components/ui/input';
import {Textarea} from '^public/components/ui/textarea';
import {Button} from '^public/components/ui/button';
import {useRecoilState} from 'recoil';
import {requestAddStepAtom} from '^clients/private/orgs/requests/OrgRequestAddPage/index';

export const RequestAddStep4 = () => {
    const [step, setStep] = useRecoilState(requestAddStepAtom);

    const onPrevious = () => {
        setStep(step - 1);
    };

    return (
        <Card className={'bg-white p-10 space-y-10'}>
            <div className={'text-xl font-bold text-gray-900'}>
                요청 추가를 완료하고 구성원들에게 요청을 전송할까요?
            </div>
            <div className="grid w-full items-center gap-2">
                <Label htmlFor="title">제목</Label>
                <Input type="text" id="title" placeholder="요청 제목" />
            </div>
            <div className="grid w-full items-center gap-2">
                <Label htmlFor="email">설명</Label>
                <Textarea id="description" placeholder="요청 설명" />
            </div>
            <div>
                <div>응답 대상자</div>
                <div>총 11명</div>
            </div>
            <div className={'flex justify-end space-x-4'}>
                <Button size={'xl'} variant={'gray'} onClick={onPrevious}>
                    뒤로
                </Button>
                <Button size={'xl'} variant={'scordi'}>
                    완료
                </Button>
            </div>
        </Card>
    );
};
