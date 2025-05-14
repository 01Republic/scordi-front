import {memo, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {CodefCustomerType} from '^models/CodefAccount/type/enums';
import {InstitutionOption} from './InstitutionOption';
import {AllSelectInstitutionOptions} from './AllSelectInstitutionOptions';
import {AssetSelectorGrid} from '^_components/pages/assets/connect-steps/common/AssetSelectorGrid';

interface BankSelectorProps {}

export const BankSelector = memo((props: BankSelectorProps) => {
    const {} = props;
    const {setValue, getValues} = useFormContext<CreateAccountRequestDto>();
    const [selectedCompanies, setSelectedCompanies] = useState<BankAccountsStaticData[]>([]);
    const clientType = getValues('clientType') || CodefCustomerType.Business;

    const companies = BankAccountsStaticData.findByClientType(clientType);
    const isAllSelected = selectedCompanies.length === companies.length;

    const onClick = (company: BankAccountsStaticData) => {
        // 토글처리
        setSelectedCompanies((prev) => {
            // 이미 선택되어있는 은행인지 확인
            const isAlreadySelected = prev.some(({param}) => param === company.param);

            return isAlreadySelected
                ? // 이미 선택되어있으면 빼고
                  prev.filter(({param}) => param !== company.param)
                : // 그렇지 않으면 추가
                  [...prev, company];
        });
    };

    const toggleAll = () => setSelectedCompanies(isAllSelected ? [] : companies);

    return (
        <AssetSelectorGrid title="은행" isAllSelected={isAllSelected} onSelectAll={toggleAll}>
            {companies.map((company) => (
                <InstitutionOption
                    key={company.param}
                    logo={company.logo}
                    title={company.displayName}
                    isSelected={selectedCompanies.some((b) => b.param === company.param)}
                    onClick={() => onClick(company)}
                />
            ))}
        </AssetSelectorGrid>
    );
});
