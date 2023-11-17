import React, {memo} from 'react';
import {Panel} from '^v3/V3OrgHomePage/desktop/Panel';
import {Section} from '^v3/V3OrgHomePage/desktop/Section';

export const SummarySection = memo(function SummarySection() {
    return (
        <Section>
            <Panel padding="compact">
                <div className="w-full grid grid-cols-5 items-center justify-items-stretch">
                    <div className="border-r">갱신완료</div>
                    <div className="border-r">결제예정</div>
                    <div className="border-r">결제실패</div>
                    <div className="border-r">이상한놈</div>
                    <div className="border-r">1</div>
                </div>
            </Panel>
        </Section>
    );
});
