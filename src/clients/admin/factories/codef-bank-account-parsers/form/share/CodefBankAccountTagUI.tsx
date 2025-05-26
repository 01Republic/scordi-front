import {memo} from 'react';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {getColor, palette} from '^components/util/palette';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';

interface CodefCardTagUIProps {
    codefBankAccount?: CodefBankAccountDto;
    onClick?: (codefBankAccount?: CodefBankAccountDto) => any;
    withCompany?: boolean;
}

export const CodefBankAccountTagUI = memo((props: CodefCardTagUIProps) => {
    const {codefBankAccount, onClick, withCompany = false} = props;

    if (!codefBankAccount) return <></>;

    const lastNum = codefBankAccount.number4;
    const cardColor = getColor(codefBankAccount.id, palette.notionColors);
    const company = codefBankAccount.account?.company?.replace('계좌', '') || ' - ';

    return (
        <TagUI className={`${cardColor}`} onClick={() => onClick && onClick(codefBankAccount)}>
            {withCompany ? (
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
