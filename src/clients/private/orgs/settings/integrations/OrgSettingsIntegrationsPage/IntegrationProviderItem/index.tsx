import {ImageProps} from 'next/image';
import {memo, useEffect, useState} from 'react';
import {NextImage} from '^components/NextImage';
import {InstalledStatusBadge} from './InstalledStatusBadge';
import {IntegrationProviderItemButton} from './IntegrationProviderItemButton';
import {useRouter} from 'next/router';
import {toast} from 'react-hot-toast';
import {LinkProps} from 'next/dist/client/link';

interface IntegrationProviderItemProps {
    id: string;
    name: string;
    logo: ImageProps['src'];
    isInstalled: boolean;
    onClick?: () => any;
    href?: LinkProps['href'];
    install: () => any;
    onAuthorized: (data: any) => any;
    onSuccess?: (data: any) => any;
    onFailure?: (error: {message: any; error: string}) => any;
    disabled?: boolean;
}

export const IntegrationProviderItem = memo((props: IntegrationProviderItemProps) => {
    const {id, logo, name, isInstalled, href, onClick, disabled = false} = props;
    const {
        install,
        onAuthorized,
        onSuccess,
        onFailure = (error) => {
            console.log('error', error);
            toast.error(error.message);
        },
    } = props;
    const router = useRouter();
    const callback = router.query[id] as string;

    const logoSize = 30;

    async function onCallback(callback: string) {
        try {
            const data = JSON.parse(callback);
            if (data.error) return onFailure(data);

            await onAuthorized(data);
        } catch (e: any) {
            onFailure({error: e.name, message: e.message});
        }
    }

    useEffect(() => {
        const [pathOnly, queryStr] = router.asPath.split('?');
        if (callback && queryStr) {
            router.replace(pathOnly).then(() => onCallback(callback));
        }
    }, [callback]);

    return (
        <div className="p-4 flex items-center">
            <div className="flex items-center gap-4">
                <NextImage src={logo} alt={name} width={logoSize} height={logoSize} />
                <div>
                    <div className="text-14">{name}</div>
                    <div className="text-12 flex items-center whitespace-nowrap">
                        <InstalledStatusBadge isInstalled={isInstalled} />
                    </div>
                </div>
            </div>
            <div className={`ml-auto ${disabled ? 'pointer-event-none opacity-40' : ''}`}>
                {isInstalled ? (
                    <IntegrationProviderItemButton isInstalled={isInstalled} href={href} onClick={onClick} />
                ) : (
                    <IntegrationProviderItemButton isInstalled={isInstalled} onClick={install} />
                )}
            </div>
        </div>
    );
});
IntegrationProviderItem.displayName = 'IntegrationProviderItem';
