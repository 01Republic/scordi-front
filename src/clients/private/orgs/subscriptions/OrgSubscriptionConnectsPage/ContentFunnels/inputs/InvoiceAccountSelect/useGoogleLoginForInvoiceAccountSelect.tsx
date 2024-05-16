import {useRecoilState, useResetRecoilState} from 'recoil';
import {connectInvoiceAccountCodeAtom} from '^v3/share/OnboardingFlow/steps/ConnectInvoiceAccountBeforeLoad/atom';

export function useGoogleLoginForInvoiceAccountSelect() {
    const [code, setCode] = useRecoilState(connectInvoiceAccountCodeAtom);
    const resetCode = useResetRecoilState(connectInvoiceAccountCodeAtom);

    const launch = (callback?: () => any) => {
        resetCode();
        const btn = document.querySelector('[data-component="GoogleLoginBtn"]') as HTMLElement | null;
        btn?.click();
        const select = document.querySelector('#invoiceAccountSelect') as HTMLElement | null;
        select?.click();
        callback && callback();
    };

    return {
        launch,
        code,
        setCode,
        resetCode,
    };
}
