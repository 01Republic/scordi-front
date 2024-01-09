import React, {memo} from 'react';
import {EditFormSection} from '^v3/share/EditFormSection';

export const SubscriptionSection = memo(() => {
    return (
        <EditFormSection title="구독중인 플랜" editMode={false}>
            <div className="card w-full card-bordered border-slate-100 mb-8">
                <div className="card-body p-4">
                    <h3 className="text-lg">무료 체험</h3>
                    {/*<div className="card-actions justify-start">*/}
                    {/*    <a className="link link-primary no-underline text-sm">구독 변경</a>*/}
                    {/*</div>*/}
                </div>
            </div>
        </EditFormSection>
    );
});
