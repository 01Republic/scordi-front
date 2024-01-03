import React, {memo, ReactNode} from 'react';
import {WithChildren} from '^types/global.type';
import {RequiredTopLeftLabel} from './TopLeftLabel';
import {BottomLeftHint} from './BottomLeftHint';

export interface RequiredFormControlProps extends WithChildren {
    topLeftLabel?: string;
    bottomLeftHint?: ReactNode;
}

export const RequiredFormControl = memo((props: RequiredFormControlProps) => {
    const {topLeftLabel, bottomLeftHint, children} = props;

    return (
        <div className="form-control w-full">
            {topLeftLabel && <RequiredTopLeftLabel text={topLeftLabel} />}
            {children}
            {bottomLeftHint && <BottomLeftHint text={bottomLeftHint} />}
        </div>
    );
});
RequiredFormControl.displayName = 'RequiredFormControl';
