import React, {memo} from 'react';
import {MaskedInput} from '^clients/public/home/LandingPages/BetaSignPhoneAuthPage/MaskedInput';
import {Timer} from '^components/pages/UserSignUp/AuthenticationCode';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
    codeConfirmedState,
    codeSentState,
    phoneAuthDataState,
    useConfirmCode,
    useSendCode,
} from './BetaSignPhoneAuthPage.atom';
import {useTranslation} from 'next-i18next';
import {Check} from 'lucide-react';

export const AuthCodeInput = memo(() => {
    const [phoneAuthData, setPhoneAuthData] = useRecoilState(phoneAuthDataState);
    const [codeSent, setCodeSent] = useRecoilState(codeSentState);
    const codeConfirmed = useRecoilValue(codeConfirmedState);
    const sendCode = useSendCode();
    const confirmCode = useConfirmCode();
    const {t} = useTranslation('sign');

    if (!codeSent) return <></>;

    const {phoneNumber} = phoneAuthData;

    return (
        <div className="form-control relative mb-6">
            <MaskedInput
                autoComplete="off"
                mask="999999"
                maskPlaceholder={null}
                placeholder={`${t('phone_auth.code_input.placeholder')}`}
                callback={(mask, value) => {
                    const fulfilled = mask.length === value.length;
                    if (fulfilled) {
                        confirmCode({phoneNumber, code: value});
                    }
                }}
                readOnly={codeConfirmed}
                className={codeConfirmed ? `bg-neutral` : ''}
                name="code"
                onChange={(e) => {
                    const code = e.target.value;
                    setPhoneAuthData((oldVal) => ({...oldVal, code}));
                }}
                defaultValue={phoneAuthData.code}
                required
            />

            {codeConfirmed ? (
                <button
                    type="button"
                    className="btn btn-xs !bg-success !text-white absolute right-4 top-0 bottom-0 m-auto btn-circle"
                >
                    <Check size={14} />
                </button>
            ) : (
                <button
                    type="button"
                    className="btn btn-sm btn-ghost text-scordi-500 absolute right-4 top-0 bottom-0 m-auto w-[80px]"
                >
                    <Timer
                        sec={3 * 60}
                        onFinish={({reset}) => {
                            const confirmMessage = `${t('phone_auth.code_input.code_has_been_expired')}\n${t(
                                'phone_auth.code_input.shall_i_send_new_code',
                            )}`;

                            const isOkClicked = confirm(confirmMessage);
                            if (isOkClicked) {
                                sendCode({phoneNumber});
                                reset();
                            } else {
                                setCodeSent(false);
                            }
                        }}
                        resettable
                    />
                </button>
            )}
        </div>
    );
});
