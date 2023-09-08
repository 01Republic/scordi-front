import {useTranslation} from 'next-i18next';
import React from 'react';

export const GoogleComplianceDisclosureTag = () => {
    const {t} = useTranslation('google-compliance');
    const GooglePolicyLink =
        'https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes';

    return (
        <p className="pb-4 font-extralight font-sans text-xs">
            {t('description1')}
            <a className="texl-xl btn-link" href={GooglePolicyLink}>
                {t('policy')}
            </a>
            {t('description2')}
            <br />
            {t('assure')}
        </p>
    );
};
