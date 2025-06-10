import {memo} from 'react';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {NextImage} from '^components/NextImage';
import {WithChildren} from '^types/global.type';

interface CompanyProps extends WithChildren {
    company?: CardAccountsStaticData | BankAccountsStaticData;
}

export const Company = memo((props: CompanyProps) => {
    const {company, children} = props;

    if (!company) return <></>;

    return (
        <div className="btn btn-xs btn-white gap-1">
            <NextImage src={company.logo} alt={company.displayName} width={16} height={16} className="" />

            {children || <div>{company.displayName}</div>}
        </div>
    );
});
Company.displayName = 'Company';
