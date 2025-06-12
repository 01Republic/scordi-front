import {memo} from 'react';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {getColor, palette} from '^components/util/palette';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';

interface CodefCardTagUIProps {
    codefBankAccount?: CodefBankAccountDto;
    onClick?: (codefBankAccount?: CodefBankAccountDto) => any;
    withCompany?: boolean;
    render?: (
        codefBankAccount: CodefBankAccountDto,
        lastNum: string,
        company: BankAccountsStaticData | undefined,
    ) => string;
}

export const CodefBankAccountTagUI = memo((props: CodefCardTagUIProps) => {
    const {codefBankAccount, onClick, withCompany = false, render} = props;

    if (!codefBankAccount) return <></>;

    const lastNum = codefBankAccount.bankEndNumbers;
    const cardColor = getColor(codefBankAccount.id, palette.notionColors);
    const company = codefBankAccount.company?.displayName.replace('은행', '') || ' - ';

    return (
        <TagUI className={`${cardColor}`} onClick={() => onClick && onClick(codefBankAccount)} noMargin>
            {render ? (
                render(codefBankAccount, lastNum, codefBankAccount.company)
            ) : withCompany ? (
                <>
                    #{codefBankAccount.id}. {company}({lastNum})
                </>
            ) : (
                lastNum
            )}
        </TagUI>
    );
});
CodefBankAccountTagUI.displayName = 'CodefBankAccountTagUI';
