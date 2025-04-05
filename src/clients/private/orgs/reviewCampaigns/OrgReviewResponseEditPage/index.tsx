import React from 'react';
import {Button} from '^public/components/ui/button';
import {Textarea} from '^public/components/ui/textarea';
import {Card} from '^public/components/ui/card';
import {Input} from '^public/components/ui/input';
import {CheckboxWithLabel} from '^public/components/mixed/CheckboxWithLabel';
import {TeamSelect} from '^v3/V3OrgTeam/modals/TeamMemberShowModal/TeamMemberShowBody/TeamMemberEditPanel/TeamSelect';
import {SubscriptionItemOfResponse} from './SubscriptionItemOfResponse';

export const OrgReviewResponseEditPage = () => {
    return (
        <div style={{backgroundColor: '#EFEFFD'}}>
            <div className={'space-y-5 min-h-lvh max-w-screen-sm mx-auto py-20'}>
                <Card className={'bg-white pb-6 space-y-5 overflow-hidden'}>
                    <div className={'bg-scordi h-3'} />
                    <div className={'px-7 space-y-5'}>
                        <div className={'text-3xl font-medium text-gray-900'}>요청의 제목과 내용을 입력해 주세요</div>
                        <div className={'text-16 text-gray-800'}>
                            자산 조사와 관련된 정보를 수집하고 있습니다. 이에 따라 귀하의 자산에 대한 관련 자료를
                            요청드리고자 합니다. 귀하께서 제공하실 수 있는 자료는 큰 도움이 될 것입니다. 만약 제공
                            가능한 정보나 자료에 제한이 있다면, 그에 대한 설명도 함께 부탁드립니다. 이 요청에 대한
                            답변을 [요청 답변 기한]까지 주시면 감사하겠습니다. 혹시 이와 관련하여 궁금한 점이나 추가
                            사항이 있으시면 언제든지 연락해 주십시오. 감사합니다.
                        </div>
                        <div className={'text-14 text-red-400'}>* 표시는 필수 질문입니다.</div>
                    </div>
                </Card>

                <Card className={'bg-white px-7 py-6 space-y-5'}>
                    <div className={'grid grid-cols-2 gap-5'}>
                        <div className={'flex flex-col space-y-2'}>
                            <div className={'text-16 font-medium'}>
                                응답자 이름 <span className={'text-red-400'}>*</span>
                            </div>
                            <Input type={'text'} id={'name'} placeholder={'응답자 이름'} className={'bg-white'} />
                        </div>
                        <div className={'flex flex-col space-y-2'}>
                            <div className={'text-16 font-medium'}>
                                팀 <span className={'text-red-400'}>*</span>
                            </div>
                            <TeamSelect onSelect={(selectedTeam) => console.log(selectedTeam)} />
                        </div>
                    </div>
                    <div className={'flex flex-col space-y-2'}>
                        <div className={'text-16 font-medium'}>
                            이메일 계정 <span className={'text-red-400'}>*</span>
                        </div>
                        <Input type={'email'} id={'email'} placeholder={'이메일 계정'} className={'bg-white'} />
                    </div>
                </Card>

                <Card className={'bg-white px-7 py-6 space-y-5'}>
                    <div className={'text-16 font-medium'}>
                        구독중인 서비스 <span className={'text-red-400'}>*</span>
                    </div>
                    <div>
                        <SubscriptionItemOfResponse />
                        <SubscriptionItemOfResponse />
                        <SubscriptionItemOfResponse />
                    </div>
                </Card>

                <Card className={'bg-white px-7 py-6 space-y-5'}>
                    <div className="grid w-full items-center space-y-3">
                        <div className={'text-16 font-medium'}>추가적으로 문의사항이 있다면 남겨주세요.</div>
                        <Textarea id="description" placeholder="주관식 답변" className={'bg-white min-h-40'} />
                    </div>
                </Card>

                <div className={'grid w-full items-center'}>
                    <Button size={'xl'} variant={'scordi'}>
                        작성 완료
                    </Button>
                    <div className={'text-gray-400 text-center py-3 text-12'}>powered by scordi</div>
                </div>
            </div>
        </div>
    );
};
