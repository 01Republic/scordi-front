import React, {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {toast} from 'react-toastify';
import {useForm} from 'react-hook-form';
import {pathRoute} from '^types/pageRoute.type';
import {TextInput} from '^components/TextInput';
import {MobileTopNav, MobileViewContainer} from '^components/MobileTopNav';
import {DefaultButton} from '^components/Button';
import {UserEditProfileRequestDto} from '^models/User/types';
import {currentUserAtom} from '^models/User/atom';
import OrgMobileLayout from '^layouts/org/mobileLayout';
import {userApi} from '^models/User/api/session';

export const UserEditPageRoute = pathRoute({
    pathname: '/users/edit',
    path: () => UserEditPageRoute.pathname,
});

const UserEditPage = () => {
    const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
    const form = useForm<UserEditProfileRequestDto>();

    const UpdateUserHandler = () => {
        userApi.registration.update(form.getValues()).then((res) => {
            toast.success('프로필이 수정되었습니다.');
            setCurrentUser(res.data);
        });
    };

    useEffect(() => {
        if (!currentUser) return;
        form.setValue('name', currentUser.name);
        form.setValue('phone', currentUser.phone);
        form.setValue('email', currentUser.email);
    }, [currentUser]);

    return (
        <OrgMobileLayout>
            <MobileTopNav title={'내 정보 수정'} />
            <MobileViewContainer>
                <TextInput label={'이름'} {...form.register('name')} />
                <TextInput label={'전화번호'} {...form.register('phone')} />
                <TextInput label={'회사 이메일 (아이디)'} {...form.register('email')} />
                <div className={'mt-[40px]'}>
                    <DefaultButton text={'저장하기'} onClick={UpdateUserHandler} />
                </div>
            </MobileViewContainer>
        </OrgMobileLayout>
    );
};

export default UserEditPage;
