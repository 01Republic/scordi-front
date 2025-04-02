import React from 'react';
import {useRecoilState} from 'recoil';
import {ChevronDown, ChevronRight} from 'lucide-react';
import {Card} from '^public/components/ui/card';
import {Input} from '^public/components/ui/input';
import {Button} from '^public/components/ui/button';
import {Textarea} from '^public/components/ui/textarea';
import {createReviewCampaignRequestAtom, reviewCampaignCreateStepAtom} from '../atom';

export const RequestAddStep1 = () => {
    const [step, setStep] = useRecoilState(reviewCampaignCreateStepAtom);
    const [formData, setFormData] = useRecoilState(createReviewCampaignRequestAtom);

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
                    <div className={'flex flex-col space-y-2'}>
                        <div className={'text-16 font-medium'}>
                            요청 제목 <span className={'text-red-400'}>*</span>
                        </div>
                        <Input
                            type={'text'}
                            id={'title'}
                            placeholder={'제목을 입력해주세요.'}
                            className={'bg-white'}
                            defaultValue={formData.title}
                            onChange={(e) => {
                                setFormData((prev) => ({...prev, title: e.target.value}));
                            }}
                        />
                    </div>
                    <div className="grid w-full items-center gap-2">
                        <div className={'text-16 font-medium'}>
                            요청 내용 <span className={'text-red-400'}>*</span>
                        </div>
                        <Textarea
                            id="description"
                            placeholder="최대 200자 입력"
                            className={'min-h-40'}
                            defaultValue={formData.description}
                            onChange={(e) => {
                                setFormData((prev) => ({...prev, description: e.target.value}));
                            }}
                        />
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
