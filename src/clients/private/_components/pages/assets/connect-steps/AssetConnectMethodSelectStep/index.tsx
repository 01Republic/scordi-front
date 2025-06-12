import React, {memo} from 'react';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {ActionHeader} from './ActionHeader';
import {AssetCreateMethodSelect} from './AssetCreateMethodSelect';
import {PureLayoutContainer} from '^clients/private/_layouts/PureLayout/PureLayoutContainer';

/**
 * 연동방법 선택 (소위, 약관동의 페이지)
 */
export const AssetConnectMethodSelectStep = memo(function AssetConnectMethodSelectStep() {
    return (
        <PureLayout>
            <PureLayoutContainer className="max-w-lg">
                <div className="flex flex-col gap-20">
                    <ActionHeader />
                    <AssetCreateMethodSelect />
                </div>
            </PureLayoutContainer>
        </PureLayout>
    );
});
