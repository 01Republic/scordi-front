import {Label} from '^public/components/ui/label';
import {Button} from '^public/components/ui/button';
import {Textarea} from '^public/components/ui/textarea';
import React from 'react';
import {Card} from '^public/components/ui/card';
import {SubscriptionItemOfResponse} from '^clients/private/orgs/requests/OrgResponsePage/SubscriptionItemOfResponse';
import {CheckboxWithLabel} from '^public/components/mixed/CheckboxWithLabel';
import {InputWithLabel} from '^public/components/mixed/InputWithLabel';

export const OrgResponsePage = () => {
    return (
        <div className={'bg-gray-50 p-10 space-y-8 min-h-lvh'}>
            <div className={'text-xl font-bold text-gray-900'}>요청의 제목과 내용을 입력해 주세요</div>
            <Card className={'bg-white p-5'}>
                <div className={'text-16 text-gray-800'}>
                    자산 조사와 관련된 정보를 수집하고 있습니다. 이에 따라 귀하의 자산에 대한 관련 자료를 요청드리고자
                    합니다. 귀하께서 제공하실 수 있는 자료는 큰 도움이 될 것입니다. 만약 제공 가능한 정보나 자료에
                    제한이 있다면, 그에 대한 설명도 함께 부탁드립니다. 이 요청에 대한 답변을 [요청 답변 기한]까지 주시면
                    감사하겠습니다. 혹시 이와 관련하여 궁금한 점이나 추가 사항이 있으시면 언제든지 연락해 주십시오.
                    감사합니다.
                </div>
            </Card>
            <InputWithLabel id={'name'} label={'응답자 이름'} placeholder={'응답자 이름 입력'} className={'max-w-md'} />
            <InputWithLabel
                id={'email'}
                label={'이메일 계정'}
                placeholder={'이메일 계정 입력'}
                className={'max-w-md'}
            />
            <InputWithLabel id={'team'} label={'팀'} placeholder={'팀 이름 입력'} className={'max-w-md'} />
            <div>구독중인 서비스</div>
            <Card className={'p-5 bg-white'}>
                <SubscriptionItemOfResponse />
                <SubscriptionItemOfResponse />
                <SubscriptionItemOfResponse />
            </Card>
            <div className="grid w-full items-center gap-2">
                <Label htmlFor="email">새롭게 이용 중인 구독 서비스가 있나요?</Label>
                <CheckboxWithLabel id={'checkNewSubscription'} label={'예'} />
                <CheckboxWithLabel id={'uncheckNewSubscription'} label={'아니오'} />
            </div>
            <div className="grid w-full items-center gap-2">
                <Label htmlFor="email">추가적으로 궁금한 점이 있으신가요?</Label>
                <Textarea id="description" placeholder="요청 설명" className={'bg-white min-h-40'} />
            </div>
            <div className={'flex justify-end space-x-4'}>
                <Button size={'xl'} variant={'scordi'}>
                    작성 완료
                </Button>
            </div>
        </div>
    );
};
