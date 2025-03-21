import React, {memo} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {Modal} from '^components/Modal';
import {UserSocialSignUpRequestDto} from '^models/User/types';
import {X} from 'lucide-react';

export interface AgreeModalProps {
    modalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    form: UseFormReturn<UserSocialSignUpRequestDto, any>;
    modalConfirmButtonClick: () => void;
}

export const AgreeModal = memo(({modalOpen, setModalOpen, form, modalConfirmButtonClick}: AgreeModalProps) => {
    const onCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <Modal
            type={'info'}
            isOpen={modalOpen}
            title={'스코디 서비스 이용약관에 동의해주세요.'}
            children={
                <>
                    <div className="flex items-center mt-4 mb-4 pb-4 border-b">
                        <input
                            id="all_check"
                            type="checkbox"
                            className="w-4 h-4 text-red-600 bg-gray-100 rounded border-0"
                            checked={
                                form.watch('isAgreeForServiceUsageTerm') && form.watch('isAgreeForPrivacyPolicyTerm')
                            }
                            onClick={() => {
                                form.setValue('isAgreeForPrivacyPolicyTerm', true);
                                form.setValue('isAgreeForServiceUsageTerm', true);
                            }}
                        />
                        <label
                            htmlFor="all_check"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            전체 동의
                        </label>
                    </div>
                    <div className="flex items-center mb-4">
                        <input
                            id="terms_checkbox"
                            type="checkbox"
                            className="w-4 h-4 text-red-600 bg-gray-100 rounded border-0"
                            {...form.register('isAgreeForServiceUsageTerm')}
                        />
                        <label
                            htmlFor="terms_checkbox"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            [필수] 서비스 이용약관 동의
                            <a
                                href={`${process.env.NEXT_PUBLIC_BASE_API}/terms/serviceUsageTerm-v20221101-1.txt`}
                                target={'_blank'}
                            >
                                <span className={'underline pl-2'}>보기</span>
                            </a>
                        </label>
                    </div>
                    <div className="flex items-center mb-4">
                        <input
                            id="privacy_checkbox"
                            type="checkbox"
                            className="w-4 h-4 text-red-600 bg-gray-100 rounded border-0"
                            {...form.register('isAgreeForPrivacyPolicyTerm')}
                        />
                        <label
                            htmlFor="privacy_checkbox"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            [필수] 개인정보 수집·이용 동의
                            <a
                                href={`${process.env.NEXT_PUBLIC_BASE_API}/terms/개인정보처리방침-v20221101-1.html`}
                                target={'_blank'}
                            >
                                <span className={'underline pl-2'}>보기</span>
                            </a>
                        </label>
                    </div>
                    <div className="text-xl absolute right-5 top-7 cursor-pointer" onClick={onCloseModal}>
                        <X />
                    </div>
                </>
            }
            buttons={[{text: '확인', onClick: modalConfirmButtonClick}]}
        />
    );
});
