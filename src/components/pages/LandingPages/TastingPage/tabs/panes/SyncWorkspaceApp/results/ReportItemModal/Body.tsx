import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ReportItemModalMemberListTitle} from './MemberListTitle';
import {ReportItemModalMemberListContainer} from './MemberListContainer';
import {isEditModeState} from './atom';

export const ReportItemModalBody = memo(function ReportItemModalBody() {
    const isEditMode = useRecoilValue(isEditModeState);

    if (isEditMode) return <></>;

    return (
        <MobileSection.Item className="border-none">
            <MobileSection.Padding>
                <ReportItemModalMemberListTitle />

                <hr />

                <ReportItemModalMemberListContainer />
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
