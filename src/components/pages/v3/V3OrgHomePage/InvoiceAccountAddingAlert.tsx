import {memo} from 'react';
import {PageAlert} from '^v3/share/PageAlert';
import {useRecoilValue} from 'recoil';
import {GmailAgentProgress, gmailAgentProgressAtom} from '^hooks/useGoogleAccessToken';
import {useTranslation} from 'next-i18next';
import {MobileSection} from '../share/sections/MobileSection';

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

export const InvoiceAccountAddingAlertBanner = memo(() => {
    const gmailAgentProgress = useRecoilValue(gmailAgentProgressAtom);
    const {t} = useTranslation('org-home');

    if (gmailAgentProgress === GmailAgentProgress.no_running) {
        return <></>;
    }

    return (
        <MobileSection.Padding>
            <div className="card card-compact card-bordered bg-warning shadow">
                <div className="card-body">
                    <div className="w-full flex items-center">
                        <div className="pr-4">
                            <button className="btn btn-square loading btn-ghost" />
                        </div>
                        <div className="flex-1">
                            <p>
                                <b>계정을 연동하는 중입니다.</b>
                            </p>
                            <p>1분 이내로 완료되니 잠시만 기다려주세요!</p>
                        </div>
                    </div>
                </div>
            </div>
        </MobileSection.Padding>
    );
});
