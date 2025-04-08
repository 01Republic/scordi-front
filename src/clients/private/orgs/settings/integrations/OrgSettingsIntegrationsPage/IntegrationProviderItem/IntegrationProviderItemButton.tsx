import {memo} from 'react';
import {LinkTo} from '^components/util/LinkTo';
import {LinkProps} from 'next/dist/client/link';
import {Cog, Unplug} from 'lucide-react';

interface IntegrationProviderItemButtonProps {
    isInstalled: boolean;
    href?: LinkProps['href'];
    onClick?: () => any;
}

export const IntegrationProviderItemButton = memo((props: IntegrationProviderItemButtonProps) => {
    const {isInstalled, href, onClick} = props;

    return (
        <LinkTo
            href={href}
            onClick={onClick}
            className={`btn btn-sm gap-2 no-animation btn-animation ${isInstalled ? 'btn-white' : 'btn-scordi shadow'}`}
        >
            {isInstalled ? <Cog /> : <Unplug />}
            {isInstalled ? <span>세부설정</span> : <span>연동하기</span>}
        </LinkTo>
    );
});
IntegrationProviderItemButton.displayName = 'IntegrationProviderItemButton';
