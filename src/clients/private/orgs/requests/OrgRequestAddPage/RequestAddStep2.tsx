import {Button} from '^public/components/ui/button';
import {Card} from '^public/components/ui/card';
import {ButtonGroupRadio} from '^components/util/form-control/inputs';
import {InputSection} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs';
import React from 'react';

export const RequestAddStep2 = () => {
    const [toAllMembers, setToAllMembers] = React.useState(true);

    return (
        <Card className={'bg-white p-10 space-y-8'}>
            <div className={'text-xl font-bold text-gray-900'}>요청의 제목과 내용을 입력해 주세요</div>
            <div>
                기본적으론 이메일과 슬랙 중에 연동된 플랫폼으로 요청이 전송돼요.
                <br />
                이메일과 슬랙 둘 다 연동되어 있지 않다면, 해당 구성원에게는 요청을 전송할 수 없어요.
            </div>
            <InputSection>
                <ButtonGroupRadio
                    onChange={(option) => {
                        setToAllMembers(option.value);
                    }}
                    defaultValue={toAllMembers}
                    options={[
                        {label: '모든 구성원 선택', value: true},
                        {label: '직접 선택', value: false},
                    ]}
                />
            </InputSection>
            {!toAllMembers && <div>find members</div>}
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
