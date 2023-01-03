import React, {memo, ReactElement, useState} from 'react';
import {WithChildren} from '^types/global.type';
import {MobileSection} from '^components/v2/MobileSection';
import {TitleSectionText} from '^components/v2/TitleSection/Text';
import {Icon} from '^components/Icon';

type TitleSectionCollapseProps = {
    title?: string | ReactElement | undefined;
    triggerText?: string | ReactElement | undefined;
    className?: string | undefined;
} & WithChildren;

export const TitleSectionCollapse = memo((props: TitleSectionCollapseProps) => {
    const {title, triggerText, className = '', children} = props;
    const [opened, setOpened] = useState(false);

    return (
        <MobileSection
            data-component="TitleSectionCollapse"
            className={`py-3 mb-3 collapse2 ${opened ? 'opened' : ''}`}
        >
            <div className="flex w-full justify-between items-center">
                {typeof title === 'string' ? <TitleSectionText text={title} /> : title}
                <button
                    type="button"
                    className="collapse-trigger text-2xl font-semibold"
                    onClick={() => setOpened(!opened)}
                >
                    <span className="mr-1">{triggerText}</span>
                    <Icon.ChevronDown className="collapse-icon" />
                </button>
            </div>
            <div className={`w-full collapse-content2`}>{children}</div>
        </MobileSection>
    );
});
