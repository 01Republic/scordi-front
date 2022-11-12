import React from 'react';
import {PageRoute} from '^types/pageRoute.type';
import {useCurrentUser} from '^hooks/useCurrentUser';
import {TextInput} from '^components/TextInput';
import {useForm} from 'react-hook-form';
import {getOrgMainLayout} from '^layouts/org/mainLayout';
import {MobileTopNav} from "^components/MobileTopNav";
import {DefaultButton} from "^components/Button";

export const UserEditPageRoute: PageRoute = {
    pathname: '/users/edit',
    path: () => UserEditPageRoute.pathname,
};

const UserEditPage = () => {
    const currentUser = useCurrentUser();
    const form = useForm<any>();

    const UpdateUserHandler = (dto: any) => {
        console.log(dto);
    };

    return (
        <div>
            <MobileTopNav title={'내 정보 수정'}/>
            <div className={'p-[20px]'}>
                <TextInput label={'이름'} {...form.register('name')}/>
                <TextInput label={'전화번호'} {...form.register('name')}/>
                <TextInput label={'회사명'} {...form.register('name')}/>
                <TextInput label={'회사 이메일 (아이디)'} {...form.register('name')}/>
                <div className={'mt-[40px]'}>
                    <DefaultButton text={'저장하기'} onClick={() => null}/>
                </div>
            </div>
        </div>
    );
};

UserEditPage.getLayout = getOrgMainLayout;

export default UserEditPage;
