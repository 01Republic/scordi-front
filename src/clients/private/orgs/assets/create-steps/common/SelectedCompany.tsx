import {useTranslation} from 'next-i18next';
import {memo} from 'react';

interface SelectedCompanyProps {
    companyType: string;
    selectedCompany: string;
    onChange: () => void;
}

export const SelectedCompany = memo((props: SelectedCompanyProps) => {
    const {t} = useTranslation('assets');
    const {companyType, selectedCompany, onChange} = props;
    return (
        <div className="flex items-center gap-4 justify-end">
            <p className="text-16 text-gray-500">
                {t('createSteps.selectedCompany.selected') as string} {companyType}: <b>{selectedCompany}</b>
            </p>
            <button className="btn btn-xs btn-scordi gap-2" onClick={onChange}>
                {t('createSteps.selectedCompany.change') as string}
            </button>
        </div>
    );
});
