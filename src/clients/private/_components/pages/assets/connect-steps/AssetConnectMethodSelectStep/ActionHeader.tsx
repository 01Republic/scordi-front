import {AssetConnectOptionContext} from '^_components/pages/assets/connect-steps';
import {LinkTo} from '^components/util/LinkTo';
import {ArrowLeft} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import {memo, useContext} from 'react';

export const ActionHeader = memo(() => {
    const {t} = useTranslation('assets');
    const router = useRouter();
    const {ConnectMethodAltActionButton} = useContext(AssetConnectOptionContext);

    return (
        <div className="flex w-full items-center justify-between font-normal text-gray-600">
            <LinkTo
                className="flex gap-1 items-center text-14 cursor-pointer text-gray-600 transition-all hover:text-gray-800 hover:font-semibold"
                onClick={() => router.back()}
                displayLoading={false}
            >
                <ArrowLeft />
                {t('connectSteps.methodSelect.backButton')}
            </LinkTo>

            {ConnectMethodAltActionButton && <ConnectMethodAltActionButton />}
        </div>
    );
});
