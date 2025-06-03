import React, {memo} from 'react';
import {PureCenterLayout} from '^clients/private/_layouts/PureCenterLayout';
import {ActionHeader} from './ActionHeader';
import {AssetCreateMethodSelect} from './AssetCreateMethodSelect';

/**
 * 연동방법 선택 (소위, 약관동의 페이지)
 */
export const AssetConnectMethodSelectStep = memo(function AssetConnectMethodSelectStep() {
    return (
        <PureCenterLayout>
            <div className="w-full max-w-lg flex flex-col gap-20">
                <ActionHeader />
                <AssetCreateMethodSelect />
            </div>
        </PureCenterLayout>
    );
});
