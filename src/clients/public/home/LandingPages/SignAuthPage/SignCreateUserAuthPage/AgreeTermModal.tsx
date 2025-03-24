import {termsUrl} from '^config/environments';
import {X} from 'lucide-react';
import React, {useEffect} from 'react';
import {useFormContext} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {useTranslation} from 'next-i18next';
import {CreateUserRequestDto} from '^models/User/types';
import cn from 'classnames';

interface AgreeTermModalProps {
    isOpenTermModal: boolean;
    setIsOpenTermModal: (value: boolean) => void;
    onSubmit: () => void;
}

export const AgreeTermModal = (props: AgreeTermModalProps) => {
    const {onSubmit, isOpenTermModal, setIsOpenTermModal} = props;
    const {register, watch, setValue, getValues} = useFormContext<CreateUserRequestDto>();

    const {t} = useTranslation('sign');

    const onCloseModal = () => {
        setIsOpenTermModal(false);
    };

    const confirmBtnClick = () => {
        if (watch('isAgreeForServiceUsageTerm') && watch('isAgreeForPrivacyPolicyTerm')) {
            onCloseModal();
            onSubmit();
        } else {
            toast('모든 약관에 동의해 주세요');
        }
    };

    useEffect(() => {
        isOpenTermModal
            ? document.body.classList.add('hide-channel-talk')
            : document.body.classList.remove('hide-channel-talk');
    }, [isOpenTermModal]);

    const [isAgreeForServiceUsageTerm, isAgreeForPrivacyPolicyTerm] = watch([
        'isAgreeForServiceUsageTerm',
        'isAgreeForPrivacyPolicyTerm',
    ]);
    const isTermModalValid = !!isAgreeForServiceUsageTerm && !!isAgreeForPrivacyPolicyTerm;

    return (
        <>
            <input type="checkbox" id="TermModal" className="modal-toggle" checked={isOpenTermModal} />
            <div className="modal modal-bottom">
                <div className="modal-box max-w-lg">
                    <h3 className="font-bold text-lg">{t('terms_modal.title')}</h3>

                    <div className="flex items-center mt-4 mb-4 pb-4 border-b">
                        <input
                            id="all_check"
                            type="checkbox"
                            className="checkbox checkbox-primary w-4 h-4 rounded"
                            checked={
                                watch('isAgreeForServiceUsageTerm') &&
                                watch('isAgreeForPrivacyPolicyTerm') &&
                                watch('isAgreeForMarketingTerm')
                            }
                            onClick={() => {
                                const privacy = getValues('isAgreeForPrivacyPolicyTerm');
                                const serviceUsage = getValues('isAgreeForServiceUsageTerm');
                                const marketing = getValues('isAgreeForMarketingTerm');
                                const allChecked = privacy && serviceUsage && marketing;
                                setValue('isAgreeForPrivacyPolicyTerm', !allChecked);
                                setValue('isAgreeForServiceUsageTerm', !allChecked);
                                setValue('isAgreeForMarketingTerm', !allChecked);
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
                            {...register('isAgreeForServiceUsageTerm')}
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
                            {...register('isAgreeForPrivacyPolicyTerm')}
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
                            {...register('isAgreeForMarketingTerm')}
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
                        <X />
                    </div>
                    <div className="modal-action">
                        <button
                            disabled={!isTermModalValid}
                            className={cn('btn btn-block', !isTermModalValid ? 'btn-disabled' : 'btn-scordi')}
                            onClick={confirmBtnClick}
                        >
                            완료
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
