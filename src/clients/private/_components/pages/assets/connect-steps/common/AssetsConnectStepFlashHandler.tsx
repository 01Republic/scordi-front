import React, {memo} from 'react';
import {PageFlash} from '^clients/private/_layouts/_shared/PageFlash';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CodefAccountCreateErrorResponseDto} from '^models/CodefAccount/type/create-account.response.dto';

interface AssetsConnectStepFlashHandlerProps {
    failuresBankResults?: CodefAccountCreateErrorResponseDto[];
    failuresCardResults?: CodefAccountCreateErrorResponseDto[];
}

export const AssetsConnectStepFlashHandler = memo((props: AssetsConnectStepFlashHandlerProps) => {
    const {failuresBankResults, failuresCardResults} = props;

    const hasBankFailures = (failuresBankResults?.length ?? 0) > 0;
    const hasCardFailures = (failuresCardResults?.length ?? 0) > 0;

    if (!hasBankFailures && !hasCardFailures) {
        return null;
    }

    return (
        <PageFlash
            text="연동에 실패한 금융기관이 있어요"
            id="AssetsConnectStepFlashHandler"
            theme="alert"
            type="button"
            closeButton={true}
        />
    );
});
