import React, {memo} from 'react';
import {PureCenterLayout} from '^clients/private/_layouts/PureCenterLayout';
import {ActionHeader} from './ActionHeader';
import {AssetCreateMethodSelect} from './AssetCreateMethodSelect';

export const ConnectionMethodSection = memo(() => {
    return (
        <PureCenterLayout>
            <div className="w-full max-w-lg flex flex-col gap-20">
                <ActionHeader />
                <AssetCreateMethodSelect />
            </div>
        </PureCenterLayout>
    );
});
