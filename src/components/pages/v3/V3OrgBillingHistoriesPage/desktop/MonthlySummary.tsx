import React, {memo} from 'react';
import {RemainAmount} from './summary/RemainAmount';
import {PaidAmount} from './summary/PaidAmount';
import {PayError} from './summary/PayError';

export const MonthlySummary = memo(() => {
    return (
        <div className="grid grid-cols-3 gap-3 w-full mb-6">
            <RemainAmount />
            <PaidAmount />
            <PayError />
        </div>
    );
});
MonthlySummary.displayName = 'MonthlySummary';
