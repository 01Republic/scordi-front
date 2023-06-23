import {memo} from 'react';
import {PageAlert} from '^v3/share/PageAlert';
import {useRecoilValue} from 'recoil';
import {GmailAgentProgress, gmailAgentProgressAtom} from '^hooks/useGoogleAccessToken';
import {useTranslation} from 'next-i18next';

export const InvoiceAccountAddingAlert = memo(() => {
    const gmailAgentProgress = useRecoilValue(gmailAgentProgressAtom);
    const {t} = useTranslation('org-home');

    if (gmailAgentProgress === GmailAgentProgress.no_running) {
        return <></>;
    }

    return (
        <PageAlert method="alert-warning" flexed={false}>
            <p className="text-center">
                <b>계정을 연동하는 중입니다.</b> 1분 이내로 완료되니 잠시만 기다려주세요!
            </p>
        </PageAlert>
    );
});
