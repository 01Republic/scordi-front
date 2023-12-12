import {memo} from 'react';
import {ContentPanel, ContentPanelMiniTitle} from '^layouts/ContentLayout';
import {WithChildren} from '^types/global.type';
import {useProduct} from '^models/Product/hook';
import {OutLink} from '^components/OutLink';

export const InfoPanel = memo(() => {
    const [proto] = useProduct();

    if (!proto) return <></>;

    return (
        <ContentPanel>
            <ContentPanelMiniTitle>Description</ContentPanelMiniTitle>

            <div
                className="text-sm whitespace-pre-line mb-5"
                dangerouslySetInnerHTML={{
                    __html: proto.desc.trim(),
                }}
            />

            <div className="overflow-x-auto">
                <table className="table w-full text-sm">
                    <tbody>
                        <Tr label="Category">CategoryCategory</Tr>
                        <Tr label="Sub-Category">CategoryCategory</Tr>
                        <Tr label="Phone">CategoryCategory</Tr>
                        <Tr label="Website">
                            <OutLink href={proto.homepageUrl} />
                        </Tr>
                        <Tr label="Pricing">
                            <OutLink href={proto.pricingPageUrl} />
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
