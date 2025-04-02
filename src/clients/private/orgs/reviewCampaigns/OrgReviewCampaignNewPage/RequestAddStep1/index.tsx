import React from 'react';
import {useRouter} from 'next/router';
import {useRecoilState} from 'recoil';
import {ChevronDown, ChevronRight} from 'lucide-react';
import {Card} from '^public/components/ui/card';
import {Textarea} from '^public/components/ui/textarea';
import {Button} from '^public/components/ui/button';
import {Label} from '^public/components/ui/label';
import {InputWithLabel} from '^public/components/mixed/InputWithLabel';
import {reviewCampaignCreateStepAtom} from '../atom';

export const RequestAddStep1 = () => {
    const [step, setStep] = useRecoilState(reviewCampaignCreateStepAtom);
    const router = useRouter();

    const onNext = () => setStep((s) => s + 1);

    return (
        <Card className={'bg-white mb-4'}>
            <div
                className={
                    'px-9 py-5 flex items-center justify-start space-x-2 text-xl font-bold text-gray-900 cursor-pointer'
                }
                onClick={() => setStep(1)}
            >
                {step === 1 ? <ChevronDown /> : <ChevronRight />}
                <span>1. 제목과 내용 작성</span>
            </div>
            {step === 1 && (
                <div className={'p-9 space-y-10 border-t'}>
                    <InputWithLabel id={'title'} label={'제목'} placeholder={'요청 제목'} />
                    <div className="grid w-full items-center gap-2">
                        <Label htmlFor="description">설명</Label>
                        <Textarea id="description" placeholder="요청 설명" className={'min-h-40'} />
                    </div>
                    <div className={'flex justify-center space-x-4'}>
                        <Button size={'xl'} variant={'scordi'} onClick={onNext} className={'w-64'}>
                            다음
                        </Button>
                    </div>
                </div>
            )}
        </Card>
    );
};
