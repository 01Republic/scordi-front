import React, {memo} from 'react';
import {MaskedInput} from './MaskedInput';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {codeSentState, phoneAuthDataState, phoneAuthReadyState, useSendCode} from './BetaSignPhoneAuthPage.atom';
import {useTranslation} from 'next-i18next';

export const PhoneNumberInput = memo(() => {
    const [phoneAuthData, setPhoneAuthData] = useRecoilState(phoneAuthDataState);
    const [phoneAuthReady, setPhoneAuthReady] = useRecoilState(phoneAuthReadyState);
    const codeSent = useRecoilValue(codeSentState);
    const sendCode = useSendCode();
    const {t} = useTranslation('sign');

    return (
        <div className="form-control relative mb-6">
            <MaskedInput
                mask="999-9999-9999"
                maskPlaceholder={null}
                placeholder={`${t('phone_auth.phone_input.placeholder')}`}
                callback={(mask, value) => {
                    const fulfilled = mask.length === value.length;
                    setPhoneAuthReady(fulfilled);
                    if (fulfilled) sendCode({phoneNumber: value});
                }}
                readOnly={codeSent}
                className={codeSent ? `bg-neutral` : ''}
                name="phoneNumber"
                onChange={(e) => {
                    const phoneNumber = e.target.value;
                    setPhoneAuthData((oldVal) => ({...oldVal, phoneNumber}));
                }}
                defaultValue={phoneAuthData.phoneNumber}
                required
            />

            {phoneAuthReady && (
                <button
                    type="button"
                    disabled={codeSent}
                    className="btn btn-xs sm:btn-sm border-slate-300 absolute right-4 top-0 bottom-0 m-auto"
                >
                    {t('phone_auth.phone_input.send')}
                </button>
            )}
        </div>
    );
});
