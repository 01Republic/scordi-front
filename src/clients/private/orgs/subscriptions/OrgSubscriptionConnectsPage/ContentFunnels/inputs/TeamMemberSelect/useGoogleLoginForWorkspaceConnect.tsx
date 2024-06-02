import {useRecoilState, useResetRecoilState} from 'recoil';
import {connectGoogleWorkspaceCodeAtom} from './atom';

export function useGoogleLoginForWorkspaceConnect() {
    const [code, setCode] = useRecoilState(connectGoogleWorkspaceCodeAtom);
    const resetCode = useResetRecoilState(connectGoogleWorkspaceCodeAtom);

    const launch = (callback?: () => any) => {
        resetCode();

        // 구글로그인 버튼 클릭
        const btn = document.querySelector(
            '[data-component="GoogleLoginBtn"][data-about="admin"]',
        ) as HTMLElement | null;
        btn?.click();

        // // 청구서 수신 계정 선택 모달 오픈
        // const select = document.querySelector('#invoiceAccountSelect') as HTMLElement | null;
        // select?.click();

        callback && callback();
    };

    return {
        launch,
        code,
        setCode,
        resetCode,
    };
}
