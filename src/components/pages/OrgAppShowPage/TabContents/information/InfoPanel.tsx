import {memo} from 'react';
import {ContentPanel, ContentPanelMiniTitle} from '^layouts/ContentLayout';
import {WithChildren} from '^types/global.type';
import {useCurrentSubscription} from '^hooks/useSubscriptions';
import {OutLink} from '^components/OutLink';

export const InfoPanel = memo(() => {
    const {currentSubscription: application} = useCurrentSubscription();

    if (!application) return <></>;

    const {product} = application;

    return (
        <ContentPanel>
            <ContentPanelMiniTitle>Introduce</ContentPanelMiniTitle>

            <div className="text-sm whitespace-pre-line mb-5" dangerouslySetInnerHTML={{__html: product.desc.trim()}} />

            <div className="overflow-x-auto">
                <table className="table w-full text-sm">
                    <tbody>
                        <Tr label="Category">CategoryCategory</Tr>
                        <Tr label="Sub-Category">CategoryCategory</Tr>
                        <Tr label="Phone">CategoryCategory</Tr>
                        <Tr label="Website">
                            <OutLink href={product.homepageUrl} />
                        </Tr>
                        <Tr label="Pricing">
                            <OutLink href={product.pricingPageUrl} />
                        </Tr>
                    </tbody>
                </table>
            </div>
        </ContentPanel>
    );
});

const Tr = memo(({label, children}: WithChildren & {label: string}) => {
    return (
        <tr>
            <th className="px-0 text-gray-400 font-medium">{label}</th>
            <td>{children}</td>
        </tr>
    );
});
