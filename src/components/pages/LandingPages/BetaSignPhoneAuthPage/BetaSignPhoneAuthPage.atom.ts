import {atom, useRecoilCallback} from 'recoil';
import {SendPhoneAuthMessageDto} from '^types/user.type';
import {patchPhoneAuthSession, postPhoneAuthSession} from '^api/authlization';
import {toast} from 'react-toastify';
import {useTranslation} from 'next-i18next';

export const phoneAuthDataState = atom<SendPhoneAuthMessageDto>({
    key: 'BetaSign/phoneAuthDataState',
    default: {
        phoneNumber: '',
        code: '',
    },
});

export const phoneAuthReadyState = atom<boolean>({
    key: 'BetaSign/phoneAuthReadyState',
    default: false,
});

// 인증코드 전송 완료 여부
export const codeSentState = atom<boolean>({
    key: 'BetaSign/codeSentState',
    default: false,
});

// 인증코드 확인 완료 여부
export const codeConfirmedState = atom<boolean>({
    key: 'BetaSign/codeConfirmedState',
    default: false,
});

export const isTermModalOpenedState = atom<boolean>({
    key: 'BetaSign/isTermModalOpenedState',
    default: false,
});

// 인증번호 발급
export const useSendCode = () => {
    const {t} = useTranslation('sign');
    return useRecoilCallback(({set}) => (data: SendPhoneAuthMessageDto) => {
        postPhoneAuthSession(data).then((res) => {
            set(codeSentState, true);
            toast.info(t('phone_auth.phone_input.code_has_been_sent'));
        });
    });
};

// 인증번호 확인
export const useConfirmCode = () => {
    return useRecoilCallback(({set}) => (data: SendPhoneAuthMessageDto) => {
        patchPhoneAuthSession(data)
            .then((res) => {
                // console.log('🥶', res);
                if (res.status === 200) {
                    // 인증번호 완료되면 페이지 넘기는게 아니라 약관 동의받고 회원가입 처리 해야 됨.
                    // 즉, 여기서는 약관 모달 출현시킴.
                    set(isTermModalOpenedState, true);
                    set(codeConfirmedState, true);
                }
            })
            .catch((error) => {
                toast.info('인증번호를 확인해주세요');
            });
    });
};
