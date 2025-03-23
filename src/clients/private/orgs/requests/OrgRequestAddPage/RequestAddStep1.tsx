import {Card} from '^public/components/ui/card';
import {Input} from '^public/components/ui/input';
import {Textarea} from '^public/components/ui/textarea';
import {Button} from '^public/components/ui/button';
import {Label} from '^public/components/ui/label';
import {useRecoilState} from 'recoil';
import {requestAddStepAtom} from '^clients/private/orgs/requests/OrgRequestAddPage/index';
import {useRouter} from 'next/router';

export const RequestAddStep1 = () => {
    const [step, setStep] = useRecoilState(requestAddStepAtom);
    const router = useRouter();

    const onCancel = () => {
        router.back();
    };

    const onNext = () => {
        setStep(step + 1);
    };

    return (
        <Card className={'bg-white p-10 space-y-10'}>
            <div className={'text-xl font-bold text-gray-900'}>요청의 제목과 내용을 입력해 주세요</div>
            <div className="grid w-full items-center gap-2">
                <Label htmlFor="title">제목</Label>
                <Input type="text" id="title" placeholder="요청 제목" />
            </div>
            <div className="grid w-full items-center gap-2">
                <Label htmlFor="email">설명</Label>
                <Textarea id="description" placeholder="요청 설명" className={'min-h-40'} />
            </div>
            <div className={'flex justify-end space-x-4'}>
                <Button size={'xl'} variant={'gray'} onClick={onCancel}>
                    취소
                </Button>
                <Button size={'xl'} variant={'scordi'} onClick={onNext}>
                    다음
                </Button>
            </div>
        </Card>
    );
};
