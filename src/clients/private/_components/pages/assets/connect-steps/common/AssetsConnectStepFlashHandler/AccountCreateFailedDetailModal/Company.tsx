import {memo} from 'react';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {NextImage} from '^components/NextImage';
import {WithChildren} from '^types/global.type';
import {LinkTo} from '^components/util/LinkTo';

interface CompanyProps extends WithChildren {
    company?: CardAccountsStaticData | BankAccountsStaticData;
    onClick?: () => any;
}

export const Company = memo((props: CompanyProps) => {
    const {company, onClick, children} = props;

    if (!company) return <></>;

    return (
        <LinkTo
            className="btn btn-xs btn-white gap-1"
            onClick={onClick}
            href={onClick ? undefined : company.loginPageUrl}
            target={onClick ? undefined : '_blank'}
            displayLoading={false}
        >
            <NextImage src={company.logo} alt={company.displayName} width={16} height={16} className="" />

            {children || <div>{company.displayName}</div>}
        </LinkTo>
    );
});
Company.displayName = 'Company';
