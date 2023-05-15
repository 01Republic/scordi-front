import React, {memo} from 'react';
import {MaskedInput} from '^components/pages/LandingPages/BetaSignPhoneAuthPage/MaskedInput';
import {Timer} from '^components/pages/UserSignUp/AuthenticationCode';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
    codeConfirmedState,
    codeSentState,
    phoneAuthDataState,
    useConfirmCode,
    useSendCode,
} from './BetaSignPhoneAuthPage.atom';
import {BsCheck2} from '^components/react-icons';

export const AuthCodeInput = memo(() => {
    const [phoneAuthData, setPhoneAuthData] = useRecoilState(phoneAuthDataState);
    const codeSent = useRecoilValue(codeSentState);
    const codeConfirmed = useRecoilValue(codeConfirmedState);
    const sendCode = useSendCode();
    const confirmCode = useConfirmCode();

    if (!codeSent) return <></>;

    const {phoneNumber} = phoneAuthData;

    return (
        <div className="form-control relative mb-6">
            <MaskedInput
                autoComplete="no"
                mask="999999"
                maskPlaceholder={null}
                placeholder="인증 번호를 입력하세요."
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
                    <BsCheck2 size={14} />
                </button>
            ) : (
                <button
                    type="button"
                    className="btn btn-sm btn-ghost text-scordi-500 absolute right-4 top-0 bottom-0 m-auto w-[80px]"
                >
                    <Timer
                        sec={1 * 60}
                        onFinish={() => {
                            if (confirm('인증 번호가 만료되었습니다.\n새 인증 번호를 보낼까요?')) {
                                sendCode({phoneNumber});
                            }
                        }}
                        resettable
                    />
                </button>
            )}
        </div>
    );
});
