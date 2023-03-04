import {memo} from 'react';
import {ContentPanel, ContentPanelMiniTitle} from '^layouts/ContentLayout';
import {WithChildren} from '^types/global.type';
import {useApplicationPrototype} from '^hooks/useApplicationPrototypes';
import {OutLink} from '^components/OutLink';

export const InfoPanel = memo(() => {
    const [proto] = useApplicationPrototype();

    if (!proto) return <></>;

    return (
        <ContentPanel>
            <ContentPanelMiniTitle>Description</ContentPanelMiniTitle>

            <div
                className="text-sm whitespace-pre-line mb-5"
                dangerouslySetInnerHTML={{
                    __html: `
            Amazon Web Services (AWS) began exposing key infrastructure services to businesses in the form of web services -- now widely known as cloud computing. The ultimate benefit of cloud computing, and AWS, is the ability to leverage a new business model and turn capital infrastructure expenses into variable costs. Businesses no longer need to plan and procure servers and other IT resources weeks or months in advance. Using AWS, businesses can take advantage of Amazon's expertise and economies of scale to access resources when their business needs them, delivering results faster and at a lower cost.
            `.trim(),
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
