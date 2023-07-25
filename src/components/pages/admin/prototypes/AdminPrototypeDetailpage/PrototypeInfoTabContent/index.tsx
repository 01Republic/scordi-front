import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {adminPrototypeDetail} from '^components/pages/admin/prototypes/AdminPrototypeDetailpage';
import {AdminInfoPanel} from '^components/pages/admin/share/panels/AdminInfoPanel';

export const PrototypeInfoTabContent = memo(() => {
    const prototype = useRecoilValue(adminPrototypeDetail);

    if (!prototype) return <></>;

    return (
        <div className="w-full">
            <AdminInfoPanel
                items={[
                    {label: 'AppName', value: prototype.name},
                    {label: 'Image', value: prototype.image},
                    {label: 'Company Name', value: prototype.companyName},
                    {label: 'Tagline', value: prototype.tagline},
                    {label: 'Homepage', value: prototype.homepageUrl},
                    {label: 'Pricing page', value: prototype.pricingPageUrl},
                ]}
            ></AdminInfoPanel>
        </div>
    );
});
