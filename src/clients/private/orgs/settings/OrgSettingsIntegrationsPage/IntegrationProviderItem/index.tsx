import {ImageProps} from 'next/image';
import {memo} from 'react';
import {NextImage} from '^components/NextImage';
import {InstalledStatusBadge} from './InstalledStatusBadge';
import {IntegrationProviderItemButton} from './IntegrationProviderItemButton';

interface IntegrationProviderItemProps {
    id: string;
    name: string;
    logo: ImageProps['src'];
    isInstalled: boolean;
}

export const IntegrationProviderItem = memo((props: IntegrationProviderItemProps) => {
    const {logo, name, isInstalled} = props;

    const logoSize = 30;

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
            <div className="ml-auto">
                <IntegrationProviderItemButton isInstalled={isInstalled} onClick={() => 1} />
            </div>
        </div>
    );
});
IntegrationProviderItem.displayName = 'IntegrationProviderItem';
