import React, {memo} from 'react';
import {StepLayout} from '../_common/StepLayout';
import {InvoiceAccountSelect} from '../inputs/InvoiceAccountSelect';

export const InvoiceAccountSelectStep = memo(function InvoiceAccountSelectStep() {
    return (
        <StepLayout title="청구서(인보이스)를 받고 있는 이메일이 있나요?" desc="">
            <InvoiceAccountSelect />
        </StepLayout>
    );
});
