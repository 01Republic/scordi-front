import {Label} from '^public/components/ui/label';
import {Input} from '^public/components/ui/input';
import {Textarea} from '^public/components/ui/textarea';
import {Button} from '^public/components/ui/button';
import {Card} from '^public/components/ui/card';

export const RequestAddStep2 = () => {
    return (
        <Card className={'bg-white p-10 space-y-8'}>
            <div className={'text-xl font-bold text-gray-900'}>요청의 제목과 내용을 입력해 주세요</div>
            <div className="grid w-full items-center gap-2">
                <Label htmlFor="title">제목</Label>
                <Input type="text" id="title" placeholder="요청 제목" />
            </div>
            <div className="grid w-full items-center gap-2">
                <Label htmlFor="email">설명</Label>
                <Textarea id="description" placeholder="요청 설명" />
            </div>
            <div className={'flex justify-end space-x-4'}>
                <Button size={'lg'} variant={'gray'}>
                    취소
                </Button>
                <Button size={'lg'} variant={'scordi'}>
                    다음
                </Button>
            </div>
        </Card>
    );
};
