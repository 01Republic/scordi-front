import React, {memo} from 'react';

interface SelectedCompanyProps {
    companyType: string;
    selectedCompany: string;
    onChange: () => void;
}

export const SelectedCompany = memo((props: SelectedCompanyProps) => {
    const {companyType, selectedCompany, onChange} = props;
    return (
        <div className="flex items-center gap-4 justify-end">
            <p className="text-16 text-gray-500">
                선택된 {companyType}: <b>{selectedCompany}</b>
            </p>
            <button className="btn btn-xs btn-scordi gap-2" onClick={onChange}>
                변경하기
            </button>
        </div>
    );
});
