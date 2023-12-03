import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';
import {onboardingFlowStepStatus} from '^v3/share/OnboardingFlow/atom';

export const HeaderSection = memo(function HeaderSection() {
    const currentOrg = useRecoilValue(currentOrgAtom);
    // useSet(onboardingFlowStepStatus);

    return (
        <section className="mb-6">
            <h1>
                {currentOrg ? (
                    currentOrg.name
                ) : (
                    <span
                        className="inline-block h-[2rem] bg-slate-200 rounded w-[80px] animate-pulse relative top-[-2px] mr-2"
                        style={{verticalAlign: 'middle'}}
                    >
                        &nbsp;
                    </span>
                )}
                의 <span>대시보드</span>
            </h1>
        </section>
    );
});
