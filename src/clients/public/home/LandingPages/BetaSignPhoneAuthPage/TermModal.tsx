import React, {memo, useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {isTermModalOpenedState} from './BetaSignPhoneAuthPage.atom';
import {RiCloseLine} from '^components/react-icons';
import {termsUrl} from '^config/environments';
import {UseFormReturn} from 'react-hook-form';
import {UserSocialSignUpRequestDto} from '^models/User/types';
import {toast} from 'react-toastify';
import {useTranslation} from 'next-i18next';

export interface TermModalProps {
    form: UseFormReturn<UserSocialSignUpRequestDto, any>;
    onConfirm: () => any;
}

export const TermModal = memo((props: TermModalProps) => {
    const {form, onConfirm} = props;
    const [isOpened, setIsOpened] = useRecoilState(isTermModalOpenedState);
    const {t} = useTranslation('sign');

    const onCloseModal = () => {
        setIsOpened(false);
    };

    const confirmBtnClick = () => {
        if (form.watch('isAgreeForServiceUsageTerm') && form.watch('isAgreeForPrivacyPolicyTerm')) {
            onCloseModal();
            onConfirm();
        } else {
            toast.info(t('terms_modal.please_check_agree'));
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
                    <h3 className="font-bold text-lg">{t('terms_modal.title')}</h3>

                    <div className="flex items-center mt-4 mb-4 pb-4 border-b">
                        <input
                            id="all_check"
                            type="checkbox"
                            className="checkbox checkbox-primary w-4 h-4 rounded"
                            checked={
                                form.watch('isAgreeForServiceUsageTerm') &&
                                form.watch('isAgreeForPrivacyPolicyTerm') &&
                                form.watch('isAgreeForMarketingTerm')
                            }
                            onClick={() => {
                                const privacy = form.getValues('isAgreeForPrivacyPolicyTerm');
                                const serviceUsage = form.getValues('isAgreeForServiceUsageTerm');
                                const marketing = form.getValues('isAgreeForMarketingTerm');
                                const allChecked = privacy && serviceUsage && marketing;
                                form.setValue('isAgreeForPrivacyPolicyTerm', !allChecked);
                                form.setValue('isAgreeForServiceUsageTerm', !allChecked);
                                form.setValue('isAgreeForMarketingTerm', !allChecked);
                            }}
                        />
                        <label htmlFor="all_check" className="ml-2 text-sm font-medium text-gray-500 cursor-pointer">
                            {t('terms_modal.agree_all')}
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
                            {/*[필수] 서비스 이용약관 동의*/}
                            {t('terms_modal.agree_to', {
                                prefix: t('terms_modal.required'),
                                termName: t('terms_modal.serviceUsage'),
                            })}
                            <a href={termsUrl.serviceUsage} target={'_blank'}>
                                <span className={'underline pl-2'}>{t('terms_modal.show')}</span>
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
                            {/*[필수] 개인정보 수집·이용 동의*/}
                            {t('terms_modal.agree_to', {
                                prefix: t('terms_modal.required'),
                                termName: t('terms_modal.privacy'),
                            })}
                            <a href={termsUrl.privacy} target={'_blank'}>
                                <span className={'underline pl-2'}>{t('terms_modal.show')}</span>
                            </a>
                        </label>
                    </div>

                    <div className="flex items-center mb-4">
                        <input
                            id="marketing_checkbox"
                            type="checkbox"
                            className="checkbox checkbox-primary w-4 h-4 rounded"
                            {...form.register('isAgreeForMarketingTerm')}
                        />
                        <label
                            htmlFor="marketing_checkbox"
                            className="ml-2 text-sm font-medium text-gray-500 cursor-pointer"
                        >
                            {/*[선택] 마케팅 수신 동의*/}
                            {t('terms_modal.agree_to', {
                                prefix: t('terms_modal.optional'),
                                termName: t('terms_modal.marketing'),
                            })}
                        </label>
                    </div>

                    <div className="text-xl absolute right-5 top-7 cursor-pointer" onClick={onCloseModal}>
                        <RiCloseLine />
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-block btn-scordi-500" onClick={confirmBtnClick}>
                            {t('terms_modal.done')}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
});
