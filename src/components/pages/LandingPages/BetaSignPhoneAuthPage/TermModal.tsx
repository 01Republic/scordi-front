import React, {memo, useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {isTermModalOpenedState} from './BetaSignPhoneAuthPage.atom';
import {RiCloseLine} from '^components/react-icons';
import {termsUrl} from '^config/environments';
import {UseFormReturn} from 'react-hook-form';
import {UserSocialSignUpRequestDto} from '^types/user.type';
import {toast} from 'react-toastify';

export interface TermModalProps {
    form: UseFormReturn<UserSocialSignUpRequestDto, any>;
    onConfirm: () => any;
}

export const TermModal = memo((props: TermModalProps) => {
    const {form, onConfirm} = props;
    const [isOpened, setIsOpened] = useRecoilState(isTermModalOpenedState);

    const onCloseModal = () => {
        setIsOpened(false);
    };

    const confirmBtnClick = () => {
        if (form.watch('isAgreeForServiceUsageTerm') && form.watch('isAgreeForPrivacyPolicyTerm')) {
            onCloseModal();
            onConfirm();
        } else {
            toast.info('모든 약관에 동의해 주세요');
        }
    };

    useEffect(() => {
        isOpened
            ? document.body.classList.add('hide-channel-talk')
            : document.body.classList.remove('hide-channel-talk');
    }, [isOpened]);

    return (
        <>
            <input type="checkbox" id="TermModal" className="modal-toggle" checked={isOpened} />
            <div className="modal modal-bottom">
                <div className="modal-box max-w-lg">
                    <h3 className="font-bold text-lg">동의 하시면 무료 체험이 확정됩니다.</h3>
                    <div className="flex items-center mt-4 mb-4 pb-4 border-b">
                        <input
                            id="all_check"
                            type="checkbox"
                            className="checkbox checkbox-primary w-4 h-4 rounded"
                            checked={
                                form.watch('isAgreeForServiceUsageTerm') && form.watch('isAgreeForPrivacyPolicyTerm')
                            }
                            onClick={() => {
                                const privacy = form.getValues('isAgreeForPrivacyPolicyTerm');
                                const serviceUsage = form.getValues('isAgreeForServiceUsageTerm');
                                const allChecked = privacy && serviceUsage;
                                form.setValue('isAgreeForPrivacyPolicyTerm', !allChecked);
                                form.setValue('isAgreeForServiceUsageTerm', !allChecked);
                            }}
                        />
                        <label htmlFor="all_check" className="ml-2 text-sm font-medium text-gray-500 cursor-pointer">
                            전체 동의
                        </label>
                    </div>
                    <div className="flex items-center mb-4">
                        <input
                            id="terms_checkbox"
                            type="checkbox"
                            className="checkbox checkbox-primary w-4 h-4 rounded"
                            {...form.register('isAgreeForServiceUsageTerm')}
                        />
                        <label
                            htmlFor="terms_checkbox"
                            className="ml-2 text-sm font-medium text-gray-500 cursor-pointer"
                        >
                            [필수] 서비스 이용약관 동의
                            <a href={termsUrl.serviceUsage} target={'_blank'}>
                                <span className={'underline pl-2'}>보기</span>
                            </a>
                        </label>
                    </div>
                    <div className="flex items-center mb-4">
                        <input
                            id="privacy_checkbox"
                            type="checkbox"
                            className="checkbox checkbox-primary w-4 h-4 rounded"
                            {...form.register('isAgreeForPrivacyPolicyTerm')}
                        />
                        <label
                            htmlFor="privacy_checkbox"
                            className="ml-2 text-sm font-medium text-gray-500 cursor-pointer"
                        >
                            [필수] 개인정보 수집·이용 동의
                            <a href={termsUrl.privacy} target={'_blank'}>
                                <span className={'underline pl-2'}>보기</span>
                            </a>
                        </label>
                    </div>
                    <div className="text-xl absolute right-5 top-7 cursor-pointer" onClick={onCloseModal}>
                        <RiCloseLine />
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-block btn-scordi-500" onClick={confirmBtnClick}>
                            완료
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
});
